/* 
  Title : Signup 
  Description : Contains the Signup Component
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
import { useContext } from "react";
import MainContext from "../Context/Main";

//main function
const Signup = () => {
  //getting fontcolor
  const { fcolor } = useContext(MainContext);
  //return jsx
  return <div style={{color:fcolor}}>Signup</div>;
};

//exporting the component
export default Signup;
