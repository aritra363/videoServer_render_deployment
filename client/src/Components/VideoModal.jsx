/* 
  Title : Video Modal 
  Description : Generate Video Component based on the props passed
  Author : Aritra Pal
  Date : 24/12/2022 
*/
//dependencies
import { useContext } from "react";
import MainContext from "../Context/Main";
import "../ComponentStyle/VideoModal.css";
import uuid from "react-uuid";
import { useNavigate } from "react-router";

//main function
function VideoModal({ uploadBy, title, thumb, uploadDate, video }) {
  const navigate = useNavigate();
  //state for bgcolor and fontcolor
  const { fcolor, cardcolor, setCurrent, setvideoPoster, setvideoSrc } =
    useContext(MainContext);
  let formattedDate = "";
  if (uploadDate !== "") {
    const prev_date = new Date(uploadDate);
    const today_date = new Date();
    const diff_day = Math.floor(
      Math.round(today_date - prev_date) / (1000 * 60 * 60 * 24)
    );
    if (diff_day === 0) {
      formattedDate = "Today";
    } else if (diff_day >= 0 && diff_day <= 1) {
      formattedDate = "Yesterday";
    } else if (diff_day > 1 && diff_day <= 29) {
      formattedDate = `${diff_day} days ago`;
    } else if (diff_day > 29 && diff_day <= 365) {
      //count months
      const diff_month =
        (today_date.getFullYear() - prev_date.getFullYear()) * 12 +
        (today_date.getMonth() - prev_date.getMonth());
      formattedDate = `${diff_month} Month ago`;
    } else if (diff_day >= 366 && diff_day > 365) {
      //count years
      const years = Math.floor(diff_day / 366);
      formattedDate = `${years} year ago`;
    } else {
      formattedDate = "unknown";
    }
  } else {
    formattedDate = "unknown";
  }
  //videopagehandler function
  const videopageHandler = (getTitle, video, thumb) => {
    const videoLink = getTitle.split(" ").join("-") + "-" + uuid();
    navigate(`/${videoLink}`);
    //setCurrent("videoPage");
    setvideoPoster(thumb);
    setvideoSrc(video);
  };
  //return jsx
  return (
    <div
      className="col-md-3"
      style={{ marginTop: "30px" }}
      onClick={() => videopageHandler(title, video, thumb)}
    >
      <div className="card" style={{ width: "18rem", border: "none" }}>
        <img src={`/thumb/${thumb}`} className="card-img-top" alt="..." />
        <div
          className="card-body"
          style={{ color: fcolor, backgroundColor: cardcolor }}
        >
          <h6>{title}</h6>
          <p style={{ marginBottom: "0", textAlign: "left" }}>By {uploadBy}</p>
          <p style={{ marginBottom: "0", textAlign: "right" }}>
            Uploaded {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
}

//default props value
VideoModal.defaultProps = {
  uploadBy: "unknown",
  title: "Demo",
  thumb: "not-found.png",
  uploadDate: "",
};

//exporting the component
export default VideoModal;
