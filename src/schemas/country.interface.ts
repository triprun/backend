import {Document} from 'mongoose';

export interface ICountry extends Document {
  id: string;
  name: string;
  description: string;
  photos: [string];
  type: string;
  rating: number;
}
