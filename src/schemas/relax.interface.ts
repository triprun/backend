import { Document } from 'mongoose';

export interface IRelax extends Document {
    restId: string;
    freeprice: boolean;
    avgprice: number;
    avgpricechild: number;
    agechild: number;
    contacts: string;
}
