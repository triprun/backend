import {Connection} from 'mongoose';
import {ShoppingSchema} from '../schemas/shopping.schema';
import {Consts} from '../consts';

export const shoppingProviders = [
  {
    provide: Consts.shopping_rep,
    useFactory: (connection: Connection) => connection.model('Shopping', ShoppingSchema),
    inject: [Consts.dm_provide],
  },
];
