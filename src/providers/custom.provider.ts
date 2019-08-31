import {Connection} from 'mongoose';
import {CustomSchema} from '../schemas/custom.schema';
import {Consts} from '../consts';

export const customProviders = [
  {
    provide: Consts.custom_rep,
    useFactory: (connection: Connection) => connection.model('Custom', CustomSchema),
    inject: [Consts.dm_provide],
  },
];
