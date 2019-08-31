import {Document} from 'mongoose';

export interface ITemporary extends Document {
  id: string;
  name: string;
  freeprice: boolean;
  avgprice: number;
  avgpricechild: number;
  agechild: number;
  contacts: string;
}
