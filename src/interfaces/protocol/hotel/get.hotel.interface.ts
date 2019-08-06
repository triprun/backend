import { Document } from 'mongoose';

export interface HotelGetCardInterface extends Document {
  hotelId: string;
}
