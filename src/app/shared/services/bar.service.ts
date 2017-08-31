import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
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
        return Observable.fromEvent(this.barsPath, FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            let bar: Bar;
            Object.keys(result).filter((value: string) => {
                if(value == id) {
                    bar = result[value] as Bar;
                }
            });
            return bar;
        });
    }
}
