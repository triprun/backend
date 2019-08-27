import { Connection } from 'mongoose';
import { CitySchema } from '../schemas/cities.schema';
import { Consts } from '../consts';

export const citiesProviders = [
  {
    provide: Consts.cities_rep,
    useFactory: (connection: Connection) => connection.model('City', CitySchema),
    inject: [Consts.dm_provide],
  },
];
