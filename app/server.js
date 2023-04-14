//MODULES
require("dotenv").config();
require("./model/firebase_services");
const routes = require("./routes/index");
const express = require("express");
const cors = require("cors");
const path = require("path");

//PORTS
const EXPRESS_PORT = 3000;

//ROUTER CONFIG
const expressApp = express();
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
