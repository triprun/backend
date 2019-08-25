import * as mongoose from 'mongoose';

export const commonPlace = {
  name: String,
  description: String,
  open: Number,
  close: Number,
  photos: [String],
  verified: Boolean,
};
