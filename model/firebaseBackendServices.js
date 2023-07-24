import { firebaseConfig } from "../client/utils/firebase_config.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);

export let db = "";

try {
  db = getFirestore(firebaseApp);
  if (db) {
    console.log("-----------Firebase DB Connected-------------");
  }
} catch (error) {
  console.log("!!!-------FIRESTORE DB CONNECTION ERROR-------!!! ", error);
}

//export { auth, db };
