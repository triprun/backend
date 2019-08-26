import {Connection} from 'mongoose';
import {SightSchema} from '../schemas/sight.schema';
import {Consts} from '../consts';

export const sightsProviders = [
  {
    provide: Consts.sights_rep,
    useFactory: (connection: Connection) => connection.model('Sight', SightSchema),
    inject: [Consts.dm_provide],
  },
];
