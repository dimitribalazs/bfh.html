import {Beer} from './Beer';
import {GeoData} from './geoData';

export class Brewery {
  id: string;
  name: string;
  adress: string;
  city: string;
  email: string;
  tel: string;
  geoLocation: GeoData;
  beers: Beer[];
  description: string;
  image: string;
}
