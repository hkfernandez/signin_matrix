import { firebaseConfig } from "../../../utils/firebase_config.js";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseApp = initializeApp(firebaseConfig);

let auth = "";
let cloudFunctions = "";

try {
  auth = getAuth(firebaseApp);
  if (auth) {
    console.log("!Firebase Auth Connected!");
  }
} catch (error) {
  console.log("!!!FIREBASE AUTH CONNECTION ERROR!!! ", error);
}
try {
  cloudFunctions = getFunctions(firebaseApp);
  if (cloudFunctions) {
    console.log("!Firebase Cloud Functions Initalized!");
  }
} catch (error) {
  console.log("!!!FIREBASE FUNCTIONS INTIALIZATION ERROR!!! ", error);
}

export function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const addRole = cloudFunctions.httpCallable("addRole");
      addRole({ uid: user.uid, admin: true, user: true })
        .then((message) => console.log(message))
        .catch((error) => console.log("error adding roles: ", error));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user signed in");
      return userCredential.user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("error in signing in", errorMessage);
    });
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("USER_ID:", uid);
    // ...
  } else {
    // User is signed out
    // ...
    console.log("user is signed out");
    document.getElementById("navigateToPillsBtn").click();
  }
});
