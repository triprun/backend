import * as mongoose from 'mongoose';

import {commonPlaceSchema} from './common.place.schema';

export const MarschrouteSchema = new mongoose.Schema({
  ...commonPlaceSchema,
  ref: String,
  author: Number,
  type: Number,
  companions: Array,
  potentialCompanions: Array,
  places: Array,
});
