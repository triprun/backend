import {Connection} from 'mongoose';
import {TransportSchema} from '../schemas/transport.schema';
import {Consts} from '../consts';

export const transportProviders = [
  {
    provide: Consts.transport_rep,
    useFactory: (connection: Connection) => connection.model('Transport', TransportSchema),
    inject: [Consts.dm_provide],
  },
];
