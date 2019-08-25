import { Document } from 'mongoose';

export interface IConcert extends Document {
    hotelId: string;
    naem: string;
    freeprice: boolean;
    avgprice: number;
    avgpricechild: number;
    agechild: number;
    contacts: string;
}
