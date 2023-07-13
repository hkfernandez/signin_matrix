import { firebaseConfig } from "../client/utils/firebase_config.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAuth } from "firebase/auth";
console.log(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);

//let auth = "";
export let db = "";

//try {
//  auth = getAuth(firebaseApp);
//  if (auth) {
//    console.log("-----------Firebase Auth Connected-------------");
//  }
//} catch (error) {
//  console.log("!!!-------FIREBASE AUTH CONNECTION ERROR-------!!! ", error);
//}

try {
  db = getFirestore(firebaseApp);
  if (db) {
    console.log("-----------Firebase DB Connected-------------");
  }
} catch (error) {
  console.log("!!!-------FIRESTORE DB CONNECTION ERROR-------!!! ", error);
}

//export { auth, db };
