import * as mongoose from 'mongoose';

import {commonPlace} from './common.place.schema';

export const HotelSchema = new mongoose.Schema({
  ...commonPlace,
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
