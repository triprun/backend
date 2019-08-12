import * as mongoose from 'mongoose';

import { common } from './common.schema';

export const EntertainmentSchema = new mongoose.Schema({
  ...common,
  freeprice: Boolean,
  avgprice: Number,
  avgpricechild: Number,
  agechild: Number,
  contacts: {
    phone: String,
    address: String,
  },
});
