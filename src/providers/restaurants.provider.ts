import { Connection } from 'mongoose';
import { RestaurantSchema } from '../schemas/restaurants.schema';
import { Consts } from '../consts';

export const restaurantsProviders = [
  {
    provide: Consts.restaurants_rep,
    useFactory: (connection: Connection) => connection.model('Restaurant', RestaurantSchema),
    inject: [Consts.dm_provide],
  },
];
