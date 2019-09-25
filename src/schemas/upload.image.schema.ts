import * as mongoose from 'mongoose';

export const UploadImageSchema = new mongoose.Schema({
  id: String,
  created_at: Number,
  author: String,
  name: String,
  description: String,
  images: Array,
  tags: Array,
});
