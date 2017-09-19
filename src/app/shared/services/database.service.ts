import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';

export enum FirebaseEvent  {
    value = "value",
    child_changed = "child_changed",
    child_added = "child_added",
    child_removed = "child_removed",
    child_moved = "child_moved"
}

export abstract class DatabaseService {

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
