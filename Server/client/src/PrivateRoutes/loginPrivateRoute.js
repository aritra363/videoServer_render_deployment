/* 
  Title : Login Private Route 
  Description : wraps the signin,signup page if user logged in then navigates to home "/"  
  Author : Aritra Pal
  Date : 20/12/2022 
*/

//dependencies
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainContext from "../Context/Main";

//main function
function LoginPrivateRoute({ children }) {
  const { isloggedin, setCurrent } = useContext(MainContext);
  if (!isloggedin) {
    // authorized so return child components
    return children;
  }
  setCurrent("home");
  // not logged in so redirect to login page with the return url
  return <Navigate to="/" />;
}

//exporting the privateroute
export default LoginPrivateRoute;
