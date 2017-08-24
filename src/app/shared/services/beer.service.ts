import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService} from './database.service';
import {getDatabase} from './firebase';
import {Beer} from '../dto/beer';

@Injectable()
export class BeerDatabaseService<Beer> extends DatabaseService<Beer>{
    private beersPath: firebase.database.Reference;
    constructor() {
        super();
        this.beersPath = getDatabase().ref("beers");
    }


    create(entity: Beer): void {
         const newKey: string = this.beersPath.push().key;
         //validate stuff
         console.log(newKey)
         this.beersPath.child(newKey).set(entity);
    }

    update(id: string, entity: Beer): void {
        //https://firebase.google.com/docs/database/web/lists-of-data
        const resultFromApi = this.beersPath.child(id);
        resultFromApi.once("value")
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbBeer = snapshot.val() as Beer;
            Object.keys(entity).map((value, index) => {
                //update
                if(entity.hasOwnProperty(value)) {
                    dbBeer[value] = entity[value];
                }
            });
            resultFromApi.set(dbBeer).catch((error) => console.log("Error while updating beer", error));
        })
        .catch((error) => {
            console.log("Error while getting beer", error)
        });
    }

    getAll(): Observable<Beer[]> {
        return Observable.fromEvent(this.beersPath, "value", (snapshot) => {
            var result = snapshot.val();
            const beers: Beer[] = [];
            Object.keys(result).map((value:string) => {
                beers.push(result[value] as Beer);
            });

            return beers;
        });
    }

    get(id: string): Observable<Beer> {
        return Observable.fromEvent(this.beersPath, "value", (snapshot) => {
            var result = snapshot.val();
            let beer: Beer;
            Object.keys(result).filter((value:string) => {
                if(value == id) {
                    beer = result[value] as Beer;
                }
            });
            return beer;
        });
    }
}

