import { Document } from 'mongoose';

export interface HotelPostVerifyInterface extends Document {
  hotelId: string;
  accessToken: string;
}
