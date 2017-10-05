import {GeoData} from './geoData';
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
  openingHours: Array<OpenTime>;
  snacks: string;
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
