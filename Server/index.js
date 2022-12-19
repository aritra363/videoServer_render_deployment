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

//helpers file dependencies
const environments = require("./helpers/environments");
const dbConnection = require("./helpers/dbConnection");

//routes dependencies
const signup = require("./handlers/routeHandlers/signup");
const signin = require("./handlers/routeHandlers/signin");

//create app object
const app = express();

//instructing app to use view engine
app.set("view engine", "ejs");

//Instructing app to use morgan as a request logger
app.use(morgan("dev"));

//Instructing app to use cors policy
app.use(cors());

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

//custom 404 Error Handler
app.use((req, res, next) => {
  res.render("index");
});

//running the server on staging port
app.listen(environments.port, () => {
  console.log(`Listening on port ${environments.port}`);
});
