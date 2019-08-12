import * as mongoose from 'mongoose';

import { common } from './common.schema';

export const HotelSchema = new mongoose.Schema({
  ...common,
  type: String,
  stars: Number,
  avgprice: Number,
  distance: Number,
  desktime: String,
  roomtypes: [String],
  hotelextras: [String],
  roomextras: [String],
  disabilityextras: [String],
  isnetwork: Boolean,
  journeytypes: [String],
  foodtypes: [String],
  roomsavailable: [{
    roomtype: String,
    available: Number,
  }],
  shoreline: Number,
  specialextras: [String],
});
