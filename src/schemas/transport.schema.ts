import * as mongoose from 'mongoose';

import {commonPlace} from './common.place.schema';

export const TransportSchema = new mongoose.Schema({
  ...commonPlace,
  cuisine: [String],
  type: String,
  limitations: [String],
  bestToVisit: [String],
  avgprice: Number,
  suitableFor: [String],
  extras: [String],
});
