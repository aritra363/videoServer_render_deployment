/* 
  Title : Video uploader
  Description : Middleware that uploads users's video 
  Author : Aritra Pal
  Date : 23/12/2022 
*/
//dependencies
const uploader = require("./fileUpload");

//Video upload middleware that calls the uploader function that has the multer functionality
const videoUpload = (req, res, next) => {
  const upload = uploader(
    "videos", //folder name
    "video/mp4", //file types to allow
    process.env.VIDEO_SIZE, //filesize to allow
    "only mp4 and file size less than 1gb" //error message if any error occurs
  );
  //now we must call the upload.any() here so that we can handle its error here
  upload.any("video")(req, res, (err) => {
    if (err) {
      res.status(500).send({
        error: {
          video: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

//exporting the videoUpload middleware
module.exports = videoUpload;
