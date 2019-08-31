import {Connection} from 'mongoose';
import {MarschrouteSchema} from '../schemas/marschroute.schema';
import {Consts} from '../consts';

export const marschrouteSnapProviders = [
  {
    provide: Consts.marschroutesnap_rep,
    useFactory: (connection: Connection) => connection.model('MarschrouteSnap', MarschrouteSchema),
    inject: [Consts.dm_provide],
  },
];
