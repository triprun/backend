import * as mongoose from 'mongoose';

import {commonPlace} from './common.place.schema';

export const CitySchema = new mongoose.Schema({
  ...commonPlace,
  countyId: String,
  type: String,
  rating: Number,
});
