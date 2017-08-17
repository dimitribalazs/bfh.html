import {GeoData} from './geoData';
import {Beer} from './beer'

export class Bar {
    name: string;
    address: string;
    city: string;
    plz: string;
    rating: number;
    size: number;
    isSmokingAllowed: boolean;
    openingHours: string; //todo change
    snacks: string; //todo change
    geoDaten: GeoData;

    //beer
}

export class BreweryBeer {
    beer: Beer;
    bar: Bar;
    price: number;
    tapOrBottled: boolean;
}
