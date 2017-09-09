import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { DatabaseService, FirebaseEvent } from './database.service';
import { getDatabase } from './firebase';
import { Beer } from '../dto/beer';

@Injectable()
export class BeerDatabaseService<Beer> extends DatabaseService<Beer>{
  private beersPath: firebase.database.Reference;
  constructor() {
    super();
    this.beersPath = getDatabase().ref("beers");
  }


  create(entity: any): void {
    this.beersPath.orderByChild("name")
      .equalTo(entity.name).once("value").then((snapshot) => {
        let found = false;
        const beers = snapshot.val(); //as Beer[];

        if (beers !== undefined) {
          beers.forEach((beer) => {
            if (beer.brewery.name == entity.brewery.name && beer.volume == entity.volume) {
              found = true;
            }
          });
        }

        if (found) throw new Error(`Beer ${entity.name} already exists`);

        const newKey: string = this.beersPath.push().key;
        this.beersPath.child(newKey).set(entity);

      });
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

