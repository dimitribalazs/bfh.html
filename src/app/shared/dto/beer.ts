import {Brewery} from './brewery';
import {Bar} from './bar';
import {GeoData} from './geoData';

export class Beer {
    id: string;
    name: string;
    description: string;
    volume: number;
    brewType: BrewType;
    rating: number
    brewery: Brewery
    bars: Bar[];
    image: string;
    taste: Taste;
    location: GeoData;
}

export enum BrewType {
    Obergärig,
    Untergärig,
    IPA,
    Bock,
    Stout,
    Ale
}

export enum Taste {
    Fruchtig,
    Herb,
    Saeurlich,
    Roestig,
    Mild,
    Gewuerzbetont,
    Rauchig,
    Hopfig,
    Malzig
}
