//MODULES
require("dotenv").config();
require("./app/model/firebase_services");
const routes = require("./app/routes/index");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

//PORTS
const EXPRESS_PORT = 3000;

//ROUTER CONFIG
const expressApp = express();
expressApp.use(express.json());
expressApp.use(cors());
expressApp.use(cookieParser());
expressApp.use("/favicon.ico", express.static("images/favicon.ico"));
expressApp.use("/static", express.static(path.join(__dirname, "app/static")));
expressApp.use(routes);

//START ROUTER
const listening = expressApp.listen(EXPRESS_PORT);
if (listening) {
  console.log("--------- Listenting on port " + EXPRESS_PORT + " ---------");
} else {
  console.log("--------- Uable to start server ----------");
}

//favicon attribution
//https://www.flaticon.com/free-icons/star
