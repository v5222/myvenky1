import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, Upload, message } from "antd";
import axios from "axios";
import CsvDownload from "react-json-to-csv";
import { UploadOutlined } from "@ant-design/icons";
import $ from "jquery";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const VisibilityOutbound = () => {
  const [value, setValue] = useState(1);
  const [invData, setInvData] = useState([]);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [btnDispCss, setBtnDispCss] = useState("none");
  const [dispSubmitBtn, setDispSubmitBtn] = useState("block");
  const [downArr, setDownArr] = useState([]);
  const [errMsg, setErrMsg] = useState(false);
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    if (invData.length == 0) {
      handleDropDownVal();
    }
  }, []);

  function handleDropDownVal() {
    // setIniForm("Show")
    let reqObj = {
      body: {
        type: "GETINVOICECUST",
        email: "Muneeshkumar.a@tvslsl.com",
      },
    };

    axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        reqObj
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          // console.log("InvData",res)
          handleapidata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });
  }

  //   useEffect(() => {
  // console.log("DownladBtn")
  //   }, [showDownloadBtn])

  // useEffect(() => {
  //   console.log("DownArr",downArr)
  // },[downArr])

  function handleapidata(apidata) {
    setInvData(apidata);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onHandleChange = (e) => {
    setDispSubmitBtn("block");
    setBtnDispCss("none");
    // console.log("OnChange",e)
    // handleDownloadInvoice(e)
    setValue(e.target.value);
  };

  function handleDownloadInvoice(invNo) {
    // console.log("InvNo",invNo)

    var downloadReqData = {
      body: {
        type: "DOWNLOAD",
        EMAIL: "muneeshkumar.a@tvslsl.com",
        invoiceno: invNo,
      },
    };

    axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        downloadReqData
      )
      .then((res) => {
        // console.log("##Download--Cust---Res",res)
        let tempDownData = res.data.body.bodymsg;
        // console.log("DDDDDDDDDDD",res.data.body.bodymsg)
        if (res.data.body.statuscode == 201) {
          console.log("No Data Found");
          setErrMsg(true);
          setBtnDispCss("none");
        } else {
          let tempDownData = res.data.body.bodymsg;
          // console.log("Found",res)
          setDownArr(tempDownData);
          setDispSubmitBtn("none");
          setBtnDispCss("block");
          setErrMsg(false);
        }
      })
      .catch((err) => console.log(err));
  }
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file[]", fileName);

    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
      {
        method: "POST",
        body: JSON.stringify({
          body: {
            type: "FTP",
            email: "muneeshkumar.a",
            filename: fileName.name,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        $.ajax({
          type: "PUT",
          url: data.body.bodymsg.url,
          contentType: "application/vnd.ms-excel",
          processData: false,
          data: fileName,
          success: function(response) {
            console.log("success", response);
          },
          error: function() {
            alert("File NOT uploaded");
            console.log(arguments);
          },
        });
      })
      .catch((error) => console.log(error));
    // console.log(res1);
    return;
  };
  const onFinish = (values) => {
    // console.log('Success:', values);

    handleDownloadInvoice(values.InvoiceNumberOne);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const onFileChange = async (value) => {
  //   setFileName(value);

  //   // if (value.file.status === "error") {
  //   //   message.error("Something went wrong ,Please try again ");
  //   // }
  // };
  const files = {
    onRemove: (file) => {
      setFileName("");
    },
    beforeUpload: (file) => {
      setFileName(file);
      return false;
    },
    fileName,
  };
  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="InvoiceNumberOne"
          label="Invoice Number 1"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="Select"
            style={{ width: 200 }}
            onChange={onHandleChange}
            allowClear
          >
            {invData.length > 0 &&
              invData.map((val, index) => {
                return (
                  <>
                    <Option value={val.documentno} key={index}>
                      {val.documentno}
                    </Option>
                  </>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="InvoiceNumberTwo"
          label="Invoice Number 2"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="Select"
            style={{ width: 200 }}
            onChange={onHandleChange}
            allowClear
          >
            {invData.length > 0 &&
              invData.map((val, index) => {
                return (
                  <>
                    <Option value={val.documentno} key={index}>
                      {val.documentno}
                    </Option>
                  </>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="InvoiceNumberThree"
          label="Invoice Number 3"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="Select"
            style={{ width: 200 }}
            onChange={onHandleChange}
            allowClear
          >
            {invData.length > 0 &&
              invData.map((val, index) => {
                return (
                  <>
                    <Option value={val.documentno} key={index}>
                      {val.documentno}
                    </Option>
                  </>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Text Box"
          name="textBox"
          rules={[
            {
              required: true,
              message: "Please enter Value!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ marginLeft: "33%" }}>
          <Upload {...files}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ display: dispSubmitBtn }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={handleUpload}>upload</Button>
      {/* {errMsg == true ?<> <br /><h3 style={{color:"red", fontSize:"13px", marginLeft:"35%"}}>Invalid Invoice Number!</h3></> : "" } */}

      <div style={{ marginLeft: "35%", display: btnDispCss }}>
        <CsvDownload data={downArr} />
      </div>
    </>
  );
};

export default VisibilityOutbound;
