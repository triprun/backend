import * as mongoose from 'mongoose';

import { commonPlace } from './common.place.schema';

export const ShoppingSchema = new mongoose.Schema({
  ...commonPlace,
  contacts: String,
  type: String,
  suitableFor: [String],
  extras: [String],
});
