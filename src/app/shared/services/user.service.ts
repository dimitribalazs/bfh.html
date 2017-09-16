import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/zip';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {BarDatabaseService} from './bar.service';
import {BeerDatabaseService} from './beer.service';
import {User} from '../dto/user';
import {Beer} from '../dto/beer';
import {Bar} from '../dto/bar';
import {GeoData} from '../dto/geoData';
import {AroundYou} from '../dto/aroundYou'
import {getDatabase} from './firebase';
import {GeoService} from './geo.service';
import {IGeoData} from "../dto/IGeoData";
import {UserBeerRating} from "../dto/userBeerRating";


@Injectable()
export class UserDatabaseService extends DatabaseService{
    private usersPath: firebase.database.Reference;
    private beersPath: firebase.database.Reference;
    private userBeerRatingsPath: firebase.database.Reference;
    private userBarRatingsPath: firebase.database.Reference;

    constructor(
        private barService: BarDatabaseService,
        private beerService: BeerDatabaseService,
        private geoService: GeoService
    ) {
        super();
        this.usersPath = getDatabase().ref("users");
        this.beersPath = getDatabase().ref("beers");
        this.userBeerRatingsPath = getDatabase().ref("userBeerRatings");
      this.userBeerRatingsPath = getDatabase().ref("userBarRatings");
    }

    create(entity: User): void {
         const newKey: string = this.usersPath.push().key;
         this.usersPath.child(newKey).set(entity);
    }

    update(id: string, entity: User): void {
        const apiPath = this.usersPath.child(id);
        apiPath.once("value")
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbUser = snapshot.val() as User;
            super.copyData(entity, dbUser);
            apiPath.set(dbUser).catch((error) => console.log("Error while updating user", error));
        })
        .catch((error) => {
            // console.log("Error while getting user", error);
        });
    }

    getAll(): Observable<User[]> {
        return Observable.fromEvent(this.usersPath, FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            const users: User[] = [];
            Object.keys(result).map((value:string) => {
                users.push(result[value] as User);
            });

            return users;
        });
    }

    get(id: string): Observable<User> {
        return Observable.fromEvent(this.usersPath.child(id), FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            return result as User;
        });
    }

    //todo statt any müssen wirr hier noch eine klasse definiere oder verwenden wir hier aroundYou.ts?
    //todo in riccos service
    getAroundYou(myPosition: GeoData, userId: string): Observable<any> {
     return Observable.zip(
        this.barService.getAll(),
        this.beerService.getAll(),
        this.getAll(),
        (bars: Bar[], beers: Beer[], users: User[]) => {
            let flatData: IGeoData[] = [].concat(...bars, ...beers, ...users);
            return flatData.filter((geoLocation: IGeoData) =>
                this.geoService.isInRange(myPosition, geoLocation.location)
            );
        });
    }

    getFriendsOfUser(userId: string): Observable<User[]> {
      return Observable.fromEvent(this.usersPath.child(userId).child("friends"), FirebaseEvent.value.toString(), (snapshot) => {
        const friends: User[] = [];
        const  friendIds = snapshot.val();
        if(friendIds) {
          friendIds.map((value, friendId) => {
            this.usersPath.child(friendId).once("value").then((friendSnapshot) => {
              const friendUser = friendSnapshot.val() as User;
              if(friendUser != null) {
                friends.push(friendUser);
              }
            })
          })
        }
        return friends;
      });
    }

  getFavoriteBeersOfUser(userId: string): Observable<Beer[]> {
    return Observable.fromEvent(this.usersPath.child(userId).child("favoriteBeers"), FirebaseEvent.value.toString(), (snapshot) => {
      const beers: Beer[] = [];
      const  beerIds = snapshot.val();
      if(beerIds) {
        beerIds.map((value, beerId) => {
          this.beersPath.child(beerId).once("value").then((beerSnapshot) => {
            const favoriteBeer = beerSnapshot.val() as Beer;
            if(favoriteBeer != null) {
              beers.push(favoriteBeer);
            }
          })
        })
      }
      return beers;
    });
  }

  getBeerRatingsByUserId(userId: string): Observable<UserBeerRating[]> {
    return Observable.fromEvent(this.userBeerRatingsPath, FirebaseEvent.value.toString(), (snapshot) => {
      const ratings: UserBeerRating[] = [];
      const dbData = snapshot.val();
      Object.keys(dbData).map(value => ratings.push(dbData[value] as UserBeerRating));
      return ratings.filter(rating => rating.user == userId);
    });
  }

  getBeerRatingsByBeerId(beerId: string): Observable<UserBeerRating[]> {
    return Observable.fromEvent(this.userBeerRatingsPath, FirebaseEvent.value.toString(), (snapshot) => {
      const ratings: UserBeerRating[] = [];
      const dbData = snapshot.val();
      Object.keys(dbData).map(value => ratings.push(dbData[value] as UserBeerRating));
      return ratings.filter(rating => rating.beer == beerId);
    });
  }

  getBarRatingsByBarId(beerId: string): Observable<UserBeerRating[]> {
    return Observable.fromEvent(this.userBeerRatingsPath, FirebaseEvent.value.toString(), (snapshot) => {
      const ratings: UserBeerRating[] = [];
      const dbData = snapshot.val();
      Object.keys(dbData).map(value => ratings.push(dbData[value] as UserBeerRating));
      return ratings.filter(rating => rating.beer == beerId);
    });
  }

}
