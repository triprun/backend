import * as mongoose from 'mongoose';

import {commonPlaceSchema} from './common.place.schema';

export const ConcertSchema = new mongoose.Schema({
  ...commonPlaceSchema,
  freeprice: Boolean,
  avgprice: Number,
  avgpricechild: Number,
  agechild: Number,
  contacts: String,
});
