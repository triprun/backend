import { Connection } from 'mongoose';
import { RelaxSchema } from '../schemas/relax.schema';
import { Consts } from '../consts';

export const relaxProviders = [
  {
    provide: Consts.relax_rep,
    useFactory: (connection: Connection) => connection.model('Relax', RelaxSchema),
    inject: [Consts.dm_provide],
  },
];
