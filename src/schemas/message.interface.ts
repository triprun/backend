import {Document} from 'mongoose';

export interface IMessage extends Document {
  dialogId: string;
  author: string;
  created_at: number;
  updated_at: number;
  text: string;
  readMembers: [string];
  deleteForMe: boolean;
  deleteForAll: boolean;
  modified: boolean;
}
