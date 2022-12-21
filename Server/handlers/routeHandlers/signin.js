/* 
  Title : Signin Route 
  Description : Handles all Login Requests 
  Author : Aritra Pal
  Date : 19/12/2022 
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
} = require("../../helpers/validators/signinValidator");

//creating router
const router = express.Router();

//POST Signin Request
router.post(
  "/",
  ValidationMiddlewares,
  validationHandler,
  async (req, res, next) => {
    //fetch user response from req.body and check if its fond or not
    try {
      //check if user exist then check for password
      const userIsExsist = await userModel.find({ email: req.body.email });
      if (userIsExsist.length) {
        //check for password
        const userIsPasswordValid = await bcrypt.compare(
          req.body.password,
          userIsExsist[0].password
        );
        if (userIsPasswordValid) {
          //create userobj to output user
          const userObj = {
            Name: userIsExsist[0].firstName + " " + userIsExsist[0].lastName,
            Email: userIsExsist[0].email,
          };
          res
            .status(200)
            .send({ message: "Login Successfull", result: userObj });
        } else {
          //password didnt match
          res.status(401).send({ message: "Invalid Mail or Password" });
        }
      } else {
        //user doesnt Exist
        res.status(401).send({ message: "Invalid Mail or Password" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  }
);

//exporting the router
module.exports = router;
