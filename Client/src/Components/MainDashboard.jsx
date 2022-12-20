/* 
  Title : MainDashboard 
  Description : Contains the MainDashboard Component
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
import { useContext } from "react";
import MainContext from "../Context/Main";

//main function
const MainDashboard = () => {
  //getting fontcolor
  const { fcolor } = useContext(MainContext);
  //return jsx
  return <div style={{color:fcolor}}>MainDashboard</div>;
};

//exporting the component
export default MainDashboard;
