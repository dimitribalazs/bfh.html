import {GeoData} from './geoData';
import {Beer} from './beer';
//import {Badge} from './badge';

export class User {
    id: string;
    firstname: string;
    lastname: string;
    image: string;
    registrationDate: string;
    location: GeoData;
    beerPreferences: Beer[];
    totalConsumption: number;
    address: string;
    city: string;
    tel: string;
    badge: string;
    d
  ateOfBirth: string;
    //badges: Badge[];
}

export class UserFriends {
    userid: number;
    friends: number[] //list of ids
}
