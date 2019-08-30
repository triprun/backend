import {Connection} from 'mongoose';
import {MarschrouteSchema} from '../schemas/marschroute.schema';
import {Consts} from '../consts';

export const marschrouteProviders = [
  {
    provide: Consts.marschroute_rep,
    useFactory: (connection: Connection) => connection.model('Marschroute', MarschrouteSchema),
    inject: [Consts.dm_provide],
  },
];
