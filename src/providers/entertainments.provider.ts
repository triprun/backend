import { Connection } from 'mongoose';
import { EntertainmentSchema } from '../schemas/entertainment.schema';
import { Consts } from '../consts';

export const entertainmentsProviders = [
  {
    provide: Consts.entertainments_rep,
    useFactory: (connection: Connection) => connection.model('Entertainment', EntertainmentSchema),
    inject: [Consts.dm_provide],
  },
];
