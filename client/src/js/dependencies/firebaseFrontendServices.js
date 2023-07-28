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
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .then((user) => {
      const addRoles = httpsCallable(cloudFunctions, "addRoles");
      addRoles({ uid: user.uid, admin: true, user: true });
    })
    .catch((error) => {
      throw error.message;
    });
}

export async function signInUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user.getIdTokenResult())
    .then((idTokenResult) => idTokenResult.claims)
    .catch((error) => {
      throw error.message;
    });
}

export function signOutUser() {
  signOut(auth).catch((error) => {
    throw error.message;
  });
}
onAuthStateChanged(auth, (user) => {
  const signedInUsername = document.getElementById("signedInUsername");
  const signOutBtn = document.getElementById("signOutBtn");
  if (user) {
    signedInUsername.innerText = `Hi ${extractUserName(user.email)}!`;
    signedInUsername.style.display = "block";
    signOutBtn.style.display = "block";
    user.getIdTokenResult().then((idTokenResult) => {
      const userPermissions = idTokenResult.claims;
      setUpUi(userPermissions);
    });
    // ...
  } else {
    signedInUsername.textContent = "";
    signedInUsername.style.display = "none";
    signOutBtn.style.display = "none";
    // User is signed out
    // ...
    setUpUi(null);
  }
});

function extractUserName(email) {
  const ampersandLocation = email.indexOf("@");
  return email.slice(0, ampersandLocation);
}
