import { Document } from 'mongoose';

export interface IRestaurant extends Document {
    restId: string;
    readonly name: string;
    readonly description: string;
    readonly open: number;
    readonly close: number;
    readonly photos: [string];
    readonly verified: boolean;
    readonly cuisine: [string];
    readonly type: string;
    readonly limitations: [string];
    readonly bestToVisit: [string];
    readonly avgprice: number;
    readonly suitableFor: [string];
    readonly extras: [string];
}
