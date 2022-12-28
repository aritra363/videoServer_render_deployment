/* 
  Title : App file
  Description : Contains Routes,Components etc
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//dependencies
import Navbar from "./Components/Navbar";
import MainContext, { MainProvider } from "./Context/Main";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDashboard from "./Components/MainDashboard";
import UploadVideos from "./Components/UploadVideos";
import LoginPrivateRoute from "./PrivateRoutes/loginPrivateRoute";
import VideoPage from "./Components/VideoPage";

//App function
function App() {

  return (
    <Router>
      <MainProvider>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/signup"
            element={
              <LoginPrivateRoute>
                <Signup />
              </LoginPrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/signin"
            element={
              <LoginPrivateRoute>
                <Signin />
              </LoginPrivateRoute>
            }
          ></Route>
          <Route exact path="/" element={<MainDashboard />}></Route>
          <Route exact path="/uploadvideos" element={<UploadVideos />}></Route>
          <Route exact path="/:videoPageLink" element={<VideoPage />}></Route>
        </Routes>
      </MainProvider>
    </Router>
  );
}
export default App;
