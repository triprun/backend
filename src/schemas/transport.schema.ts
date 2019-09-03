import * as mongoose from 'mongoose';

import {commonPlaceSchema} from './common.place.schema';

export const TransportSchema = new mongoose.Schema({
  ...commonPlaceSchema,
  cuisine: [String],
  type: String,
  limitations: [String],
  bestToVisit: [String],
  avgprice: Number,
  suitableFor: [String],
  extras: [String],
});
