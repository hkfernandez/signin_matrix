const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} = require("firebase/auth");
const firebaseConfig = require("../utils/firebase_config");

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
if (auth) {
  console.log("-----------FIREBASE CONNECTED---------------");
} else {
  console.log("-------FIREBASE UNABLE TO CONNECT-----------");
}

module.exports = {
  signUpUserWithEmailandPassword: ({ body }, res) => {
    console.log("firebase request body: ", body);
    createUserWithEmailAndPassword(auth, body.userName, body.password)
      .then(() => {
        res.json({ message: "sign up success" });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  signInUserWithEmailAndPassword: ({ body }, res) => {
    console.log("firebase request body: ", body);
    signInWithEmailAndPassword(auth, body.userName, body.password)
      .then(() => {
        res.json({ message: "user signed in" });
      })
      .catch((error) => {
        res.json(error);
      });
  },
  signOutUser: (req, res) => {
    signOut(auth)
      .then(() => res.json({ message: "user signed out" }))
      .catch((error) => {
        res.json(error);
      });
  },
  checkUserAuthState: function (req, res) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        res.json({ message: "not logged in" });
      }
    });
  },
};
