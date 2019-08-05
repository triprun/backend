import { Document } from 'mongoose';

export interface RestaurantPostDeleteInterface extends Document {
  restId: string;
  accessToken: string;
}
