import { useContext } from "react";
import MainContext from "../Context/Main";

function VideoModal({ uploadBy, title, thumb, uploadDate }) {
  //state for bgcolor and fontcolor
  const { fcolor, cardcolor } = useContext(MainContext);
  let formattedDate = "";
  if (uploadDate !== "") {
    const prev_date = new Date(uploadDate);
    const today_date = new Date();
    const diff_hour = Math.ceil(Math.abs(today_date - prev_date) / 36e5);
    if (diff_hour <= 24) {
      formattedDate = "Today";
    } else if (diff_hour > 24 && diff_hour <= 48) {
      formattedDate = "Yesterday";
    } else if (diff_hour > 48) {
      //count days
      const days = Math.ceil(diff_hour / 24);
      formattedDate = `${days} days ago`;
    } else {
      formattedDate = "unknown";
    }
  } else {
    formattedDate = "unknown";
  }
  return (
    <div className="col-md-3" style={{ marginTop: "30px" }}>
      <div className="card" style={{ width: "18rem", border: "none" }}>
        <img
          src={`http://127.0.0.1:4000/thumb/${thumb}`}
          className="card-img-top"
          alt="..."
        />
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

VideoModal.defaultProps = {
  uploadBy: "unknown",
  title: "Demo",
  thumb: "not-found.png",
  uploadDate: "",
};

export default VideoModal;
