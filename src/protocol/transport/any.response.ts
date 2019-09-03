export interface TransportAnyResponse {
  id: string;
  name: string;
  description: string;
  ref: string;
  refType: string;
  open: number;
  close: number;
  photos: [string];
  verified: boolean;
  cuisine: [string];
  type: string;
  limitations: [string];
  bestToVisit: [string];
  avgprice: number;
  suitableFor: [string];
  extras: [string];
}
