import * as mongoose from 'mongoose';

import {commonPlace} from './common.place.schema';

export const CountrySchema = new mongoose.Schema({
  ...commonPlace,
  type: String,
  rating: Number,
});
