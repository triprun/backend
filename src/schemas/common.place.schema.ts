import * as mongoose from 'mongoose';

export const commonPlace = {
  id: String,
  name: String,
  description: String,
  open: Number,
  close: Number,
  photos: [String],
  verified: Boolean,
};
