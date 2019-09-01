import * as mongoose from 'mongoose';

import {commonPlaceSchema} from './common.place.schema';

export const CountrySchema = new mongoose.Schema({
  ...commonPlaceSchema,
  type: String,
  rating: Number,
});
