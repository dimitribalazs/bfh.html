import {GeoData} from './geoData';
import {Beer} from './beer';
import {BarBeer} from './barBeer';
import {IGeoData} from './IGeoData';

export class Bar implements IGeoData {
  id: string;
  name: string;
  address: string;
  city: string;
  plz: string;
  rating: number;
  size: number;
  isSmokingAllowed: boolean;
  openingHours: OpeningHours; //todo change
  snacks: string; //todo change
  location: GeoData;
  description: String;
  image: string;
  beers: string[]
}

export class OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;


  constructor() {
    this.monday = '';
    this.tuesday = '';
    this.wednesday = '';
    this.thursday = '';
    this.friday = '';
    this.saturday = '';
    this.sunday = '';
  }
}
