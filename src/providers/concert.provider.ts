import {Connection} from 'mongoose';
import {ConcertSchema} from '../schemas/concert.schema';
import {Consts} from '../consts';

export const concertsProviders = [
  {
    provide: Consts.concerts_rep,
    useFactory: (connection: Connection) => connection.model('Concert', ConcertSchema),
    inject: [Consts.dm_provide],
  },
];
