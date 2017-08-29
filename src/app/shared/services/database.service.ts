import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';

export enum FirebaseEvent  {
    value,
    child_changed,
    child_added,
    child_removed,
    child_moved
}

export abstract class DatabaseService<T> implements OnInit {


    constructor() {
        console.log("init DatabaseService")
    }

    ngOnInit(): void {
        console.log("init DatabaseService via onInit")
    }

    listen(): void {
        console.log("listen");
        /*
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
        */
    }

    getListOfNearbyStuff(): void {
        //via firebase functions
    }

    abstract create(entity: T): void;
    abstract update(id: string, entity: T): void;
    abstract get(id: string): Observable<T>;
    abstract getAll(): Observable<T[]>;

    copyData<TSource, TDestination>(source: TSource, destination: TDestination): void {
        Object.keys(source).map((value: string, index: number) => {
            //update
            if(source.hasOwnProperty(value)) {
                destination[value] = source[value];
            }
        });
    }
}




//https://github.com/firebase/quickstart-js/blob/master/database/scripts/main.js
//var newPostKey = firebase.database().ref().child('posts').push().key;
