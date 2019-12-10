import {Document} from 'mongoose';

interface Image {
  path: string;
  size: string;
}

export interface IUploadImage extends Document {
  id: string;
  created_at: number;
  author: string;
  name: string;
  description: string;
  images: [Image];
  tags: [string];
}
