import {GeoData} from './geoData';
import {Beer} from './beer';
import {BarBeer} from './barBeer';
import {IGeoData} from './IGeoData';
import {Time} from "../domainModel/viewModels";

export class Bar implements IGeoData {
  id: string;
  name: string;
  address: string;
  city: string;
  plz: string;
  rating: number;
  size: number;
  isSmokingAllowed: boolean;
  openingHours: Array<OpenTime>; //todo change
  snacks: string; //todo change
  location: GeoData;
  description: String;
  image: string;
  beers: string[];
}

export class OpeningHours {
  monday: Array<Time>;
  tuesday: Array<Time>;
  wednesday: Array<Time>;
  thursday: Array<Time>;
  friday: Array<Time>;
  saturday: Array<Time>;
  sunday: Array<Time>;


  // constructor() {
  //   this.monday = '';
  //   this.tuesday = '';
  //   this.wednesday = '';
  //   this.thursday = '';
  //   this.friday = '';
  //   this.saturday = '';
  //   this.sunday = '';
  // }

}

export class OpenTime {
  day: number;
  openHoure: number;
  openMin: number;
  openSec: number
  closeHoure: number;
  closeMin: number;
  closeSec: number
}
