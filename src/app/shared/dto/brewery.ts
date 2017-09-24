import {Beer} from './Beer';
import {GeoData} from './geoData';
import {IGeoData} from "./IGeoData";

export class Brewery implements IGeoData{
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  homepage: string;
  tel: string;
  location: GeoData;
  beers: Beer[];
  description: string;
  image: string;
}
