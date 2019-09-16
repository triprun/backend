import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  dialogId: String,
  author: String,
  created_at: Number,
  updated_at: Number,
  text: String,
  readMembers: Array,
  deleteForMe: Boolean,
  deleteForAll: Boolean,
  modified: Boolean,
});
