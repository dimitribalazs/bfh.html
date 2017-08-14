import { Injectable, OnInit } from '@angular/core';
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
        this.database.ref("users/4").set({
            name: "Prix Garantie " + (new Date).getUTCSeconds(),
            geschmack: "gruusig"
        });
    }

    listen(): void {
        const dataPath: firebase.database.Reference = this.database.ref("users");
        dataPath.on("child_added", function(data) {
            console.log("yuhe")
            console.log("keykey: " +data.key);
        });
    }

    abstract create(entity: T): void;
    abstract update(id: number, entity: T): void;
}

@Injectable()
export class BeerDatabaseService<Beer> extends DatabaseService<Beer>{
    private usersPath: firebase.database.Reference;
    constructor() {
        super();
        this.usersPath = this.database.ref("users");
    }


    create(entity: Beer): void {
         const newKey: string = this.usersPath.push().key;
         //validate stuff
         console.log(newKey)
         this.usersPath.child(newKey).set(entity);
    }

    update(id: number, entity: Beer): void {
        //https://firebase.google.com/docs/database/web/lists-of-data
        
    }
}



//https://github.com/firebase/quickstart-js/blob/master/database/scripts/main.js
//var newPostKey = firebase.database().ref().child('posts').push().key;