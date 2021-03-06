import {GeoData} from './geoData';
import {IGeoData} from './IGeoData';
import {BadgeType} from "../domainModel/badgeType";

export class User implements IGeoData {
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
  badges: BadgeType[];
  administrator: boolean;
}

export class UserFriends {
  userid: number;
  friends: number[] //list of ids
}
