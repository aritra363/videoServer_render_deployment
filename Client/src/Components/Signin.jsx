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
import { Button, Checkbox, Form, Input, Col, Row, Divider } from "antd";

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
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //return jsx
  return (
    <>
      <Divider orientation="middle" style={{ color: fcolor }}>
        Login
      </Divider>
      <Row justify="space-around" align="middle">
        <Col span={10}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
            style={{ color: fcolor }}
          >
            <Form.Item
              label={<span style={{ color: fcolor }}>Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input style={{ color: "#177ddc" }} />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: fcolor }}>Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password style={{ color: "#177ddc" }} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                htmlType="submit"
                style={{ color: fcolor, backgroundColor: btncolor }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

//exporting the component
export default Signin;
