import {Connection} from 'mongoose';
import {MessageSchema} from '../schemas/message.schema';
import {Consts} from '../consts';

export const messageProviders = [
  {
    provide: Consts.message_rep,
    useFactory: (connection: Connection) => connection.model('Message', MessageSchema),
    inject: [Consts.dm_provide],
  },
];
