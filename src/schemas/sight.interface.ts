import {Document} from 'mongoose';

export interface ISight extends Document {
  id: string;
  freeprice: boolean;
  avgprice: number;
  avgpricechild: number;
  agechild: number;
  contacts: string;
}
