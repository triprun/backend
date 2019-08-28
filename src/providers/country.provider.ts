import {Connection} from 'mongoose';
import {CountrySchema} from '../schemas/country.schema';
import {Consts} from '../consts';

export const countryProviders = [
  {
    provide: Consts.country_rep,
    useFactory: (connection: Connection) => connection.model('Country', CountrySchema),
    inject: [Consts.dm_provide],
  },
];
