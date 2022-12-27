/* 
  Title : Main Context File
  Description : Contains the main state 
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
import { createContext, useState } from "react";

//creating context
const MainContext = createContext();

//context provider
export const MainProvider = ({ children }) => {
  //making state
  //State for selected/active navbar option
  const [current, setCurrent] = useState("home");
  //State for navbar light or dark
  const [theme, settheme] = useState("light");
  //State for getting is user loggged in
  const [isloggedin, setisloggedin] = useState(false);
  //State for bgColor
  const [bgcolor, setbgcolor] = useState("#ebebeb");
  //State for fontcolor
  const [fcolor, setfcolor] = useState("#212529");
  //State for buttoncolor
  const [btncolor, setbtncolor] = useState("#FFFFFF");
  //state for toastcolor
  const [toastcolor, settoastcolor] = useState("light");
  //state for card background
  const [cardcolor, setcardcolor] = useState("#FFFFFF");
  //state for videoplayer poster
  const [videoPoster, setvideoPoster] = useState("");
  //state for videoplayer videolink
  const [videoSrc, setvideoSrc] = useState("");
  //state for user details
  const [user, setuser] = useState({});
  //return
  return (
    <MainContext.Provider
      value={{
        current,
        setCurrent,
        theme,
        settheme,
        isloggedin,
        setisloggedin,
        bgcolor,
        setbgcolor,
        fcolor,
        setfcolor,
        btncolor,
        setbtncolor,
        toastcolor,
        settoastcolor,
        user,
        setuser,
        cardcolor,
        setcardcolor,
        videoPoster,
        setvideoPoster,
        videoSrc,
        setvideoSrc,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

//exporting the context
export default MainContext;
