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
const replaceExt = require("replace-ext");

//internal Dependencies
const videoModel = require("../dbHandlers/Models/videoModel");
const {
  ValidationMiddlewares,
  validationHandler,
} = require("../../helpers/validators/signupValidator");
const videoUploader = require("../../helpers/videoUploader");
const createThumbnail = require("../../helpers/thumbnail");

//creating router
const router = express.Router();

//POST Upload Request
router.post("/", videoUploader, async (req, res, next) => {
  //fetch user response from req.body and save it to users collection
  try {
    const video_name = req.files[0].filename;
    const thumb_name = replaceExt(video_name, ".png");
    //create and upload thumbnail
    const thumbUpload = await createThumbnail(video_name, thumb_name);
    if (thumbUpload) {
      //construct video object
      const videoObj = {
        title: req.body.title,
        userid: req.body._id,
        video: video_name,
        thumb: thumb_name,
      };
      const newVideoModel = new videoModel(videoObj);
      const result = await newVideoModel.save();
      res.status(200).send({
        message: "Video Uploaded Successfully!",
      });
    }
  } catch (err) {
    console.log(err.message);
    //remove the uploaded file
    //check if file exists
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      const filePath1 = path.join(__dirname, "../../public/videos", filename);
      unlink(filePath1, (err) => {
        if (err) {
          console.log(err);
        } else {
          const  filename2  = replaceExt(filename,".png")
          const filePath1 = path.join(
            __dirname,
            "../../public/thumb",
            filename2
          );
        }
      });
    }
    res.status(500).send({ errors: { common: err.message } });
  }
});

//GET ALL the videos
router.get("/", async (req, res, next) => {
  //find all videos
  try {
    const result = await videoModel.find({}).populate("userid").exec();
    res.status(200).send({
      message: "Fetch Successfully",
      result: result,
    });
  } catch (err) {
    res.status(500).send({
      errors: {
        common: "500 Internal Server Error",
      },
    });
  }
});

//demo
router.put("/", (req, res, next) => {
  createThumbnail();
  res.send("");
});

//exporting the router
module.exports = router;
