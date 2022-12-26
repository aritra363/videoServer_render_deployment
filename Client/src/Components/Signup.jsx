/* 
  Title : Signup 
  Description : Contains the Signup Component
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
import { useContext, useState } from "react";
import MainContext from "../Context/Main";
import { Button, Form, Input, Col, Row, Divider } from "antd";
import "../ComponentStyle/Signup.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//main function
const Signup = () => {
  const navigate = useNavigate();
  const [signup] = Form.useForm();
  //getting fontcolor
  const { fcolor, btncolor, toastcolor, setCurrent, setuser, setisloggedin } =
    useContext(MainContext);
  //local state
  //state for password field
  const [password, setpassword] = useState("");

  //state for password field
  const [email, setemail] = useState("");

  //state for first Name field
  const [fName, setfName] = useState("");

  //state for Last Name field
  const [lName, setlName] = useState("");
  //return jsx
  const onFinish = async (values) => {
    //validation
    let fName_v =
      fName.trim().length >= 3 &&
      fName.trim().length < 20 &&
      fName.match("^[a-zA-Z]*$")
        ? true
        : false;
    let lName_v =
      lName.trim().length >= 3 &&
      lName.trim().length < 20 &&
      lName.match("^[a-zA-Z]*$")
        ? true
        : false;
    let email_v = email.match(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    )
      ? true
      : false;
    let password_v =
      password.trim().length > 8 && password.trim().length < 30 ? true : false;
    //check for validation
    if (fName_v && lName_v && email_v && password_v) {
      //validation successfull
      //send request to server
      const userData = JSON.stringify(values);
      try {
        const response = await toast.promise(
          fetch("http://127.0.0.1:4000/signup", {
            body: userData,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }),
          {
            pending: "Signing up Wait",
          }
        );
        const result = await response.json();
        //check if authorized or not
        if (response.status === 200) {
          //clear form fields
          signup.resetFields();
          //give Success reply
          toast.success(result.message);
          toast.success("Loggedin Successfully");
          //create user object
          const userObj = {
            FirstName: values.firstName,
            LastName: values.lastName,
            Email: values.email,
            _id: result.result._id,
          };
          //set user state
          setuser(userObj);
          //loginFunction
          setCurrent("home");
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
    } else {
      toast.error(
        `First Name & Last Name must be Alphabets & min 3 and Max 20 Characters/n
      Email must be a Valid Email
      Password must be of min 8 and max 30 Characters
      `,
        {
          autoClose: 10000,
          progress: undefined,
        }
      );
    }
  };
  const onFinishFailed = (errorInfo) => {
    //send a toast message
    toast.error("Please fill all field Carefully");
  };

  //on change handler for all input fields

  //fName
  const fNameChangeHandler = (event) => {
    setfName(event.target.value);
  };

  //lName
  const lNameChangeHandler = (event) => {
    setlName(event.target.value);
  };

  //phone
  const emailChangeHandler = (event) => {
    setemail(event.target.value);
  };

  //password
  const passwordChangeHandler = (event) => {
    setpassword(event.target.value);
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
        <h4>Register</h4>
      </Divider>
      <Row justify="center" align="middle">
        <Col span={8}>
          <Form
            form={signup}
            name="signup"
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
              label={<span style={{ color: fcolor }}>First Name</span>}
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name",
                },
              ]}
            >
              <Input
                style={{ color: "#177ddc" }}
                onChange={fNameChangeHandler}
                value={fName}
              />
            </Form.Item>
            <div
              className="Warnings"
              style={{
                display:
                  fName.length > 0 && fName.length < 3 ? "block" : "none",
              }}
            >
              Min 3 Charaters
            </div>
            <Form.Item
              label={<span style={{ color: fcolor }}>Last Name</span>}
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name",
                },
              ]}
            >
              <Input
                style={{ color: "#177ddc" }}
                onChange={lNameChangeHandler}
                value={lName}
              />
            </Form.Item>
            <div
              className="Warnings"
              style={{
                display:
                  lName.length > 0 && lName.length < 3 ? "block" : "none",
              }}
            >
              Min 3 Charaters
            </div>
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
              <Input
                style={{ color: "#177ddc" }}
                onChange={emailChangeHandler}
                value={email}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: fcolor }}>Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                style={{ color: "#177ddc" }}
                onChange={passwordChangeHandler}
                value={password}
              />
            </Form.Item>
            <div
              className="Warnings"
              style={{
                display:
                  password.length < 8 && password.length > 0 ? "block" : "none",
              }}
            >
              Must be greater than 8 Charaters
            </div>
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
export default Signup;
