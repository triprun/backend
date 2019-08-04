import { Document } from 'mongoose';

export interface RestaurantGetCardInterface extends Document {
  restId: string;
}
