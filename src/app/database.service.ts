import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class DatabaseService {
    saveTest(): void {
        console.log("saved");
        var config = {
            apiKey: "AIzaSyCG2d_4Vxd7uHHdDLl0A-Rkj4t6Fjhgcu8",
            authDomain: "duffd-83c72.firebaseapp.com",
            databaseURL: "https://duffd-83c72.firebaseio.com",
            projectId: "duffd-83c72",
            storageBucket: "duffd-83c72.appspot.com",
            messagingSenderId: "758400835541"
        };
        var app = firebase.initializeApp(config);
        var database = app.database();
        database.ref("users/4").set({
            name: "Prix Garantie",
            geschmack: "gruusig"
        });
    }

    listen(): void {
        const config = {
            apiKey: "AIzaSyCG2d_4Vxd7uHHdDLl0A-Rkj4t6Fjhgcu8",
            authDomain: "duffd-83c72.firebaseapp.com",
            databaseURL: "https://duffd-83c72.firebaseio.com",
            projectId: "duffd-83c72",
            storageBucket: "duffd-83c72.appspot.com",
            messagingSenderId: "758400835541"
        };
        const app = firebase.initializeApp(config);
        const database = app.database();
        const dataPath: firebase.database.Reference = database.ref("users/");
        dataPath.once("value", function(data) {
            console.log(data.val());
        });
    }


}
