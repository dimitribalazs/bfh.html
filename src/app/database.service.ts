import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import * as beer from './dto/beer';

export abstract class DatabaseService<T> implements OnInit {
    private config = {
        apiKey: "AIzaSyCG2d_4Vxd7uHHdDLl0A-Rkj4t6Fjhgcu8",
        authDomain: "duffd-83c72.firebaseapp.com",
        databaseURL: "https://duffd-83c72.firebaseio.com",
        projectId: "duffd-83c72",
        storageBucket: "duffd-83c72.appspot.com",
        messagingSenderId: "758400835541"
    };



    private app: firebase.app.App;
    database: firebase.database.Database;

    constructor() {
        console.log("init DatabaseService")
        this.app = firebase.initializeApp(this.config);
        this.database = this.app.database();
    }

    ngOnInit(): void {
        console.log("init DatabaseService via onInit")
    }
    saveTest(): void {
        console.log("saved");
        this.database.ref("beers/3").set({
            name: "Prix Garantie " + (new Date).getUTCSeconds(),
            geschmack: "gruusig"
        });
    }

    listen(): void {
        console.log("listen");
        const dataPath: firebase.database.Reference = this.database.ref("beers");
        dataPath.on("child_added", function(data) {
            console.log("yuhe")
            console.log("keykey: " + data.val());
        });

        dataPath.on("value", (data: firebase.database.DataSnapshot) => {
            console.log("beer: ");
            console.log(data.val());
            data.val() as beer.Beer[];

        });
    }

    getListOfNearbyStuff(): void {
        //via firebase functions
    }

    abstract create(entity: T): void;
    abstract update(id: number, entity: T): void;
}

@Injectable()
export class BeerDatabaseService<Beer> extends DatabaseService<beer.Beer>{
    private beersPath: firebase.database.Reference;
    constructor() {
        super();
        this.beersPath = this.database.ref("beers");
    }


    create(entity: beer.Beer): void {
         const newKey: string = this.beersPath.push().key;
         //validate stuff
         console.log(newKey)
         this.beersPath.child(newKey).set(entity);
    }

    update(id: number, entity: beer.Beer): void {
        //https://firebase.google.com/docs/database/web/lists-of-data
        var resultFromApi = new beer.Beer();
        Object.keys(entity).map((value, index) => {
            //update
            if(value) {
                resultFromApi[index] = value;
            }
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
}



//https://github.com/firebase/quickstart-js/blob/master/database/scripts/main.js
//var newPostKey = firebase.database().ref().child('posts').push().key;
