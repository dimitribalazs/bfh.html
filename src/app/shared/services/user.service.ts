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
import {AroundYou} from '../domainModel/aroundYou'
import {getDatabase, getFirebaseRef, FirebaseRefs} from './firebase';
import {GeoService} from './geo.service';
import {IGeoData} from "../dto/IGeoData";
import {UserBeerRating} from "../dto/userBeerRating";
import {UserBarRating} from "../dto/userBarRating";
import {Rating} from '../dto/rating';
import {BreweryDatabaseService} from "./brewery.service";
import {Brewery} from "../dto/brewery";
import {isNullOrUndefined} from "util";


@Injectable()
export class UserDatabaseService extends DatabaseService{
    private usersPath: firebase.database.Reference;
    private beersPath: firebase.database.Reference;
    private userBeerRatingsPath: firebase.database.Reference;
    private userBarRatingsPath: firebase.database.Reference;

    constructor(
        private barService: BarDatabaseService,
        private breweryService: BreweryDatabaseService,
        private geoService: GeoService
    ) {
        super();
        this.usersPath = getFirebaseRef(FirebaseRefs.Users);
        this.beersPath = getFirebaseRef(FirebaseRefs.Beers);
        this.userBeerRatingsPath = getFirebaseRef(FirebaseRefs.UserBeerRatings);
        this.userBarRatingsPath = getFirebaseRef(FirebaseRefs.UserBarRatings);
    }

  /**
   * Create new user
   * @param {User} entity
   */
  create(entity: User): void {
      if(isNullOrUndefined(entity)) throw new Error("entity must be defined");

         const newKey: string = this.usersPath.push().key;
         this.usersPath.child(newKey).set(entity);
    }

  /**
   * Update an existing user
   * @param {string} id
   * @param {User} entity
   */
    update(id: string, entity: User): void {
      if(isNullOrUndefined(id)) throw new Error("id must be defined");
      if(isNullOrUndefined(entity)) throw new Error("entity must be defined");

        const apiPath = this.usersPath.child(id);
        apiPath.once(FirebaseEvent.value)
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbUser = snapshot.val() as User;
            super.copyData(entity, dbUser);
            apiPath.set(dbUser).catch((error) => {
              // console.log("Error while updating user", error)
            });
        })
        .catch((error) => {
            // console.log("Error while getting user", error);
        });
    }

  /**
   * Get all users
   * @returns {Observable<User[]>}
   */
  getAll(): Observable<User[]> {
        return Observable.fromEvent(this.usersPath, FirebaseEvent.value, (snapshot) => {
            var result = snapshot.val();
            const users: User[] = [];
            Object.keys(result).map((value:string) => {
                users.push(result[value] as User);
            });

            return users;
        });
    }

  /**
   * Get an user by its id
   * @param {string} id
   * @returns {Observable<User>}
   */
    get(id: string): Observable<User> {
      if(isNullOrUndefined(id)) throw new Error("id must be defined");

        return Observable.fromEvent(this.usersPath.child(id), FirebaseEvent.value, (snapshot) => {
            var result = snapshot.val();
            return result as User;
        });
    }

  /**
   * Get friends of an user
   * @param {string} userId
   * @returns {Observable<User[]>}
   */
    getFriendsOfUser(userId: string): Observable<User[]> {
      if(isNullOrUndefined(userId)) throw new Error("userId must be defined");

      return Observable.fromEvent(this.usersPath.child(userId).child("friends"), FirebaseEvent.value, (snapshot) => {
        const friends: User[] = [];
        const  friendIds = snapshot.val();
        if(friendIds) {
          friendIds.map((value, friendId) => {
            this.usersPath.child(friendId).once(FirebaseEvent.value).then((friendSnapshot) => {
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

  /**
   * Get favorites beers from an user
   * @param {string} userId
   * @returns {Observable<Beer[]>}
   */
  getFavoriteBeersOfUser(userId: string): Observable<Beer[]> {
    if(isNullOrUndefined(userId)) throw new Error("userId must be defined");

    return Observable.fromEvent(this.usersPath.child(userId).child("favoriteBeers"), FirebaseEvent.value, (snapshot) => {
      const beers: Beer[] = [];
      const  beerIds = snapshot.val();
      if(beerIds) {
        beerIds.map((value, beerId) => {
          this.beersPath.child(beerId).once(FirebaseEvent.value).then((beerSnapshot) => {
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

  /**
   * Get beer ratings from an user
   * @param {string} userId
   * @returns {Observable<UserBeerRating[]>}
   */
  getBeerRatingsByUserId(userId: string): Observable<UserBeerRating[]> {
    if(isNullOrUndefined(userId)) throw new Error("userId must be defined");

    return Observable.fromEvent(this.userBeerRatingsPath, FirebaseEvent.value, (snapshot) => {
      const ratings: UserBeerRating[] = [];
      const dbData = snapshot.val() || [];
      Object.keys(dbData).map(value => ratings.push(dbData[value] as UserBeerRating));
      return ratings.filter(rating => rating.user == userId);
    });
  }



}
