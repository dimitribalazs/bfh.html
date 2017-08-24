/**
 * Created by STRI on 24.08.2017.
 */

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCG2d_4Vxd7uHHdDLl0A-Rkj4t6Fjhgcu8",
  authDomain: "duffd-83c72.firebaseapp.com",
  databaseURL: "https://duffd-83c72.firebaseio.com",
  projectId: "duffd-83c72",
  storageBucket: "duffd-83c72.appspot.com",
  messagingSenderId: "758400835541"
};


let database: firebase.database.Database ;

export function getDatabase(): firebase.database.Database {
  if (database === undefined) {
    database = firebase.initializeApp(config).database();
  }
  return database;
}
