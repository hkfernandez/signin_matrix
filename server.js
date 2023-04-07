//PACKAGES
require("dotenv").config();
const routes = require("./routes/meme_routes");
const express = require("express");
const cors = require("cors");
//const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const memesController = require("./controller/memes_controller");

//HELPER FUNCTIONS
//const returnVideoEmbedCode = require("./youtubeEmbedCode");
//const js = require("./js/index.mjs");
//import js from "./js/index.mjs";

//VARIABLES
const path = require("path");
const app = express();
const EXPRESS_PORT = 3000;

//DATABASE CONFIG
//const client = new MongoClient(dbConnectionUrl);

//ROUTER CONFIG
app.use(express.json());
app.use(cors());
app.use(routes);
//app.use(express.urlencoded({ extended: true }));

//ROUTES
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./view/html/landingPage.html"));
});
app.get("/allMemes", function (req, res) {
  memesController.findAll();
  console.log("-------------all memes from db:");
});

//DB CONNECTION
async function connectToDataBase() {
  const dbConnectionUrl =
    "mongodb://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@localhost:" +
    process.env.MONGODB_PORT +
    "/favorites?authSource=admin";
  try {
    await mongoose.connect(dbConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("----------- db connection error: ", error);
  }
}
connectToDataBase();

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
const listening = app.listen(EXPRESS_PORT);
if (listening) {
  console.log("--------- Listenting on port " + EXPRESS_PORT + " ---------");
} else {
  console.log("--------- Uable to start server ----------");
}
