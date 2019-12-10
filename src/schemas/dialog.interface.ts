import {Document} from 'mongoose';

interface Member {
  id: string;
  role: string;
  notification: boolean;
}

export interface IDialog extends Document {
  id: string;
  refType: string;
  ref: string;
  created_at: number;
  updated_at: number;
  author: string;
  name: string;
  avatar: string;
  members: [string];
}
