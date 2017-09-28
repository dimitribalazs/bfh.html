// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.getFriends = functions.database.ref("users").onWrite((event) => {
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
