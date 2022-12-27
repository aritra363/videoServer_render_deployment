/* 
  Title : UploadVideos 
  Description : Contains the UploadVideos Component
  Author : Aritra Pal
  Date :20/12/2022 
*/
//dependencies
import { useContext, useState } from "react";
import MainContext from "../Context/Main";
import { useNavigate } from "react-router";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Row, Divider, Col, Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//main function
const UploadVideos = () => {
  const navigate = useNavigate();
  const [upload] = Form.useForm();
  //getting fontcolor
  const {
    fcolor,
    btncolor,
    toastcolor,
    user,
    setCurrent,
    setisloggedin,
    setvideoPoster,
    setvideoSrc,
  } = useContext(MainContext);
  /* setvideoPoster("");
  setvideoSrc(""); */
  const beforeUpload = (file) => {
    const ismp4 = file.type === "video/mp4";
    const size = file.size <= 1000000000;
    if (!ismp4 && !size) {
      message.error(`Video must be .mp4 type and less that 1GB`);
    }
    return (ismp4 && size) || Upload.LIST_IGNORE;
  };
  const getFile = (info) => {
    return info.fileList;
  };
  const onFinish = async (values) => {
    //Validation
    const { title, video } = values;
    const title_v =
      title.trim().length > 8 &&
      title.trim().match("^[a-zA-Z0-9()\\s-]+$") &&
      title.trim().length < 50
        ? true
        : false;
    const video_v = video.length > 0 ? true : false;
    if (title_v && video_v) {
      //send request
      const formData = new FormData();
      formData.append("video", video[0].originFileObj);
      formData.append("title", title);
      formData.append("_id", user._id);
      try {
        const response = await toast.promise(
          fetch(`${process.env.REACT_APP_BACKEND_URL}upload`, {
            body: formData,
            method: "POST",
          }),
          {
            pending: "Uploading Wait!",
          }
        );
        const result = await response.json();
        //check if authorized or not
        if (response.status === 200) {
          //clear form fields
          upload.resetFields();
          //give Success reply
          toast.success(result.message);
          //loginFunction
          setCurrent("home");
          navigate("/");
        } else {
          //send an error toast message
          toast.error("Sorry Video is not Uploaded, Internal Server Error 500");
        }
      } catch (err) {
        //send an error toast message
        toast.error(err.message);
      }
    } else {
      toast.error(
        "Title must be > 8 <50 and can contain only Alphabets numbers and () - ,Video Must be uploaded",
        { autoClose: 10000 }
      );
    }
  };
  const onFinishFailed = (errorInfo) => {
    //send a toast message
    toast.error("Error");
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
        <h4>Upload Video</h4>
      </Divider>
      <Row justify="center" align="middle">
        <Col span={8}>
          <Form
            form={upload}
            name="upload"
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
              label={<span style={{ color: fcolor }}>Title</span>}
              name="title"
            >
              <Input style={{ color: "#177ddc" }} />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: fcolor }}>Upload</span>}
              name="video"
              valuePropName="fileList"
              getValueFromEvent={getFile}
            >
              <Upload beforeUpload={beforeUpload} maxCount={1} multiple={false}>
                <Button
                  icon={<UploadOutlined />}
                  style={{ color: fcolor, backgroundColor: btncolor }}
                >
                  Upload Video
                </Button>
              </Upload>
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
export default UploadVideos;
