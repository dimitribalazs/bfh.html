import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { DatabaseService, FirebaseEvent } from './database.service';
import { getDatabase } from './firebase';
import { Beer } from '../dto/beer';
import {BarBeer} from "../dto/barBeer";

@Injectable()
export class BeerDatabaseService<Beer> extends DatabaseService<Beer>{
  private beersPath: firebase.database.Reference;
  private barBeersPath: firebase.database.Reference;
  constructor() {
    super();
    this.beersPath = getDatabase().ref("beers");
    this.barBeersPath = getDatabase().ref("beerBars");
  }

  /*
  exists(entity: any): Promise<boolean> {

    return this.beersPath.orderByChild("name").equalTo(entity.name).once("value").then((snapshot) => {
      const beers = snapshot.val(); //as Beer[];
      if (beers !== undefined) {
        beers.forEach((beer) => {
          if (beer.brewery.name == entity.brewery.name && beer.volume == entity.volume) {
            //return true;
          }
        });
      }

      return false;
    });
  } */


  create(entity: any): string {
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

  getAllBeersByBarId(barId: number): Observable<Beer[]> {
    return Observable.fromEvent(this.barBeersPath.orderByChild("bar").equalTo(barId), FirebaseEvent.value.toString(), (barBeerSnapshot) => {
      var barBeers = barBeerSnapshot.val();
      const beers: Beer[] = [];
      console.log(barBeers);

      Object.keys(barBeers).map((value: string) => {
          let barBeer  = barBeers[value] as BarBeer;
          this.beersPath.child(barBeer.beer.toString()).once(FirebaseEvent.value.toString(), (beerSnapshot) => {
            beers.push(beerSnapshot.val() as Beer);
          });
      });

      return beers;
      });
  }

  getAllBeerByBreweryId(breweryId: number): Observable<Beer[]> {
    return Observable.fromEvent(this.beersPath.orderByChild("brewery").equalTo(breweryId), FirebaseEvent.value.toString(), (beerSnapshot) => {
      const beers: Beer[] = beerSnapshot.val() as Beer[];
      return beers;
    });
  }

  get(id: string): Observable<Beer> {
    return Observable.fromEvent(this.beersPath, FirebaseEvent.value.toString(), (snapshot) => {
      var result = snapshot.val();
      let beer: Beer;
      Object.keys(result).filter((value: string) => {
        if (value == id) {
          beer = result[value] as Beer;
        }
      });
      return beer;
    });
  }
}

