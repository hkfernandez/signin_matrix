import { firebaseConfig } from "../../../utils/firebase_config.js";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { setUpUi } from "./setUpUi.js";

const firebaseApp = initializeApp(firebaseConfig);

let auth = "";
let cloudFunctions = "";

try {
  auth = getAuth(firebaseApp);
  if (auth) {
    //console.log("!Firebase Auth Connected!");
  }
} catch (error) {
  console.log("!!!FIREBASE AUTH CONNECTION ERROR!!! ", error);
}
try {
  cloudFunctions = getFunctions(firebaseApp);
  if (cloudFunctions) {
    //console.log("!Firebase Cloud Functions Initalized!");
  }
} catch (error) {
  console.log("!!!FIREBASE FUNCTIONS INTIALIZATION ERROR!!! ", error);
}

export async function createUser(email, password) {
  const newUserUid = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("SIGN UP USER ERROR: ", errorMessage);
      // ..
    });
  const addRoles = httpsCallable(cloudFunctions, "addRoles");
  return addRoles({ uid: newUserUid, admin: true, user: true })
    .then((message) => {
      return message;
    })
    .catch((error) => console.log("error adding roles: ", error));
}
export async function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user.getIdTokenResult())
    .then((idTokenResult) => idTokenResult.claims)
    .catch((error) => {
      throw error.message;
    });
}

export function signOutUser() {
  signOut(auth).catch((error) => {
    return error.message;
  });
}
onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChanged");
  if (user) {
    const uid = user.uid;
    console.log("USER_ID:", uid);
    user.getIdTokenResult().then((idTokenResult) => {
      const userInfo = idTokenResult.claims;
      setUpUi(userInfo);
    });
    // ...
  } else {
    // User is signed out
    // ...
    console.log("user is signed out");
    setUpUi(null);
    document.getElementById("navigateToPillsBtn").click();
  }
});
