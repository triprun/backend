import {Connection} from 'mongoose';
import {ImpressionSchema} from '../schemas/impression.schema';
import {Consts} from '../consts';

export const impressionProviders = [
  {
    provide: Consts.impression_rep,
    useFactory: (connection: Connection) => connection.model('Impression', ImpressionSchema),
    inject: [Consts.dm_provide],
  },
];
