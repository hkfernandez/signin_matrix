//PACKAGES
require("dotenv").config();
const routes = require("./routes/meme_routes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//VARIABLES
const path = require("path");
const app = express();
const EXPRESS_PORT = 3000;

//ROUTER CONFIG
app.use(express.json());
app.use(cors());
app.use(routes);

//ROUTES
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./view/html/signUpPage.html"));
});

//DB CONNECTION
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
const listening = app.listen(EXPRESS_PORT);
if (listening) {
  console.log("--------- Listenting on port " + EXPRESS_PORT + " ---------");
} else {
  console.log("--------- Uable to start server ----------");
}
