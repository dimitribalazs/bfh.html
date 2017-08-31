import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {User} from '../dto/user';
import {getDatabase} from './firebase';

@Injectable()
export class UserDatabaseService<User> extends DatabaseService<User>{
    private usersPath: firebase.database.Reference;
    constructor() {
        super();
        this.usersPath = getDatabase().ref("users");
    }

    create(entity: User): void {
         const newKey: string = this.usersPath.push().key;
         this.usersPath.child(newKey).set(entity);
    }

    update(id: string, entity: User): void {
        const apiPath = this.usersPath.child(id);
        apiPath.once("value")
        .then((snapshot: firebase.database.DataSnapshot) => {
            let dbUser = snapshot.val() as User;
            super.copyData(entity, dbUser);
            apiPath.set(dbUser).catch((error) => console.log("Error while updating user", error));
        })
        .catch((error) => {
            console.log("Error while getting user", error);
        });
    }

    getAll(): Observable<User[]> {
        return Observable.fromEvent(this.usersPath, FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            const users: User[] = [];
            Object.keys(result).map((value:string) => {
                users.push(result[value] as User);
            });

            return users;
        });
    }

    get(id: string): Observable<User> {
        return Observable.fromEvent(this.usersPath, FirebaseEvent.value.toString(), (snapshot) => {
            var result = snapshot.val();
            let user: User;
            Object.keys(result).filter((value:string) => {
                if(value == id) {
                    user = result[value] as User;
                }
            });
            return user;
        });
    }
}
