/* 
  Title : Signup Route 
  Description : Handles all signup Requests 
  Author : Aritra Pal
  Date : 13/12/2022 
*/

//dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//internal Dependencies
const userModel = require("../dbHandlers/Models/userModel");
const {
  ValidationMiddlewares,
  validationHandler,
} = require("../../helpers/validators/signupValidator");

//creating router
const router = express.Router();

//POST Signup Request
router.post(
  "/",
  ValidationMiddlewares,
  validationHandler,
  async (req, res, next) => {
    //fetch user response from req.body and save it to users collection
    try {
      const userObj = req.body;
      userObj.password = await bcrypt.hash(req.body.password, 10);
      const userModdelInstance = new userModel(userObj);
      const result = await userModdelInstance.save();
      res.status(200).send({ message: "Registration Successful", result });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ errors: { common: err.message } });
    }
  }
);

//exporting the router
module.exports = router;
