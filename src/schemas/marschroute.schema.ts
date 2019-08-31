import * as mongoose from 'mongoose';

import {commonPlace} from './common.place.schema';

export const MarschrouteSchema = new mongoose.Schema({
  ...commonPlace,
  ref: String,
  author: Number,
  type: Number,
  companions: Array,
  potentialCompanions: Array,
  places: Array,
});
