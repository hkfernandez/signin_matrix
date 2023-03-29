//PACKAGES
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

//VARIABLES
const path = require("path");
const app = express();
const EXPRESS_PORT = 3000;
const MONGODB_PORT = 27017;
const DB_USERNAME = "admin";
const DB_PASSWORD = "password";
const DB_NAME = "favorites";
const COLLECTION_NAME = "memes";
const dbConnectionUrl = "mongodb://localhost:27017";
//"mongodb://" + DB_USERNAME + ":" + DB_PASSWORD + "@localhost:" + MONGODB_PORT;

//DATABASE CONFIG
const client = new MongoClient(dbConnectionUrl);

//ROUTER CONFIG
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/test.html"));
});

app.post("/", async function (req, res) {
  const newMeme = req.body;
  const insertionResult = await insertRecord(newMeme);
  console.log("===============INSERTION RESULT ", insertionResult.toString());
  //res.status(insertionResult.status).send("request received" + insertionResult);
});

//DATABASE CONNECTION
async function insertRecord(newMeme) {
  // Use connect method to connect to the server
  try {
    const connection = await client.connect();
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    const result = await collection.insertOne(newMeme);
    if (result.acknowledged) {
      console.log("document inserted");
      await connection.close();
      console.log("connection closed");
      console.log("insertedId: ", result.insertedId);
      return result.insertedId;
    }
  } catch (error) {
    console.log("================ERROR: ", error);
  }
}

//START ROUTER
const listening = app.listen(EXPRESS_PORT);
if (listening) {
  console.log("--------- Listenting on port " + EXPRESS_PORT + " ---------");
} else {
  console.log("--------- Uable to start server ----------");
}
