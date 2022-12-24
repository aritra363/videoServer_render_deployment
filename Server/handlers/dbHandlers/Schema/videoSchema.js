/* 
  Title : Video Schema 
  Description : Defines the videos collection schema
  Author : Aritra Pal
  Date : 23/12/2022 
*/

//dependencies
const mongoose = require("mongoose");

//defining Schema
const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//exporting user's schema
module.exports = videoSchema;
