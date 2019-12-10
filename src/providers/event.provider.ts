import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import {Config} from '../config';

@WebSocketGateway()
export class EventProvider {

  @WebSocketServer()
  server: Server;

  Subscribes = [];

  async emit(event, userId, data) {
    this.Subscribes.forEach(item => {
      if ( item.userId === userId ) {
        if ( item.events.indexOf(event) !== -1 ) {
          item.sockets.forEach(socket => {
            socket.emit('chat', data);
          });
        }
      }
    });
  }

  @SubscribeMessage('subscribe')
  async subscribe(client: Client, data: any): Promise<WsResponse<unknown>> {
    if (typeof data.accessToken === 'undefined') {
      return {
        event: 'subscribe',
        data: 'error',
      };
    }
    let decoded = null;
    jwt.verify(data.accessToken, Config.jwt_key_access, (e, d) => {
      if (d != null) {
        decoded = d;
      }
    });
    if (decoded === null) {
      return {
        event: 'subscribe',
        data: 'error',
      };
    }
    const userId = decoded.userId;

    let index = -1;
    for ( let i = 0; i < this.Subscribes.length; i++ ) {
      if ( data.accessToken === this.Subscribes[i].accessToken ) {
        index = i;
      }
    }
    if ( index !== -1 ) {
      this.Subscribes[index].sockets.push(client);
    } else {
      const temp = {
        userId: userId,
        accessToken: data.accessToken,
        sockets: [client],
        events: data.events,
      };
      this.Subscribes.push(temp);
    }
    return {
      event: 'subscribe',
      data: 'ok',
    };
  }

}
