/* 
  Title : MainDashboard 
  Description : Contains the Main Dashboard Component
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//dependencies
import { useContext, useEffect, useState } from "react";
import MainContext from "../Context/Main";

//component dependencies
import VideoModal from "./VideoModal";
import "../ComponentStyle/Spinner.css";

//main function
const MainDashboard = () => {
  const { fcolor, current, bgcolor, spinnercolor } = useContext(MainContext);
  //local state for loading spinner
  const [spinner, setspinner] = useState(true);
  const [videoArray, setvideoArray] = useState(undefined);

  useEffect(() => {
    setspinner(true);
    setvideoArray(undefined);
    if (current === "home") {
      const getVideo = async () => {
        try {
          const response = await fetch(`/upload`, {
            method: "GET",
          });
          const result = await response.json();
          if (response.status === 200) {
            //map through the result
            if (result.result.length > 0) {
              const vidArr = result.result.map((item) => {
                return (
                  <VideoModal
                    thumb={item.thumb}
                    title={item.title}
                    key={item._id}
                    video={item.video}
                    uploadDate={item.createdAt}
                    uploadBy={item.userid.firstName}
                  />
                );
              });
              setvideoArray(vidArr);
            } else {
              setvideoArray(<p>No Videos To Show</p>);
            }
          } else {
            setvideoArray(<p>Some error Occured!</p>);
          }
          setspinner(false);
        } catch {
          setvideoArray(<p>Some error Occured!</p>);
          setspinner(false);
        }
      };
      getVideo();
    }
  }, [current]);
  //return jsx
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {spinner ? (
            <div className="lds-facebook">
              <div style={{ background: spinnercolor }}></div>
              <div style={{ backgroundColor: spinnercolor }}></div>
              <div style={{ backgroundColor: spinnercolor }}></div>
            </div>
          ) : (
            videoArray
          )}
        </div>
      </div>
    </>
  );
};

//exporting the component
export default MainDashboard;
