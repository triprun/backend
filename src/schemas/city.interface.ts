import {Document} from 'mongoose';

export interface ICity extends Document {
  id: string;
  countyId: string;
  name: string;
  description: string;
  photos: [string];
  type: string;
  rating: number;
}
