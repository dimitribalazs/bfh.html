import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/combineLatest';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {BarDatabaseService} from './bar.service';
import {User} from '../dto/user';
import {Beer} from '../dto/beer';
import {getFirebaseRef, FirebaseRefs} from './firebase';
import {GeoService} from './geo.service';
import {UserBeerRating} from "../dto/userBeerRating";
import {BreweryDatabaseService} from "./brewery.service";
import {isNullOrUndefined} from "util";
import {SearchResult} from "../dto/searchResult";
import {count} from "rxjs/operator/count";

@Injectable()
export class UserDatabaseService extends DatabaseService{
    private usersPath: firebase.database.Reference;
    private beersPath: firebase.database.Reference;
    private userBeerRatingsPath: firebase.database.Reference;
    private userBarRatingsPath: firebase.database.Reference;
    private userFriendsPath: firebase.database.Reference;
    private userBeerDrankPath: firebase.database.Reference;
    private searchResultsPath: firebase.database.Reference;


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
        this.userFriendsPath = getFirebaseRef(FirebaseRefs.UserFriends);
        this.userBeerDrankPath = getFirebaseRef(FirebaseRefs.UserBeerDrank);
        this.searchResultsPath = getFirebaseRef(FirebaseRefs.SearchResults);
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
              console.log("Error while updating user", error)
              throw new Error("Error while updating user");
            });
        })
        .catch((error) => {
          console.log("Error while updating user", error)
          throw new Error("Error while updating user");
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

    return Observable.fromEvent(this.userFriendsPath.orderByChild("user").equalTo(userId), FirebaseEvent.value, (snapshot) => {
      const friends: User[] = [];
      const dbData = snapshot.val() || [];
      Object.keys(dbData).map(value => friends.push(dbData[value] as User));
      return friends;
    });
  };



  /**
   * Get favorites beers from an user
   * @param {string} userId
   * @returns {Observable<Beer[]>}
   */
  getFavoriteBeersOfUser(userId: string): Observable<any> {
    if(isNullOrUndefined(userId)) throw new Error("userId must be defined");

    let drank = Observable.fromEvent(this.userBeerDrankPath.orderByChild("user").equalTo(1), FirebaseEvent.value, (snapshot) => {
        let returnData = [];
        let dbData = snapshot.val() || [];
        Object.keys(dbData).map((value) => {
          returnData.push(dbData[value]);
        });
        return returnData;
    });

    let ratings = Observable.fromEvent(this.userBeerRatingsPath.orderByChild("user").equalTo(userId), FirebaseEvent.value, (snapshot) => {
      let returnData = [];
      let dbData = snapshot.val() || [];
      Object.keys(dbData).map((value) => {
        returnData.push(dbData[value]);
      });
      return returnData;
    });


    return Observable.zip(
      drank,
      ratings,
      (beersDrank, beerRating) => {
          let sorted = [];
          let counted = [];

          //increment for favorites
          beersDrank.map((beer)=> {
            if(isNullOrUndefined(beer.beer) == false) {
              if(isNullOrUndefined(counted[beer.beer])) {
                counted[beer.beer] = 0;
              }
              counted[beer.beer] += 1;
            }
          });

          counted.map((data, key) => {
            sorted.push({
              beerId: key,
              count: data
            })
          });

         let sameAmount = [];
         sorted.sort(function(a, b) {
           if (a.count > b.count) {
             return -1;
           }
           if (a.count < b.count) {
             return 1;
           }
           else {
             sameAmount.push(a.beerId);
            return 0;
           }
         });

         let newSorted = [];
         sameAmount.map(same => {
           beerRating.map(rating => {
             if(rating.beer == same.beerId) {
               if(isNullOrUndefined(newSorted[same.count])) {
                 newSorted[same.count] = [];
               }
               newSorted[same.count].push({
                 rating: rating.rating,
                 beer: rating.beer,
                 count: same.count
               });
             }
           });
         });

         newSorted.map(sortData => {
           sortData.sort(function(a, b) {
             if (a.rating > b.rating) {
               return -1;
             }
             if (a.rating < b.rating) {
               return 1;
             }
             else {
               return 0;
             }
           });
         });

         let final = [];
         sorted.map(data => {
           if(isNullOrUndefined(newSorted[data.count]) == false) {
               newSorted[data.count].map(foo => {
                 final.push({
                   beerId: foo.beer,
                   count: foo.count,
                 });
               })
           } else {
             final.push(data);
           }
         });
         console.log("sorted", sorted)
        return sorted;
      }
    );
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

  /**
   * Get search results
   * @param {string} word
   * @returns {Observable<SearchResult[]>}
   */
  searchResults(word: string): Observable<SearchResult[]> {
    let searchWord = word.toLowerCase();
    // \uf8ff
    //https://stackoverflow.com/questions/38618953/how-to-do-a-simple-search-in-string-in-firebase-database
    return Observable.fromEvent(this.searchResultsPath.orderByChild("searchWord").startAt(searchWord).endAt(searchWord + "\uf8ff"), FirebaseEvent.value, (snapshot) => {
      return snapshot.val() as SearchResult[];
    });
  }
}
