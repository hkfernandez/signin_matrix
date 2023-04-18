const firebaseConfig = require("../utils/firebase_config");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

const firebaseApp = initializeApp(firebaseConfig);

try {
  module.exports.auth = getAuth(firebaseApp);
  if (module.exports.auth) {
    console.log("-----------FIREBASE AUTH CONNECTED-------------Í");
  }
} catch (error) {
  console.log("FIREBASE AUTH CONNECTION ERROR: ", error);
}
try {
  module.exports.db = getFirestore(firebaseApp);
  if (module.exports.db) {
    console.log("-----------FIRESTORE DB CONNECTED-------------Í");
  }
} catch (error) {
  console.log("FIRESTORE DB CONNECTION ERROR: ", error);
}
