/* 
  Title : UploadVideos 
  Description : Contains the UploadVideos Component
  Author : Aritra Pal
  Date :20/12/2022 
*/
//dependencies
import { useContext } from "react";
import MainContext from "../Context/Main";

//main function
const UploadVideos = () => {
  //getting fontcolor
  const {fcolor} = useContext(MainContext)
  //return jsx
  return <div style={{color:fcolor}}>UploadVideos</div>;
};

//exporting the component
export default UploadVideos;
