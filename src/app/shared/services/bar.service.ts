import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {getDatabase} from './firebase';
import {Bar} from '../dto/bar';
import {BarBeer} from '../dto/barBeer';
import {UserBarRating} from '../dto/userBarRating';

@Injectable()
export class BarDatabaseService extends DatabaseService{
    private barsPath: firebase.database.Reference;
    private barBeersPath: firebase.database.Reference;
    private beersPath: firebase.database.Reference;
    private userBarRatingsPath: firebase.database.Reference;

    constructor() {
        super();
        this.barsPath = getDatabase().ref("bars");
        this.beersPath = getDatabase().ref("beers");
        this.barBeersPath = getDatabase().ref("barBeers");
        this.userBarRatingsPath = getDatabase().ref("userBarRatings");
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
}
