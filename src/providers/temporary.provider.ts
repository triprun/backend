import {Connection} from 'mongoose';
import {TemporarySchema} from '../schemas/temporary.schema';
import {Consts} from '../consts';

export const temporaryProviders = [
  {
    provide: Consts.temporary_rep,
    useFactory: (connection: Connection) => connection.model('Temporary', TemporarySchema),
    inject: [Consts.dm_provide],
  },
];
