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
    openingHours: string; //todo change
    snacks: string; //todo change
    location: GeoData;

    //beer
}

export class BreweryBeer {
    beer: Beer;
    bar: Bar;
    price: number;
    tapOrBottled: boolean;
}
