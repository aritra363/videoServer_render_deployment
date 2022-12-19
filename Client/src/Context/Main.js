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
  //return
  return (
    <MainContext.Provider value={{ current, setCurrent, theme, settheme }}>
      {children}
    </MainContext.Provider>
  );
};

//exporting the context
export default MainContext;
