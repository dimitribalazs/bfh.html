import { Brewery } from './brewery';
import { BarBeer } from './barBeer';
import { GeoData } from './geoData';
import { IGeoData } from './IGeoData';

export class Beer implements IGeoData {
  id: string;
  name: string;
  description: string;
  volume: number;
  brewType: DropDownEntry[];
  rating: number
  brewery: string
  bars: BarBeer[];
  image: string;
  taste: DropDownEntry[];
  location: GeoData;
  owner: string;
}

export class DropDownEntry {
  id: string;
  itemName: string;
}

export class DropDownlists {
  tasteList = [
    { 'id': 1, 'itemName': 'Abgestanden' },
    { 'id': 2, 'itemName': 'Bitter' },
    { 'id': 3, 'itemName': 'Blumig' },
    { 'id': 4, 'itemName': 'Fruchtig' },
    { 'id': 5, 'itemName': 'Gewuerzbetont' },
    { 'id': 6, 'itemName': 'Herb' },
    { 'id': 7, 'itemName': 'Hopfig' },
    { 'id': 8, 'itemName': 'Kraft' },
    { 'id': 9, 'itemName': 'Malzig' },
    { 'id': 10, 'itemName': 'Mild' },
    { 'id': 11, 'itemName': 'Rauchig' },
    { 'id': 12, 'itemName': 'Röstig' },
    { 'id': 13, 'itemName': 'Säurlich' },
    { 'id': 14, 'itemName': 'Suffig' },
    { 'id': 15, 'itemName': 'Süss' }
  ];

  brewTypeList = [
    { 'id': 1, 'itemName': 'Ale' },
    { 'id': 2, 'itemName': 'Bock' },
    { 'id': 3, 'itemName': 'IPA' },
    { 'id': 4, 'itemName': 'Lager' },
    { 'id': 5, 'itemName': 'Obergärig' },
    { 'id': 6, 'itemName': 'Stout' },
    { 'id': 7, 'itemName': 'Untergärig' },
  ];
}
