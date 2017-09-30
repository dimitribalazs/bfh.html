import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {FirebaseRefs, getDatabase, getFirebaseRef} from './firebase';
import {Bar} from '../dto/bar';
import {BarBeer} from '../dto/barBeer';
import {UserBarRating} from '../dto/userBarRating';
import {UserBeer} from "../dto/userBeer";
import {BarStatistics} from "../dto/barStatistics";
import {UserBar} from "../dto/userBar";
import {isNullOrUndefined} from "util";


@Injectable()
export class BarDatabaseService extends DatabaseService{
    private barsPath: firebase.database.Reference;
    private barBeersPath: firebase.database.Reference;
    private beersPath: firebase.database.Reference;
    private userBarRatingsPath: firebase.database.Reference;
    private userBarVisitedPath: firebase.database.Reference;

    constructor() {
        super();
        this.barsPath = getFirebaseRef(FirebaseRefs.Bars);
        this.beersPath = getFirebaseRef(FirebaseRefs.Beers);
        this.barBeersPath = getFirebaseRef(FirebaseRefs.BarBeers);
        this.userBarRatingsPath = getFirebaseRef(FirebaseRefs.UserBeerRatings);
        this.userBarVisitedPath = getFirebaseRef(FirebaseRefs.UserBarVisited);
    }

  /**
   * Create new bar
   *
   * @param {Bar} entity
   */
  create(entity: Bar): void {
        if(isNullOrUndefined(entity)) throw new Error("bar entity must be defined");

         const newKey: string = this.barsPath.push().key;
         this.barsPath.child(newKey).set(entity);
    }

  /**
   * Update existing bar
   *
   * @param {string} id
   * @param {Bar} entity
   */
    update(id: string, entity: Bar): void {
      if(isNullOrUndefined(id)) throw new Error("id must be defined");
      if(isNullOrUndefined(entity)) throw new Error("bar entity must be defined");

        const apiPath = this.barsPath.child(id);
        apiPath.once(FirebaseEvent.value)
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbBar = snapshot.val() as Bar;
            super.copyData(entity, dbBar);
            apiPath.set(dbBar).catch((error) => {
              console.log("Error while updating bar", error)
              throw new Error("Error while updating bar");
            });
        })
        .catch((error) => {
          console.log("Error while updating bar", error)
          throw new Error("Error while updating bar");
        });
    }

  /**
   * Get all bar as observable
   *
   * @returns {Observable<Bar[]>}
   */
  getAll(): Observable<Bar[]> {
        return Observable.fromEvent(this.barsPath, FirebaseEvent.value, (snapshot) => {
            let  result = snapshot.val();
            const bars: Bar[] = [];
            Object.keys(result).map((value:string) => {
                bars.push(result[value] as Bar);
            });

            return bars;
        });
    }

  /**
   * Get a bar by its id
   *
   * @param {string} id
   * @returns {Observable<Bar>}
   */
    get(id: string): Observable<Bar> {
      if(isNullOrUndefined(id)) throw new Error("id must be defined");

        return Observable.fromEvent(this.barsPath.child(id), FirebaseEvent.value, (snapshot) => {
            var result = snapshot.val();
            const bar: Bar = result;
            return bar;
        });
    }

  /**
   * Add a beer to bar
   *
   * @param {BarBeer} barBeer
   */
  addBeerToBar(barBeer: BarBeer): void {
        if(isNullOrUndefined(barBeer)) throw new Error("barBeer must be defined");

        const newKey: string = barBeer.bar + "_" + barBeer.beer;
        this.barBeersPath.child(newKey).set(barBeer);
        this.barsPath.child(barBeer.bar + "/beers/" + newKey).set(true);
        this.beersPath.child(barBeer.beer + "/bars/" + newKey).set(true);
    }

  /**
   * Remove a beer from a bar
   *
   * @param {BarBeer} barBeer
   */
  removeBeerFromBar(barBeer: BarBeer): void {
      if(isNullOrUndefined(barBeer)) throw new Error("barBeer must be defined");

      const newKey: string = barBeer.bar + "_" + barBeer.beer;
      this.barBeersPath.child(newKey).remove();
    }

  /**
   * Get bar ratings by bar id
   *
   * @param {string} barId
   * @returns {Observable<UserBarRating[]>}
   */
    getBarRatingsByBarId(barId: string): Observable<UserBarRating[]> {
      if(isNullOrUndefined(barId)) throw new Error("barId must be defined");

      return Observable.fromEvent(this.userBarRatingsPath, FirebaseEvent.value, (snapshot) => {
        const ratings: UserBarRating[] = [];
        const dbData = snapshot.val() || [];
        Object.keys(dbData).map(value => ratings.push(dbData[value] as UserBarRating));
        return ratings.filter(rating => rating.bar == barId);
      });
    }

  /**
   * Add a rating to a bar
   *
   * @param {UserBarRating} barRating
   */
  addBarRating(barRating: UserBarRating) {
      if(isNullOrUndefined(barRating)) throw new Error("barRating must be defined");

      const newKey: string = barRating.user + "_" + barRating.bar;
      this.userBarRatingsPath.child(newKey).set(barRating);
    }

  /**
   * Get visited bars from a user grouped by date
   *
   * @param {string} userId
   * @returns {Observable<BarStatistics>}
   */
  getVisitedBarsGroupedByDateByUserId(userId: string): Observable<BarStatistics> {
    if(isNullOrUndefined(userId)) throw new Error("userId must be defined");

    return Observable.fromEvent(this.userBarVisitedPath, FirebaseEvent.value, (snapshot) => {
      const beers: UserBeer[] = [];
      const dbData = snapshot.val() || [];
      Object.keys(dbData).map(value => beers.push(dbData[value] as UserBeer));
      const resultsByUser: UserBeer[] = beers.filter(rating =>  rating.user == userId) as UserBeer[];

      const barStatistics = new BarStatistics();
      barStatistics.barsVisitedByDate = new Map<string, UserBar[]>();

      const differentBeers = [];

      resultsByUser.map((result: UserBeer) => {
        if(barStatistics.barsVisitedByDate[result.dateDrank] == undefined) {
          barStatistics.barsVisitedByDate[result.dateDrank] = [];
        }
        barStatistics.barsVisitedByDate[result.dateDrank].push(result);
        differentBeers[result.beer] = true;
      });

      return barStatistics;
    });
  }

  /**
   * Add bar visited
   *
   * @param {UserBar} userBar
   */
  addBarVisited(userBar: UserBar): void {
    if(isNullOrUndefined(userBar)) throw new Error("userBar must be defined");

    this.userBarVisitedPath.push(userBar);
  }
}
