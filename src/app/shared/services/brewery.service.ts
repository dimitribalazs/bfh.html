import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService} from './database.service';
import {Brewery} from '../dto/brewery';

@Injectable()
export class BreweryDatabaseService<Brewery> extends DatabaseService<Brewery>{
    private breweriesPath: firebase.database.Reference;
    constructor() {
        super();
        this.breweriesPath = this.getDatabase().ref("breweries");
    }

    create(entity: Brewery): void {
         const newKey: string = this.breweriesPath.push().key;
         //validate stuff
         console.log(newKey)
         this.breweriesPath.child(newKey).set(entity);
    }

    update(id: string, entity: Brewery): void {
        //https://firebase.google.com/docs/database/web/lists-of-data
        var resultFromApi = new Brewery();
        Object.keys(entity).map((value, index) => {
            //update
            if(value) {
                resultFromApi[index] = value;
            }
        });
    }
    
    getAll(): Observable<Brewery[]> {
        return Observable.fromEvent(this.breweriesPath, "value", (snapshot) => {
            var result = snapshot.val();
            const brewery: Brewery[] = [];
            Object.keys(result).map((value:string) => {
                brewery.push(result[value] as Brewery);
            });

            return brewery;
        });
    }

    get(id: string): Observable<Brewery> {
        return null;
    }
}