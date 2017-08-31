import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {Brewery} from '../dto/brewery';
import {getDatabase} from './firebase';

@Injectable()
export class BreweryDatabaseService<Brewery> extends DatabaseService<Brewery>{
    private breweriesPath: firebase.database.Reference;
    constructor() {
        super();
        this.breweriesPath = getDatabase().ref("breweries");
    }

    create(entity: Brewery): void {
         const newKey: string = this.breweriesPath.push().key;
         this.breweriesPath.child(newKey).set(entity);
    }

    update(id: string, entity: Brewery): void {
        const apiPath = this.breweriesPath.child(id);
        apiPath.once(FirebaseEvent.value.toString())
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbBrewery = snapshot.val() as Brewery;
            super.copyData(entity, dbBrewery);
            apiPath.set(dbBrewery).catch((error) => console.log("Error while updating brewery", error));
        })
        .catch((error) => {
            console.log("Error while getting brewery", error);
        });
    }

    getAll(): Observable<Brewery[]> {
        return Observable.fromEvent(this.breweriesPath, FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            const brewery: Brewery[] = [];
            Object.keys(result).map((value:string) => {
                brewery.push(result[value] as Brewery);
            });

            return brewery;
        });
    }

    get(id: string): Observable<Brewery> {
        return Observable.fromEvent(this.breweriesPath, FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            let brewery: Brewery;
            Object.keys(result).filter((value:string) => {
                if(value == id) {
                    brewery = result[value] as Brewery;
                }
            });
            return beer;
        });
    }
}
