import {Document} from 'mongoose';

interface Comps {
  id: string;
  role: string;
}

export interface IMarschroute extends Document {
  id: string;
  author: number;
  name: string;
  type: number;
  companions: [Comps];
  potentialCompanions: [Comps];
}
