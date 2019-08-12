import { Document } from 'mongoose';

export interface Hotel extends Document {
  readonly hotelId: number;
  readonly name: string;
  readonly description: string;
  readonly open: number;
  readonly close: number;
  readonly photos: [string];
  readonly verified: boolean;
  readonly type: string;
  readonly stars: number;
  readonly avgprice: number;
  readonly distance: number;
  readonly desktime: string;
  readonly roomtype: [string];
  readonly hotelextras: [string];
  readonly roomextras: [string];
  readonly disabilityextras: [string];
  readonly isnetwork: boolean;
  readonly journeytypes: [string];
  readonly foodtypes: [string];
  readonly roomsavailable: [object];
  readonly shoreline: number;
  readonly specialextras: [string];
}
