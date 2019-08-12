import { Document } from 'mongoose';

export interface EntertainmentPostDeleteInterface extends Document {
  emId: string;
  accessToken: string;
}
