import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService} from './database.service';
import {User} from '../dto/user';

@Injectable()
export class UserDatabaseService<User> extends DatabaseService<User>{
    private usersPath: firebase.database.Reference;
    constructor() {
        super();
        this.usersPath = this.database.ref("users");
    }

    create(entity: User): void {
         const newKey: string = this.usersPath.push().key;
         //validate stuff
         console.log(newKey)
         this.usersPath.child(newKey).set(entity);
    }

    update(id: string, entity: User): void {
        //https://firebase.google.com/docs/database/web/lists-of-data
        var resultFromApi = new User();
        Object.keys(entity).map((value, index) => {
            //update
            if(value) {
                resultFromApi[index] = value;
            }
        });
    } 
    
    getAll(): Observable<User[]> {
        return Observable.fromEvent(this.usersPath, "value", (snapshot) => {
            var result = snapshot.val();
            const users: User[] = [];
            Object.keys(result).map((value:string) => {
                users.push(result[value] as User);
            });

            return users;
        });
    }

    get(id: string): Observable<User> {
        return null;
    }
}