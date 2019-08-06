import { Document } from 'mongoose';

export interface HotelPostDeleteInterface extends Document {
  hotelId: string;
  accessToken: string;
}
