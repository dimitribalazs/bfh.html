import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {getDatabase} from './firebase';
import {Bar} from '../dto/bar';
import {BarBeer} from '../dto/barBeer';
import {UserBarRating} from '../dto/userBarRating';
import {UserBeer} from "../dto/userBeer";
import {BarStatistics} from "../dto/barStatistics";
import {UserBar} from "../dto/userBar";


@Injectable()
export class BarDatabaseService extends DatabaseService{
    private barsPath: firebase.database.Reference;
    private barBeersPath: firebase.database.Reference;
    private beersPath: firebase.database.Reference;
    private userBarRatingsPath: firebase.database.Reference;
    private userBarVisitedPath: firebase.database.Reference;

    constructor() {
        super();
        this.barsPath = getDatabase().ref("bars");
        this.beersPath = getDatabase().ref("beers");
        this.barBeersPath = getDatabase().ref("barBeers");
        this.userBarRatingsPath = getDatabase().ref("userBarRatings");
        this.userBarVisitedPath = getDatabase().ref("userBarVisited");
    }

    create(entity: Bar): void {
         const newKey: string = this.barsPath.push().key;
         this.barsPath.child(newKey).set(entity);
    }

    update(id: string, entity: Bar): void {
        const apiPath = this.barsPath.child(id);
        apiPath.once(FirebaseEvent.value.toString())
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbBar = snapshot.val() as Bar;
            super.copyData(entity, dbBar);
            apiPath.set(dbBar).catch((error) => console.log("Error while updating bar", error));
        })
        .catch((error) => {
             console.log("Error while getting bar", error);
        });
    }

    getAll(): Observable<Bar[]> {
        return Observable.fromEvent(this.barsPath, FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            const bars: Bar[] = [];
            Object.keys(result).map((value:string) => {
                bars.push(result[value] as Bar);
            });

            return bars;
        });
    }

    get(id: string): Observable<Bar> {
        return Observable.fromEvent(this.barsPath.child(id), FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            const bar: Bar = result;
            return bar;
        });
    }

    addBeerToBar(barBeer: BarBeer): void {
        const newKey: string = barBeer.bar + "_" + barBeer.beer;
        this.barBeersPath.child(newKey).set(barBeer);
        this.barsPath.child(barBeer.bar + "/beers/" + newKey).set(true);
        this.beersPath.child(barBeer.beer + "/bars/" + newKey).set(true);
    }

    removeBeerFromBar(barBeer: BarBeer): void {
      const newKey: string = barBeer.bar + "_" + barBeer.beer;
      this.barBeersPath.child(newKey).remove();
    }

    getBarRatingsByBarId(barId: string): Observable<UserBarRating[]> {
      return Observable.fromEvent(this.userBarRatingsPath, FirebaseEvent.value.toString(), (snapshot) => {
        const ratings: UserBarRating[] = [];
        const dbData = snapshot.val();
        Object.keys(dbData).map(value => ratings.push(dbData[value] as UserBarRating));
        return ratings.filter(rating => rating.bar == barId);
      });
    }

    addBarRating(barRating: UserBarRating) {
      const newKey: string = barRating.user + "_" + barRating.bar;
      this.userBarRatingsPath.child(newKey).set(barRating);
    }

  getVisitedBarsGroupeByDateByUserId(userId: string): Observable<BarStatistics> {
    return Observable.fromEvent(this.userBarVisitedPath, FirebaseEvent.value.toString(), (snapshot) => {
      const beers: UserBeer[] = [];
      const dbData = snapshot.val() || [];
      Object.keys(dbData).map(value => beers.push(dbData[value] as UserBeer));
      const resultsByUser: UserBeer[] = beers.filter(rating =>  rating.user == userId) as UserBeer[];
      const barStatistics = new BarStatistics();
      barStatistics.barsVisitedByDate = new Map<number, UserBar[]>();

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

  addBarVisited(userBar: UserBar): void {
    this.userBarVisitedPath.push(userBar);
  }

}
