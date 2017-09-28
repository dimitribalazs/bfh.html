import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {Brewery} from '../dto/brewery';
import {FirebaseRefs, getDatabase, getFirebaseRef} from './firebase';
import {isNullOrUndefined} from "util";

@Injectable()
export class BreweryDatabaseService extends DatabaseService{
    private breweriesPath: firebase.database.Reference;
    constructor() {
        super();
        this.breweriesPath = getFirebaseRef(FirebaseRefs.Breweries);
    }

  /**
   * Create a new brewery
   *
   * @param {Brewery} entity
   */
  create(entity: Brewery): void {
        if(isNullOrUndefined(entity)) throw new Error("entity must be defined");

         const newKey: string = this.breweriesPath.push().key;
         this.breweriesPath.child(newKey).set(entity);
    }

  /**
   * Update an existing brewery
   *
   * @param {string} id
   * @param {Brewery} entity
   */
    update(id: string, entity: Brewery): void {
      if(isNullOrUndefined(id)) throw new Error("id must be defined");
      if(isNullOrUndefined(entity)) throw new Error("entity must be defined");

        const apiPath = this.breweriesPath.child(id);
        apiPath.once(FirebaseEvent.value)
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbBrewery = snapshot.val() as Brewery;
            super.copyData(entity, dbBrewery);
            apiPath.set(dbBrewery).catch((error) => {
              // console.log("Error while updating brewery", error)
            });
        })
        .catch((error) => {
            // console.log("Error while getting brewery", error);
        });
    }

  /**
   * Get all breweries
   *
   * @returns {Observable<Brewery[]>}
   */
  getAll(): Observable<Brewery[]> {
        return Observable.fromEvent(this.breweriesPath, FirebaseEvent.value, (snapshot) => {
            const result = snapshot.val();
            const brewery: Brewery[] = [];
            Object.keys(result).map((value:string) => {
                brewery.push(result[value] as Brewery);
            });

            return brewery;
        });
    }

  /**
   * Get a brewery by its id
   *
   * @param {string} id
   * @returns {Observable<Brewery>}
   */
    get(id: string): Observable<Brewery> {
      if(isNullOrUndefined(id)) throw new Error("id must be defined");

        return Observable.fromEvent(this.breweriesPath.child(id), FirebaseEvent.value, (snapshot) => {
            const result = snapshot.val();
            return result as Brewery;
        });
    }
}
