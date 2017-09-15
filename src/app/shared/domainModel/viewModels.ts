/**
 * Created by STRI on 14.09.2017.
 */
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';

export class BeerModel {
  id: string;
  name: string;
  description: string;
  volume: number;
  brewType: DropDownEntry[];
  rating: number
  brewery: string
  bars: Array<BarModel>;
  image: string;
  taste: DropDownEntry[];
  location: GeoData;

  constructor() {
    this.id = '';
    this.name = '';
    this.volume = 0;
    this.brewType = new Array<DropDownEntry>();
    this.brewery = '';
    this.rating = 0;
    this.image = '';
    this.taste = new Array<DropDownEntry>();
    this.location = new GeoData();
    this.description = '';
  }

}

export class BreweryModel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  homepage: string;
  tel: string;
  geoLocation: GeoData;
  beers: BehaviorSubject<BeerModel[]>;
  description: string;
  image: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.address = '';
    this.city = '';
    this.country = '';
    this.email = '';
    this.homepage = '';
    this.tel = '';
    this.description = '';
    this.geoLocation = new GeoData();
    this.image = '';
    this.beers = new BehaviorSubject<BeerModel[]>(new Array<BeerModel>());
  }

}

export class BarModel {
  id: string;
  name: string;
  address: string;
  city: string;
  plz: string;
  rating: number;
  size: number;
  image: string;
  isSmokingAllowed: boolean;
  openingHours: OpeningHours; //todo change
  snacks: string; //todo change
  location: GeoData;
  description: String;
  // beers: Array<BeerModel>;
  beers: BehaviorSubject<BeerModel[]>

  constructor() {
    this.id = '';
    this.name = '';
    this.address = '';
    this.city = '';
    this.plz = '';
    this.rating = 0;
    this.size = 0;
    this.isSmokingAllowed = false;
    this.openingHours = new OpeningHours();
    this.snacks = '';
    this.location = new GeoData();
    this.description = '';
    // this.beers = new Array<BeerModel>();
    this.beers = new BehaviorSubject<BeerModel[]>(new Array<BeerModel>());
  }
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

export class User {
  id: string;
  firstname: string;
  lastname: string;
  image: string;
  registrationDate: string;
  location: GeoData;
  favoriteBeers: string[]
  totalConsumption: number;
  address: string;
  city: string;
  tel: string;
  badge: string;
  dateOfBirth: string;
  friends: string[]
  //badges: Badge[];
}

export class GeoData {
  id: string;
  longitude: number;
  latitude: number;
}

export class UserFriends {
  userid: number;
  friends: number[] //list of ids
}

export class DropDownEntry {
  id: string;
  itemName: string;
}

export class DropDownlists {

  tasteList = [
    {'id': 1, 'itemName': 'Abgestanden'},
    {'id': 2, 'itemName': 'Bitter'},
    {'id': 3, 'itemName': 'Blumig'},
    {'id': 4, 'itemName': 'Fruchtig'},
    {'id': 5, 'itemName': 'Gewuerzbetont'},
    {'id': 6, 'itemName': 'Herb'},
    {'id': 7, 'itemName': 'Hopfig'},
    {'id': 8, 'itemName': 'Kraft'},
    {'id': 9, 'itemName': 'Malzig'},
    {'id': 10, 'itemName': 'Mild'},
    {'id': 11, 'itemName': 'Rauchig'},
    {'id': 12, 'itemName': 'Röstig'},
    {'id': 13, 'itemName': 'Säurlich'},
    {'id': 14, 'itemName': 'Suffig'},
    {'id': 15, 'itemName': 'Süss'}
  ];

  brewTypeList = [
    {'id': 1, 'itemName': 'Ale'},
    {'id': 2, 'itemName': 'Bock'},
    {'id': 3, 'itemName': 'IPA'},
    {'id': 4, 'itemName': 'Lager'},
    {'id': 5, 'itemName': 'Obergärig'},
    {'id': 6, 'itemName': 'Stout'},
    {'id': 7, 'itemName': 'Untergärig'},
  ];
}

  export class Badge {
  id: string;
  name: string;
}

