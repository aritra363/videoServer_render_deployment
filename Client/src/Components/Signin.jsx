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
import { Button, Form, Input, Col, Row, Divider } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//main function
const Signin = () => {
  const [login] = Form.useForm();
  //getting fontcolor
  const { fcolor, btncolor, toastcolor, setuser } = useContext(MainContext);
  const navigate = useNavigate();
  const { setCurrent, setisloggedin } = useContext(MainContext);

  const onFinish = async (values) => {
    //send request to server
    const userData = JSON.stringify(values);
    try {
      const response = await fetch("http://127.0.0.1:4000/signin", {
        body: userData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const result = await response.json();
      //check if authorized or not
      if (response.status === 200) {
        //clear form fields
        login.resetFields();
        //give Success reply
        toast.success(result.message);
        //create user object
        const userObj = {
          FirstName: result.result.FirstName,
          LastName: result.result.LastName,
          Email: result.result.Email,
          _id: result.result._id,
        };
        //set user state
        setuser(userObj);
        //loginFunction
        setCurrent("Home");
        setisloggedin("true");
        //localStorage.setItem("token", "aritrapalisagoodboy");
        navigate("/");
      } else {
        //send an error toast message
        toast.error(result.message);
      }
    } catch (err) {
      //send an error toast message
      toast.error(err.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    //send a toast message
    toast.error("Email and password cannot be blank");
  };
  //return jsx
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
      <Divider orientation="middle" style={{ color: fcolor }}>
        <h4>Login</h4>
      </Divider>
      <Row justify="space-around" align="middle">
        <Col span={8}>
          <Form
            form={login}
            name="login"
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
            autoComplete="on"
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
