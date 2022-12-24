/* 
  Title : Thumbnail generator
  Description : Generates thumbnail of user uploaded video
  Author : Aritra Pal
  Date : 24/12/2022 
*/

//dependencies
const genThumbnail = require("simple-thumbnail");
const ffmpeg = require("ffmpeg-static");

//main function
const createThumbnail = async (video_name, thumb_name) => {
  try {
    await genThumbnail(
      `public/videos/${video_name}`,
      `public/thumb/${thumb_name}`,
      "250x?"
    );
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

//export
module.exports = createThumbnail;
