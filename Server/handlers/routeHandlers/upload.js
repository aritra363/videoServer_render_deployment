/* 
  Title : Upload Route 
  Description : Handles all upload Requests 
  Author : Aritra Pal
  Date : 23/12/2022 
*/

//dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { unlink } = require("fs");

//internal Dependencies
const videoModel = require("../dbHandlers/Models/videoModel");
const {
  ValidationMiddlewares,
  validationHandler,
} = require("../../helpers/validators/signupValidator");
const videoUploader = require("../../helpers/videoUploader");

//creating router
const router = express.Router();

//POST Upload Request
router.post("/", videoUploader, async (req, res, next) => {
  //fetch user response from req.body and save it to users collection
  try {
    //construct video object
    const videoObj = {
      title: req.body.title,
      userid: req.body._id,
      video: req.files[0].filename,
    };
    const newVideoModel = new videoModel(videoObj);
    const result = await newVideoModel.save();
    res.status(200).send({
      message: "Video Uploaded Successfully!",
    });
  } catch (err) {
    console.log(err.message);
    //remove the uploaded file
    //check if file exists
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      const filePath = path.join(__dirname, "../../public/videos", filename);
      unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    res.status(500).send({ errors: { common: err.message } });
  }
});

//exporting the router
module.exports = router;
