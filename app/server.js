//PACKAGES
require("dotenv").config();
const routes = require("./routes/index");
const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase/app");

//VARIABLES
const path = require("path");
const expressApp = express();
const EXPRESS_PORT = 3000;
const firebaseConfig = require("./utils/firebase_config");

//FIREBASE CONFIG
//const firebaseApp = initializeApp(firebaseConfig);

//ROUTER CONFIG
expressApp.use(express.json());
expressApp.use(cors());
expressApp.use("/static", express.static(path.join(__dirname, "public")));
expressApp.use(routes);

//ROUTES
expressApp.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./view/html/signUpPage.html"));
});

//MONGODB CONNECTION

//START ROUTER
const listening = expressApp.listen(EXPRESS_PORT);
if (listening) {
  console.log("--------- Listenting on port " + EXPRESS_PORT + " ---------");
} else {
  console.log("--------- Uable to start server ----------");
}
