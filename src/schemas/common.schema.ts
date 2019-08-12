// these fields are common to all schemas,
// import file to every schema created
import * as mongoose from 'mongoose';

export const common = {
  name: String,
  description: String,
  open: Number,
  close: Number,
  photos: [String],
  verified: Boolean,
};
