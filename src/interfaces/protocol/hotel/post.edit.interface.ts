import { Document } from 'mongoose';

export interface HotelPostEditInterface extends Document {
  hotelId: string;
  name?: string;
  description?: string;
  open?: number;
  close?: number;
  photos?: [string];
  verified?: boolean;
  type?: string;
  stars?: number;
  avgprice?: number;
  distance?: number;
  desktime?: string;
  roomtype?: [string];
  hotelextras?: [string];
  roomextras?: [string];
  disabilityextras?: [string];
  isnetwork?: boolean;
  journeytypes?: [string];
  foodtypes?: [string];
  roomsavailable?: [object];
  shoreline?: number;
  specialextras?: [string];
  accessToken: string;
}
