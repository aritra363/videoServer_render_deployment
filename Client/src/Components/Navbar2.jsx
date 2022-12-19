/* 
  Title : Navbar 2 Component
  Description : Contains the Navbar
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
import { UsergroupAddOutlined } from "@ant-design/icons";
import { Menu, Switch, Col, Row } from "antd";
import { useContext, useEffect } from "react";
import MainContext from "../Context/Main";
import { Link, useNavigate } from "react-router-dom";

//Array of Options
const items = [
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
    icon: <UsergroupAddOutlined />,
  },
];
//main function
const Navbar2 = () => {
  const navigate = useNavigate();
  const { current, setCurrent, theme, settheme } = useContext(MainContext);
  //change the selected Link
  const onClick = (e) => {
    setCurrent(e.key);
  };
  //Toggling Dark and light mode
  const changeTheme = () => {
    settheme((prevtheme) => {
      return prevtheme === "dark" ? "light" : "dark";
    });
  };
  //setting on mount/reload navigate to home
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <>
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
export default Navbar2;
