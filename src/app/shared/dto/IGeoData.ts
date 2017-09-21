import {GeoData} from './geoData';
import {IAroundYou} from "./aroundYou";

export interface IGeoData extends IAroundYou {
  location: GeoData;
}
