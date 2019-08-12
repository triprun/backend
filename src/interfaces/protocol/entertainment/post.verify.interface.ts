import { Document } from 'mongoose';

export interface EntertainmentPostVerifyInterface extends Document {
  emId: string;
  accessToken: string;
}
