const firebaseConfig = require("../utils/firebase_config");
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
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
  module.exports.db = getDatabase(firebaseApp);
  if (module.exports.db) {
    console.log("-----------FIREBASE DB CONNECTED-------------Í");
  }
} catch (error) {
  console.log("FIREBASE DB CONNECTION ERROR: ", error);
}

//module.exports = { auth, db };
