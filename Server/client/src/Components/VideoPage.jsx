/* 
  Title : Video Page 
  Description : The Place where the videoplayer plays the video
  Author : Aritra Pal
  Date : 26/12/2022 
*/
//dependencies
import { useContext } from "react";
import MainContext from "../Context/Main";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import "../ComponentStyle/VideoPage.css";

//main function
function VideoPage() {
  const { fcolor, cardcolor, setCurrent, videoPoster, videoSrc } =
    useContext(MainContext);
  //return jsx
  return (
    <div className="container">
      <br />
      <br />
      <div className="videoContainer">
        <Video
          loop
          controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
          poster={`http://127.0.0.1:4000/thumb/${videoPoster}`}
          onCanPlayThrough={() => {
            // Do stuff
          }}
        >
          <source
            src={`http://127.0.0.1:4000/videos/${videoSrc}`}
            type="video/mp4"
          />
        </Video>
      </div>
    </div>
  );
}

//exporting the component
export default VideoPage;
