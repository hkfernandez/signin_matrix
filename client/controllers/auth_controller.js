//import path from "path";
//import express from "express";
//const expressApp = express();
//import {
//  createUserWithEmailAndPassword,
//  signInWithEmailAndPassword,
//  signOut,
//  onAuthStateChanged,
//} from "firebase/auth";

//import { auth } from "../model/firebase_services.js";

//onAuthStateChanged(auth, (userInfo) => {
//  console.log("logged in user email ", userInfo?.email);
//  if (userInfo) {
//    expressApp.use(function (req, res, next) {
//      res.setHeader("user", userInfo);
//      next();
//    });
//  } else {
//    expressApp.use(function (req, res, next) {
//      res.setHeader("user", null);
//      next();
//    });
//  }
//});

export const authController = {
  //  getSigninPage: (req, res) => {
  //    res.sendFile(path.join(__dirname, "../view/html/index.html"));
  //  },
  //  signUpUserWithEmailandPassword: ({ body }, res) => {
  //    //console.log("firebase request body: ", body);
  //    createUserWithEmailAndPassword(auth, body.userName, body.password)
  //      .then(() => {
  //        res.json({ message: "sign up success" });
  //      })
  //      .catch((error) => {
  //        console.log("---------- SIGN UP WITH EMAIL AND PASSWORD ERROR", error);
  //      });
  //  },
  //  signInUserWithEmailAndPassword: ({ body }, res) => {
  //    signInWithEmailAndPassword(auth, body.userName, body.password)
  //      .then((response) => {
  //        res.json({ message: "user signed in" });
  //      })
  //      .catch((error) => {
  //        res.json("---------- SIGN IN WITH EMAIL AND PASSWORD ERROR", error);
  //      });
  //  },
  //  signOutUser: (req, res) => {
  //    console.log("signOut user called");
  //    signOut(auth)
  //      .then(() => res.json({ message: "user signed out" }))
  //      .catch((error) => {
  //        res.json("---------- SIGN OUT ERROR", error);
  //      });
  //  },
  //  checkUserAuthState: function (req, res) {
  //    console.log("user email on checking state: ", user.email);
  //    res.send(user);
  //  },
};
