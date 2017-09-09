import {Beer} from './Beer';
import {GeoData} from './geoData';

export class Brewery {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  homepage: string;
  tel: string;
  geoLocation: GeoData;
  beers: Beer[];
  description: string;
  image: string;
}
