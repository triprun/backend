import { Document } from 'mongoose';

export interface RestaurantPostVerifyInterface extends Document {
  restId: string;
  accessToken: string;
}
