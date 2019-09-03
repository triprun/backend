import * as mongoose from 'mongoose';

import {commonPlaceSchema} from './common.place.schema';

export const ShoppingSchema = new mongoose.Schema({
  ...commonPlaceSchema,
  contacts: String,
  type: String,
  suitableFor: [String],
  extras: [String],
});
