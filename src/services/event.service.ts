import { Injectable, Inject, HttpException} from '@nestjs/common';
import {EventProvider} from '../providers/event.provider';

@Injectable()
export class EventService {

  subscribes = [];

  async subscribe(client, data) {
    const temp = [];
    temp[data.accessToken] = {
      socket: client,
      events: data.events,
    };
    this.subscribes.push(temp);
    // console.log(temp);
    // console.log(this.subscribes);
  }

}
