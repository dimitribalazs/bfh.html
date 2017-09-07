import {GeoData} from './geoData';
import {Beer} from './beer'

export class Bar {
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
    //beer
}

export class BreweryBeer {
    beer: Beer;
    bar: Bar;
    price: number;
    tapOrBottled: boolean;
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
