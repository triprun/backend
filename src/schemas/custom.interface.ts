import {Document} from 'mongoose';

export interface ICustom extends Document {
  id: string;
  name: string;
  freeprice: boolean;
  avgprice: number;
  avgpricechild: number;
  agechild: number;
  contacts: string;
}
