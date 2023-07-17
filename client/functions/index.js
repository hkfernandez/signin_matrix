const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
//functions need to be added to the exports object and defined as a firebase function
//the function type is set as http and onCall which means it can be called
//the parameter for the function is a callback that is executed when the function is called
//the data parameter of the callback is any data we are sending when calling the function
//context provides auth info about the user making the call to fire the function
//in the function - find the user and add a custom claim to that user
//exports.addRole = functions.https.onCall((data, context) => {
//  return admin
//    .auth()
//    .getUserByEmail(data.email)
//    .then((user) => {
//      return (
//        admin
//          .auth()
//          //identify the user by id
//          //second parameter is an object with values to set to claims for that user
//          .setCustomUserClaims(user.uid, { admin: data.admin, user: data.user })
//      );
//    })
//    .then(() => {
//      return {
//        //return final message upon success
//        message: `Success, ${data.email} has been added with roles of admin: ${data.admin} and user: ${data.user}`,
//      };
//    })
//    .catch((error) => console.log(error));
//});

exports.addRoles = functions.https.onCall((data, context) => {
  return (
    admin
      .auth()
      //identify the user by id
      //second parameter is an object with values to set to claims for that user
      .setCustomUserClaims(data.uid, { admin: data.admin, user: data.user })
      .then(() => {
        return {
          //return final message upon success
          message: `Success, ${data.email} has been added with roles of admin: ${data.admin} and user: ${data.user}`,
        };
      })
      .catch((error) =>
        console.log("error with Firebase cloud function", error)
      )
  );
});
