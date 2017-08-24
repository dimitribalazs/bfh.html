import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService} from './database.service';
import {getDatabase} from './firebase';
import {Bar} from '../dto/bar';

@Injectable()
export class BarDatabaseService<Bar> extends DatabaseService<Bar>{
    private barsPath: firebase.database.Reference;
    constructor() {
        super();
        this.barsPath = getDatabase().ref("bars");
    }

    create(entity: Bar): void {
         const newKey: string = this.barsPath.push().key;
         //validate stuff
         console.log(newKey)
         this.barsPath.child(newKey).set(entity);
    }

    update(id: string, entity: Bar): void {
        //https://firebase.google.com/docs/database/web/lists-of-data
        var resultFromApi = new Bar();
        Object.keys(entity).map((value, index) => {
            //update
            if(value) {
                resultFromApi[index] = value;
            }
        });
    }

    getAll(): Observable<Bar[]> {
        return Observable.fromEvent(this.barsPath, "value", (snapshot) => {
            var result = snapshot.val();
            const bars: Bar[] = [];
            Object.keys(result).map((value:string) => {
                bars.push(result[value] as Bar);
            });

            return bars;
        });
    }

    get(id: string): Observable<Bar> {
        return null;
    }
}
