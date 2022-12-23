/* 
  Title : Video Model
  Description : Defines the Video collections model
  Author : Aritra Pal
  Date : 23/12/2022 
*/

//dependencies
const mongoose = require("mongoose");

//Schema Dependencies
const videoSchema = require("../Schema/videoSchema");

//defining Model
const videoModel = mongoose.model("Video", videoSchema);

//exporting user's Model
module.exports = videoModel;
