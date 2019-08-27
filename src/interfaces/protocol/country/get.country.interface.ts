import { Document } from 'mongoose';

export interface CountryGetCardInterface extends Document {
  countryId: string;
}
