import {MarschrouteCompanionDto} from './companion.dto';
import {PlaceDto} from './place.dto';

export interface MarschrouteAnyResponse {
  id: string;
  name: string;
  description: string;
  author: number;
  type: number;
  status: number;
  companions: [MarschrouteCompanionDto];
}
