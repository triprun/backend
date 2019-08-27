import { Connection } from 'mongoose';
import { CountrySchema } from '../schemas/countries.schema';
import { Consts } from '../consts';

export const countriesProviders = [
  {
    provide: Consts.countries_rep,
    useFactory: (connection: Connection) => connection.model('Country', CountrySchema),
    inject: [Consts.dm_provide],
  },
];
