import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {getDatabase} from './firebase';
import {Beer} from '../dto/beer';
import {BarBeer} from "../dto/barBeer";
import {isNullOrUndefined} from "util";

@Injectable()
export class BeerDatabaseService extends DatabaseService {
  private beersPath: firebase.database.Reference;
  private barBeersPath: firebase.database.Reference;

  constructor() {
    super();
    this.beersPath = getDatabase().ref("beers");
    this.barBeersPath = getDatabase().ref("barBeers");
  }

  exists(entity: Beer): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.beersPath.orderByChild("name").equalTo(entity.name).once("value").then((snapshot) => {
        const beers = snapshot.val(); //as Beer[];
        //if (!isNullOrUndefined(beers)) {
        beers.forEach((beer) => {
          if (beer.name === entity.name) {
            // if (beer.brewery.name === entity.brewery.name && beer.volume === entity.volume) {
            resolve(true)
          }
          resolve(false)
        })
        //}
        resolve(false)
      })
    })
  }


  create(entity: Beer): string {
    const newKey: string = this.beersPath.push().key;
    entity.id = newKey
    this.beersPath.child(newKey).set(entity);
    return newKey;
  }

  update(id: string, entity: Beer): void {
    //https://firebase.google.com/docs/database/web/lists-of-data
    const resultFromApi = this.beersPath.child(id);
    resultFromApi.once(FirebaseEvent.value.toString())
      .then((snapshot: firebase.database.DataSnapshot) => {
        let dbBeer = snapshot.val() as Beer;
        super.copyData(entity, dbBeer);
        resultFromApi.set(dbBeer).catch((error) => console.log("Error while updating beer", error));
      })
      .catch((error) => {
         console.log("Error while getting beer", error);
      });
  }

  getAll(): Observable<Beer[]> {
    return Observable.fromEvent(this.beersPath, FirebaseEvent.value.toString(), (snapshot) => {
      var result = snapshot.val();
      const beers: Beer[] = [];
      Object.keys(result).map((value: string) => {
        beers.push(result[value] as Beer);
      });

      return beers;
    });
  }

  getAllBarBeersByBarId(barId: string): Observable<BarBeer[]> {
    return Observable.fromEvent(this.barBeersPath, FirebaseEvent.value.toString(), (barBeerSnapshot) => {
      const barBeers: BarBeer[] = [];
      const dbData = barBeerSnapshot.val();
      Object.keys(dbData).map(value => barBeers.push(dbData[value] as BarBeer));
      return barBeers.filter(barBeer => barBeer.bar == barId);
    });
  }

  getAllBarBeersByBeerId(beerId: string): Observable<BarBeer[]> {
    return Observable.fromEvent(this.barBeersPath, FirebaseEvent.value.toString(), (barBeerSnapshot) => {
      const barBeers: BarBeer[] = [];
      const dbData = barBeerSnapshot.val();
      Object.keys(dbData).map(value => barBeers.push(dbData[value] as BarBeer));
      return barBeers.filter(barBeer => barBeer.beer == beerId);
    });
  }

  getAllBeersByBreweryId(breweryId: string): Observable<Beer[]> {
    return Observable.fromEvent(this.beersPath, FirebaseEvent.value.toString(), (beerSnapshot) => {
      const beers: Beer[] = [];
      const dbData = beerSnapshot.val();
      Object.keys(dbData).map(value => beers.push(dbData[value] as Beer));
      return beers.filter(beer => beer.brewery == breweryId);
    });
  }

  get(id: string): Observable<Beer> {
    return Observable.fromEvent(this.beersPath.child(id), FirebaseEvent.value.toString(), (snapshot) => {
      var result = snapshot.val();
      return result as Beer;
    });
  }
}

