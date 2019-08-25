import { Connection } from 'mongoose';
import { HotelSchema } from '../schemas/hotel.schema';
import { Consts } from '../consts';

export const hotelsProviders = [
  {
    provide: Consts.hotels_rep,
    useFactory: (connection: Connection) => connection.model('Hotel', HotelSchema),
    inject: [Consts.dm_provide],
  },
];
