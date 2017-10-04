import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCG2d_4Vxd7uHHdDLl0A-Rkj4t6Fjhgcu8",
  authDomain: "duffd-83c72.firebaseapp.com",
  databaseURL: "https://duffd-83c72.firebaseio.com",
  projectId: "duffd-83c72",
  storageBucket: "duffd-83c72.appspot.com",
  messagingSenderId: "758400835541"
};

let database: firebase.database.Database;

/**
 * Get a reference to the Firebase database
 *
 * @returns {firebase.database.Database} Reference
 */
export function getDatabase(): firebase.database.Database {
  if (database === undefined) {
    database = firebase.initializeApp(config).database();
  }
  return database;
}

/**
 * Get Firebase collection mapping
 *
 * @param {FirebaseRefs} firebaseRef      Local collection
 * @returns {firebase.database.Reference} Remote collection
 */
export function getFirebaseRef(firebaseRef: FirebaseRefs): firebase.database.Reference {
  return getDatabase().ref(firebaseRef);
}

/**
 * Provides mapping to Firebase data collections
 */
export enum FirebaseRefs {
  Bars = "bars",
  BarBeers = "barBeers",
  Beers = "beers",
  Breweries = "breweries",
  UserBarRatings = "userBarRatings",
  UserBarVisited = "userBarVisited",
  UserBeerRatings = "userBeerRatings",
  UserBeerDrank = "userBeerDrank",
  Users = "users",
  UserFriends = "userFriends",
  SearchResults = "searchResults"
}

/**
 * Events provided by firebase
 */
export enum FirebaseEvent {
  value = "value",
  child_changed = "child_changed",
  child_added = "child_added",
  child_removed = "child_removed",
  child_moved = "child_moved"
}
