import { Document } from 'mongoose';

export interface IShopping extends Document {
    id: string;
    contacts: string;
    type: string;
    suitableFor: [string];
    extras: [string];
}
