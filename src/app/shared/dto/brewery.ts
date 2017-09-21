import {Beer} from './Beer';
import {GeoData} from './geoData';
import {IGeoData} from "./IGeoData";
import {IAroundYou} from "./aroundYou";

export class Brewery implements IGeoData, IAroundYou{
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

  getSourceTypeName(): string {
    return Brewery.name;
  }
}
