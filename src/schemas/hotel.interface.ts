import {Document} from 'mongoose';

export interface IHotel extends Document {
  id: string;
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
  readonly shoreline: number;
  readonly specialextras: [string];
}
