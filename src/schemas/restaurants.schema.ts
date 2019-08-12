import * as mongoose from 'mongoose';

import { common } from './common.schema';

export const RestaurantSchema = new mongoose.Schema({
  ...common,
  cuisine: [String],
  type: String,
  limitations: [String],
  bestToVisit: [String],
  avgprice: Number,
  suitableFor: [String],
  extras: [String],
});
