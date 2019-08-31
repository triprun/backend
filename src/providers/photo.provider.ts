import {Connection} from 'mongoose';
import {PhotoSchema} from '../schemas/photo.schema';
import {Consts} from '../consts';

export const photoProviders = [
  {
    provide: Consts.photo_rep,
    useFactory: (connection: Connection) => connection.model('Photo', PhotoSchema),
    inject: [Consts.dm_provide],
  },
];
