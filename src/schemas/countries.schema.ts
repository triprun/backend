import * as mongoose from 'mongoose';

export const CountrySchema = new mongoose.Schema({
  name: String,
  description: String,
  photos: [String],
  type: String,
  rating: Number
});
