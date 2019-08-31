import {Connection} from 'mongoose';
import {CitySchema} from '../schemas/city.schema';
import {Consts} from '../consts';

export const cityProviders = [
  {
    provide: Consts.city_rep,
    useFactory: (connection: Connection) => connection.model('City', CitySchema),
    inject: [Consts.dm_provide],
  },
];
