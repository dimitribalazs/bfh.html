// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//set the  frineds of an user
exports.setUserFriends = functions.database.ref("users").onWrite((event) => {
  //users
  let eventSnapshot = event.data.val() || [];
  let userFriends = {};
  eventSnapshot.map((user) => {
    let friendIds = user.friends || [];
    friendIds.map((friendId) => {
        let key = user.id + "_" + friendId;
        let friend = eventSnapshot.filter((user) =>  user.id == friendId);
        if(friend && friend.length > 0) {
          userFriends[key] = {
            "user": user.id,
            "friend": friend[0].id,
            "firstname": friend[0].firstname,
            "lastname": friend[0].lastname
          };
        }
    });
  });
  event.data.ref.parent.child("userFriends").set(userFriends);
});

//search table update functions
exports.updateSearchTableUser = functions.database.ref("users").onWrite((event) => setSearchResultsValue(event, "user"));
exports.updateSearchTableBar = functions.database.ref("bars").onWrite((event) => setSearchResultsValue(event, "bar"));
exports.updateSearchTableBrewery = functions.database.ref("breweries").onWrite((event) => setSearchResultsValue(event, "brewery"));
exports.updateSearchTableBeer = functions.database.ref("beers").onWrite((event) => setSearchResultsValue(event, "beers"));

//set searchResults
function setSearchResultsValue(event, pathPart) {
  let eventSnapshot = event.data.val() || [];
  Object.keys(eventSnapshot).map((value) => {
    let data = eventSnapshot[value];
    let name = pathPart == "user" ? data.firstname + ', ' + data.lastname : data.name;
    let id = data.id;
    let searchWord = name.toLowerCase();
    let searchDisplay = name;

    event.data.ref.parent.child("searchResults/" + pathPart + "_" + id).set({"id": id, "searchWord": searchWord, "searchDisplay": searchDisplay});
  });
}

//favorites, not working yet
exports.calculateFavoritesWhenUserBeerDrankChanges = functions.database.ref("userBeerDrank").onWrite((event) => {
  //userBeerDrank
  let eventSnapshot = event.data.val() || [];
  console.log("eventSnapshot ", eventSnapshot );
  let favorites = [];
  Object.keys(eventSnapshot).map((value) => {
    console.log("true", value);
    let userBeerDrank = eventSnapshot[value];
    console.log("value", userBeerDrank)
    let user = userBeerDrank.user;
    console.log("user", user)
    let beer = userBeerDrank.beer;
    console.log("bbeer", beer)
    if(user != "undefined" && beer != "undefined") {
      if(favorites[user] == "undefined") {
        console.log("foooo1")
        favorites[user] = [];
        favorites[user][beer] = 0;

      }
      if(favorites[user][beer] == "undefined")    {
        console.log("fav")
        favorites[user][beer] = 0;
      }
      console.log("foooo2")
      favorites[user][beer] += 1;
    }
  });

  let sorted = []
  favorites.map((favorite) => {
    console.log("favorite", favorite);
        favorite.sort(function(a, b) {
            if (a < b)
              return -1;
            if (a > b)
              return 1;
            return 0;
        });

        favorite.map((data) => {
          let key = favorite.key + "_" + data;
          sorted[key] = data;
        });
  })

  console.log("sorted", sorted);
});

exports.calculateFavoritesWhenUserBeerRatingChanges = functions.database.ref("userBeerRatings").onWrite((event) => {
  //userBeerRatings

  //calculateFavorites(event.data);
});

function calculateFavorites(root) {
  let dbUserBeerDrank = [];
  let dbUserBeerRatings = [];


  admin.database().ref("userBeerDrank").once("value")
    .then((userBeerDrank) => {
          let allData = userBeerDrank.val() || [];
          allData.map((data) => dbUserBeerDrank.push(data));
  console.log("ubd", dbUserBeerDrank);
  console.log("ubr", dbUserBeerRatings);

        // admin.database().ref("userBeerRatings").once("value")
        //   .then((userBeerRatings) => {
        //       let allData1 = userBeerRatings.val() || [];
        //       allData1.map((data) => dbUserBeerRatings.push(data));
        //
        //       console.log("ubd", dbUserBeerDrank);
        //       console.log("ubr", dbUserBeerRatings);
        //   });
      });

}

