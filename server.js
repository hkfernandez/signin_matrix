//MODULES
import "dotenv/config";
import { router } from "./routers/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//import path from "path";

//PORTS
const EXPRESS_PORT = 3000;

//ROUTER CONFIG
const expressApp = express();
expressApp.use(express.json());
expressApp.use(cors());
expressApp.use(cookieParser());
expressApp.use("/favicon.ico", express.static("images/favicon.ico"));
expressApp.use("/static", express.static("./client/dist"));
expressApp.use(router);

//START ROUTER
const listening = expressApp.listen(EXPRESS_PORT);
if (listening) {
  console.log("-----------Listenting on port " + EXPRESS_PORT + "-----------");
} else {
  console.log("!!!--------UNABLE TO START SERVER---------!!!");
}

//favicon attribution
//https://www.flaticon.com/free-icons/star
