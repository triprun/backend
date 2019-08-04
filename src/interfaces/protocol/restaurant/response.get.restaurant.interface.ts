import { Document } from 'mongoose';

export interface RestaurantResponseGetCardInterface extends Document {
  name: string;
  description: string;
  open: number;
  close: number;
  photos: [string];
  verified: boolean;
  cuisine: [string] | null;
  type: string | null;
  limitations: [string] | null;
  bestToVisit: [string] | null;
  avgprice: number | null;
  suitableFor: [string] | null;
  extras: [string] | null;
}
