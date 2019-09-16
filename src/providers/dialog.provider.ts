import {Connection} from 'mongoose';
import {DialogSchema} from '../schemas/dialog.schema';
import {Consts} from '../consts';

export const dialogProviders = [
  {
    provide: Consts.dialog_rep,
    useFactory: (connection: Connection) => connection.model('Dialog', DialogSchema),
    inject: [Consts.dm_provide],
  },
];
