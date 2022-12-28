/* 
  Title : Index file 
  Description : This is the entry point of the Server side 
  Author : Aritra Pal
  Date : 13/12/2022 
*/

//dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const path = require("path");

//helpers file dependencies
const dbConnection = require("./helpers/dbConnection");

//routes dependencies
const signup = require("./handlers/routeHandlers/signup");
const signin = require("./handlers/routeHandlers/signin");
const upload = require("./handlers/routeHandlers/upload");

//assign port
const PORT = process.env.PORT || 4000;
//create app object
const app = express();

//instructing app to use view engine
app.set("view engine", "ejs");

//Instructing app to use morgan as a request logger
app.use(morgan("dev"));

//Instructing app to use cors policy
app.use(cors());

//making static path for video upload
app.use(express.static(path.join(__dirname, "public")));

//Instructing app to use bodyparser to parse x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Instructing app to use bodyparser to parse json data
app.use(bodyParser.json());

//connection to db
dbConnection;

//sending request to specific route
app.use("/signup", signup);
app.use("/signin", signin);
app.use("/upload", upload);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//custom 404 Error Handler
app.use((req, res, next) => {
  res.render("index");
});

//running the server on staging port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
