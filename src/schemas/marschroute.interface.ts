import {Document} from 'mongoose';

interface Comps {
  id: string;
  role: string;
}

interface Places {
  ref: string;
  refType: string;
}
export interface IMarschroute extends Document {
  id: string;
  ref: string;
  created_at: number;
  author: number;
  name: string;
  type: number;
  companions: [Comps];
  potentialCompanions: [Comps];
  places: [Places];
}