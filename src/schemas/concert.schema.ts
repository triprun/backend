import * as mongoose from 'mongoose';

import {commonPlace} from './common.place.schema';

export const ConcertSchema = new mongoose.Schema({
  ...commonPlace,
  freeprice: Boolean,
  avgprice: Number,
  avgpricechild: Number,
  agechild: Number,
  contacts: String,
});
