export interface ShoppingAnyResponse {
  id: string;
  name: string;
  description: string;
  open: number;
  close: number;
  photos: [string];
  verified: boolean;
  type: string;
  suitableFor: [string];
  extras: [string];
}
