import {Beer} from './Beer';
import {GeoData} from './geoData';

export class Brewery {
    id: string;
    name: string;
    ort: string;
    geoLocation: GeoData;
    beers: Beer[];
    description: string;
    logo: string;
}
