/* 
  Title : Signin 
  Description : Contains the Signin Component
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
import { useContext } from "react";
import MainContext from "../Context/Main";
import { useNavigate } from "react-router";
//main function
const Signin = () => {
  //getting fontcolor
  const { fcolor, btncolor } = useContext(MainContext);
  const navigate = useNavigate();
  const { setCurrent, setisloggedin } = useContext(MainContext);
  //loginFunction
  const loginHandler = () => {
    setCurrent("Home");
    setisloggedin("true");
    localStorage.setItem("token", "aritrapalisagoodboy");
    navigate("/");
  };
  //return jsx
  return (
    <button
      onClick={loginHandler}
      style={{ color: fcolor, backgroundColor: btncolor }}
    >
      Login
    </button>
  );
};

//exporting the component
export default Signin;
