export interface HotelAnyResponse {
  id: string;
  name: string;
  description: string;
  ref: string;
  refType: string;
  open: number;
  close: number;
  photos: [string];
  verified: boolean;
  type: string;
  stars: number;
  avgprice: number;
  distance: number;
  desktime: string;
  roomtype: [string];
  hotelextras: [string];
  roomextras: [string];
  disabilityextras: [string];
  isnetwork: boolean;
  journeytypes: [string];
  foodtypes: [string];
  shoreline: number;
  specialextras: [string];
}
