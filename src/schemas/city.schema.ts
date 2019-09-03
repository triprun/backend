import * as mongoose from 'mongoose';

import {commonPlaceSchema} from './common.place.schema';

export const CitySchema = new mongoose.Schema({
  ...commonPlaceSchema,
  countyId: String,
  type: String,
  rating: Number,
});
