/* 
  Title : App file
  Description : Contains Routes,Components etc
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//dependencies
import Navbar from "./Components/Navbar";
import Navbar2 from "./Components/Navbar2";
import { MainProvider } from "./Context/Main";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDashboard from "./Components/MainDashboard";

//App function
function App() {
  return (
    <Router>
      <MainProvider>
        <Navbar2 />
        <Routes>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/" element={<MainDashboard/>}></Route>
        </Routes>
      </MainProvider>
    </Router>
  );
}
export default App;
