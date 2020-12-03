import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, Upload, message, Progress, Spin  } from "antd";
import axios from "axios";
import CsvDownload from "react-json-to-csv";
import { UploadOutlined } from "@ant-design/icons";
import $ from "jquery";
import { da } from "date-fns/locale";
import swal from 'sweetalert';

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
  const [invData2, setInvData2] = useState([]);
  const [invData3, setInvData3] = useState([]);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [btnDispCss, setBtnDispCss] = useState("none");
  const [dispSubmitBtn, setDispSubmitBtn] = useState("block");
  const [downArr, setDownArr] = useState([]);
  const [errMsg, setErrMsg] = useState(false);
  const [fileName, setFileName] = useState("");
  const [delType, setDelType] = useState();
  const [labelName, setLabelName] = useState("Code");
  const [dispCss3rdDropDown, setDispCss3rdDropDown] = useState("none")
  const [downArray, setDownArray] = useState([]);
  const [showUploadBtn, setShowUploadBtn] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("");
  const [spinner, setSpinner] = useState("none");
  const [downloadStatus, setDownloadStatus] = useState("");

  useEffect(() => {
    if (invData.length == 0) {
      handleDropDownVal();
    }
  }, []);

  function handleDropDownVal() {
    // setIniForm("Show")
    let reqObj = {
      body: {
        type: "DDLSERVICE",
        email: "Muneeshkumar.a@tvslsl.com",
      },
    };
    let reqObj2 = {
      body: {
        type: "DDLDELIVERY",
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
          // console.log("DDLSERVICE", res);
          handleapidata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });

    axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        reqObj2
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          // console.log("DDLDELIVARY", res);
          handleapidata2(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });
  }

  function handleapidata(apidata){
    setInvData(apidata);
  }

  function handleapidata2(apidata) {
    setInvData2(apidata);
  }

  function handleapidata3(apidata){
    if(delType == "ENDCUSTOMER"){
      setDispCss3rdDropDown("block")
      setLabelName("Site Code")
    }
    else{
      setDispCss3rdDropDown("block")
      setLabelName("Warehouse Code")
    }
    setInvData3(apidata);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onHandleDeliType = (e) => {
    // console.log("DelType@!@!", e);
    handleThirdDropDown(e);
    setDelType(e.target.value);
    setValue(e.target.value);
  };

  function handleThirdDropDown(val) {
    // console.log(" in handleThirdDropDown", val);
    setDelType(val);
    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: {
            type: "DDLDELIVERYCUST",
            deliveryname: val,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("3rd Drop Down Res", data);
        if (data.body.statuscode && data.body.statuscode == 200) {
          handleapidata3(data.body.bodymsg);
        }
      })
      .catch((err) => console.log(err));
  }

  const onHandleChange = (e) => {
    // console.log("OnChange", e);

    setDispSubmitBtn("block");
    setBtnDispCss("none");
    // handleDownloadInvoice(e)
    setValue(e.target.value);
  };  

  function DownStat(){
    message.warning("No Data To Download..!")
  }

  function uploadSuccNotif(){
    message.success("File Uploaded Succesfully..!")
  }

  const handleUpload = async (values) => {
    console.log("upload", fileName)
    setShowUploadBtn(false)
    setSpinner("block")
    setUploadStatus("Uploading...")
    const formData = new FormData();
    formData.append("file[]", fileName);

    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
      {
        method: "POST",
        body: JSON.stringify({
          body: {
            type: "OUTFTP",
            email: "muneeshkumar.a",
            filename: fileName.name,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("dataUpload", data)
        $.ajax({
          type: "PUT",
          url: data.body.bodymsg.url,
          contentType: "application/vnd.ms-excel",
          processData: false,
          data: fileName,
          success: function(response) {
            console.log("FileUpl",response)
            setSpinner("none")
            uploadSuccNotif()
            console.log("success--Two", response);
             var submitDatas = {
              "body": {
                "type": "OUTDATABASE",
                "EMAIL": "muneeshkumar.a@tvslsl.com",
                "output": [
                  {
                    "deliveryname": values.deliveryType,
                    "servicename": values.serviceType,
                    "deliverycode": values.deliveryCode,
                    "shippingiodetail": values.shippingIoDetail ? values.shippingIoDetail : "",
                    "transportername": values.transporterName ? values.transporterName : "",
                    "ewaybillno": values.ewayBill ? values.ewayBill : "",
                    "destinationcode": values.destinationCode
                  }
                ]
              }
            }

            axios
              .post(
                "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
                submitDatas
              )
              .then((resp) => {
                console.log("SAV--Res",resp)
                if (resp.status == 200) {
                  if( resp.data.body.bodymsg.length == 0 ) {
                    setDispSubmitBtn("none")
                    console.log("length",resp.data.body.bodymsg.length)
                    // setDownloadStatus("No Data To Download!")
                    // swal("No Data To Download!");
                    // DownStat()
                  }
                  else{
                    setDispSubmitBtn("none")
                    console.log("length",resp.data.body.bodymsg.length)
                    setDownArray(resp.data.body.bodymsg)
                    setDispSubmitBtn("none")
                    setBtnDispCss("block")
                  }
                   
                  // handleapidata(res.data.body.bodymsg);
                } else {
                  console.log("Err");
                }
              })
              .catch((err) => console.log("ERR",err));
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
    console.log("OnFinish")
    handleUpload(values);
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
     
          <Form.Item name="serviceType" label="Service Type" rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 300 }}   onChange={onHandleChange}
                    allowClear>
                {invData.length > 0 &&
                    invData.map((val, index) => {
                      return (
                        <>
                          <Option value={val.name} key={index}>
                            {val.name}
                          </Option>
                        </>
                      );
                    })}
              </Select>
          </Form.Item>
          <Form.Item name="deliveryType" label="Delivery Type" rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 300 }}   onChange={onHandleDeliType}
                    allowClear>
                {invData2.length > 0 &&
                    invData2.map((val, index) => {
                      return (
                        <>
                          <Option value={val.name} key={index}>
                            {val.name}
                          </Option>
                        </>
                      );
                    })}
              </Select>
          </Form.Item>
          <Form.Item name="deliveryCode" label={labelName} rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 300, }}   onChange={onHandleChange}
                    allowClear>
                {invData3.length > 0 &&
                    invData3.map((val, index) => {
                      return (
                        <>
                          <Option value={val.name} key={index}>
                            {val.name}
                          </Option>
                        </>
                      );
                    })}
              </Select>
          </Form.Item>
          
          <Form.Item
         label="Destination Code"
         name="destinationCode"
         rules={[
           {
             required: true,
             message: 'Please enter Destination Code!',
           },
         ]}
       >
         <Input style={{ width: 300 }}/>
       </Form.Item>
       <Form.Item
         label="Shipping IO Detail"
         name="shippingIoDetail"
         rules={[
           {
             message: 'Please enter Shipping IO Detail!',
           },
         ]}
       >
         <Input style={{ width: 300 }}/>
       </Form.Item>
       <Form.Item
         label="Transporter Name"
         name="transporterName"
         rules={[
           {
             message: 'Please enter TransporterName!',
           },
         ]}
       >
         <Input style={{ width: 300 }}/>
       </Form.Item>
       <Form.Item
         label="Eway Bill"
         name="ewayBill"
         rules={[
           {
             message: 'Please enter Eway Bill!',
           },
         ]}
       >
         <Input style={{ width: 300 }}/>
       </Form.Item>
         { showUploadBtn === true ? 
       <Form.Item  label="Upload File " rules={[{ required:true, message: "Please Select File..!"}]}>
        
        <Upload {...files} multiple={false} listType="picture-card" className="avatar-uploader">+
        </Upload> 
        </Form.Item>
        : "" 
        }
          <Spin size="default" style={{display:spinner}}></Spin>
            <br/>
          <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" size="large" style={{display:dispSubmitBtn}}>
                Submit
              </Button> 
          </Form.Item>         
  </Form>
  <div style={{ marginLeft: "35%", display: btnDispCss}}>
        <CsvDownload data={downArray} />
  </div>
    </>
  );
};

export default VisibilityOutbound;


