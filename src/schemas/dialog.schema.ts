import * as mongoose from 'mongoose';

export const DialogSchema = new mongoose.Schema({
  id: String,
  refType: String,
  ref: String,
  created_at: Number,
  updated_at: Number,
  author: String,
  name: String,
  avatar: String,
  members: Array,
});
