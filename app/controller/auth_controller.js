const path = require("path");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} = require("firebase/auth");

const { auth } = require("../model/firebase_services");

module.exports = {
  getSigninPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../view/html/index.html"));
  },
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
