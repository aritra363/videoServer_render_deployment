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

//model Dependencies
const userModel = require("../dbHandlers/Models/userModel");

//creating router
const router = express.Router();

//POST Signup Request
router.post("/", async (req, res, next) => {
  //fetch user response from req.body and save it to users collection
  try {
    //check if user exist then return user already exists
    const userIsExsist = await userModel.find({ email: req.body.email });
    if (userIsExsist.length) {
      res.status(409).send({ message: "User Already Exist" });
    } else {
      const userObj = req.body;
      userObj.password = await bcrypt.hash(req.body.password,10);
      const userModdelInstance = new userModel(userObj)
      await userModdelInstance.save()
      res.status(200).send({message:"Registration Successful"})
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message:err.message });
  }
});

//exporting the router
module.exports = router;
