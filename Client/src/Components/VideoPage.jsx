/* 
  Title : Video Page 
  Description : The Place where the videoplayer plays the video
  Author : Aritra Pal
  Date : 26/12/2022 
*/
//dependencies
import { useContext } from "react";
import MainContext from "../Context/Main";

//main function
function VideoPage() {
  const { fcolor, cardcolor, setCurrent, videoPoster, videoSrc } =
    useContext(MainContext);
  console.log(videoPoster, videoSrc);
  //return jsx
  return (
    <div className="container">
      <p>{`http://127.0.0.1:4000/videos/${videoSrc}`}</p>
      <p>{`http://127.0.0.1:4000/thumb/${videoPoster}`}</p>
    </div>
  );
}

//exporting the component
export default VideoPage;
