import { Document } from 'mongoose';

export interface EntertainmentResponseGetCardInterface extends Document {
  emId: string;
  name: string;
  description: string;
  open: number;
  close: number;
  photos: [string];
  verified: boolean;
  cuisine: [string];
  type: string;
  limitations: [string];
  bestToVisit: [string];
  avgprice: number;
  suitableFor: [string];
  extras: [string];
}
