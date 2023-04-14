//PACKAGES
require("dotenv").config();
const routes = require("./routes/index");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { initializeApp } = require("firebase/app");

//VARIABLES
const path = require("path");
const expressApp = express();
const EXPRESS_PORT = 3000;
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

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
async function connectToDataBase() {
  const dbConnectionUrl =
    "mongodb://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.HOST_NAME +
    ":" +
    process.env.MONGODB_PORT +
    "/favorites?authSource=admin";
  console.log("connectionUrl: ", dbConnectionUrl);
  try {
    await mongoose.connect(dbConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("----------- db connection error: ", error);
  }
}
//connectToDataBase();

try {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DATABASE CONNECTION SUCCESSFUL");
  });
} catch (error) {
  console.log("mongoose.connection error: ", error);
}

//START ROUTER
const listening = expressApp.listen(EXPRESS_PORT);
if (listening) {
  console.log("--------- Listenting on port " + EXPRESS_PORT + " ---------");
} else {
  console.log("--------- Uable to start server ----------");
}
