/* 
  Title : Navbar 2 Component
  Description : Contains the Navbar
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
import {
  UsergroupAddOutlined,
  CloudUploadOutlined,
  LoginOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Menu, Switch, Col, Row } from "antd";
import { useContext, useEffect } from "react";
import MainContext from "../Context/Main";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//main function
const Navbar = () => {
  const navigate = useNavigate();
  const {
    current,
    setCurrent,
    theme,
    settheme,
    isloggedin,
    setisloggedin,
    setbgcolor,
    bgcolor,
    fcolor,
    setfcolor,
    btncolor,
    setbtncolor,
    settoastcolor,
    user,
    setuser,
    toastcolor,
    cardcolor,
    setcardcolor,
    setvideoPoster,
    setvideoSrc,
  } = useContext(MainContext);

  //Array of Options
  // Options to show to loggedout users
  const normal_items = [
    {
      label: (
        <Link to="/" style={{ textDecoration: "none" }}>
          VideoServer
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Signup
        </Link>
      ),
      key: "signup",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: (
        <Link to="/signin" style={{ textDecoration: "none" }}>
          Signin
        </Link>
      ),
      key: "signin",
      icon: <LoginOutlined />,
    },
  ];
  // Options to show to loggedin users
  const logged_items = [
    {
      label: (
        <Link to="/" style={{ textDecoration: "none" }}>
          VideoServer
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link to="/uploadvideos" style={{ textDecoration: "none" }}>
          UploadVideos
        </Link>
      ),
      key: "upload",
      icon: <CloudUploadOutlined />,
    },
    {
      label: (
        <a
          style={{ textDecoration: "none" }}
        >{`Hey ${user.FirstName},wanna Logout!`}</a>
      ),
      key: "logout",
      icon: <PoweroffOutlined />,
    },
  ];
  //setting the background
  document.body.style.backgroundColor = bgcolor;
  //decide which options to render
  const items = isloggedin ? logged_items : normal_items;
  //change the selected Link
  const onClick = (e) => {
    setCurrent(e.key);
    //operation for logout Link
    if (e.key === "logout") {
      //logout operation
      navigate("/");
      setCurrent("home");
      setisloggedin(false);
      //localStorage.removeItem("token");
      setuser({});
      setvideoPoster("");
      setvideoSrc("");
      toast.success("LoggedOut Succesfully!");
    }
  };
  //Toggling Dark and light mode
  const changeTheme = () => {
    //set dark theme
    settheme((prevtheme) => {
      return prevtheme === "dark" ? "light" : "dark";
    });
    //set bgcolor
    setbgcolor((prevcolor) => {
      return prevcolor === "#ebebeb" ? "#052f56" : "#ebebeb";
    });
    //set fontcolor
    setfcolor((prevcolor) => {
      return prevcolor === "#212529" ? "#EFFFFF" : "#212529";
    });
    //set button color
    setbtncolor((prevcolor) => {
      return prevcolor === "#FFFFFF" ? "#1677FF" : "#FFFFFF";
    });
    //set Toast color
    settoastcolor((prevcolor) => {
      return prevcolor === "light" ? "dark" : "light";
    });
    //set Card color
    setcardcolor((prevcolor) => {
      return prevcolor === "#FFFFFF" ? "#001529" : "#FFFFFF";
    });
  };
  //setting on mount/reload navigate to home
  useEffect(() => {
    if (localStorage.getItem("token") === "aritrapalisagoodboy") {
      setisloggedin(true);
      setCurrent("home");
      setvideoPoster("");
      setvideoSrc("");
    }
    navigate("/");
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={toastcolor}
      />
      <Row justify="end">
        <Col>
          <Switch
            checked={theme === "dark"}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Col>
      </Row>
      <Row>
        <Col flex={5}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            theme={theme}
          />
        </Col>
      </Row>
    </>
  );
};

//exporting
export default Navbar;
