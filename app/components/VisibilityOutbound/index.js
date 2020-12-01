import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, Upload } from 'antd';
import axios from "axios";
import CsvDownload from 'react-json-to-csv';
import { UploadOutlined } from '@ant-design/icons';

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
  const [errMsg, setErrMsg] = useState(false)

  useEffect(() => {
    if(invData.length == 0 ){
      handleDropDownVal()
    }
  },[])

  function handleDropDownVal(){
    // setIniForm("Show")
    let reqObj = {
      body : {
        type : "GETINVOICECUST",
        email : "Muneeshkumar.a@tvslsl.com",
      }
    };
    let reqObj2 = {
      body : {
        type : "GETINVOICECUST",
        email : "Muneeshkumar.a@tvslsl.com",
      }
    };
    let reqObj3 = {
      body : {
        type : "GETINVOICECUST",
        email : "Muneeshkumar.a@tvslsl.com",
      }
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

      axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        reqObj
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          // console.log("InvData",res)
          handleapidata2(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });

      axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        reqObj
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          // console.log("InvData",res)
          handleapidata3(res.data.body.bodymsg);
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

  function handleapidata(apidata){
    setInvData(apidata);
  }

  function handleapidata2(apidata){
    setInvData2(apidata);
  }

  function handleapidata3(apidata){
    setInvData3(apidata);
  }

  const onChange = e => {
    setValue(e.target.value);
  };

  

  const onHandleChange = e => {
    setDispSubmitBtn("block")
    setBtnDispCss("none")
      // console.log("OnChange",e)
      // handleDownloadInvoice(e)
      setValue(e.target.value);
  };

  function handleDownloadInvoice(invNo){
    // console.log("InvNo",invNo)

    var downloadReqData = {
        "body": {
          "type": "DOWNLOAD",
          "EMAIL": "muneeshkumar.a@tvslsl.com",
          "invoiceno": invNo 
        }
      }
      
      axios
        .post(
          "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
          downloadReqData
        )
        .then((res) => {
          // console.log("##Download--Cust---Res",res)
          let tempDownData = res.data.body.bodymsg;
          // console.log("DDDDDDDDDDD",res.data.body.bodymsg)
          if(res.data.body.statuscode == 201)
          {
            console.log("No Data Found")
            setErrMsg(true)
            setBtnDispCss("none")
          } 
          else{
            let tempDownData = res.data.body.bodymsg
            // console.log("Found",res)
            setDownArr(tempDownData)
            setDispSubmitBtn("none")
            setBtnDispCss("block")
            setErrMsg(false)
          }
         
        })
        .catch(err=> console.log(err));
  }

  function onFileChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const onFinish = (values) => {
    // console.log('Success:', values);
    handleDownloadInvoice(values.InvoiceNumberOne)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
     
          <Form.Item name="InvoiceNumberOne" label="Invoice Number 1" rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 200 }}   onChange={onHandleChange}
                    allowClear>
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
          <Form.Item name="InvoiceNumberTwo" label="Invoice Number 2" rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 200 }}   onChange={onHandleChange}
                    allowClear>
                {invData2.length > 0 &&
                    invData2.map((val, index) => {
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
          <Form.Item name="InvoiceNumberThree" label="Invoice Number 3" rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 200 }}   onChange={onHandleChange}
                    allowClear>
                {invData3.length > 0 &&
                    invData3.map((val, index) => {
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
             message: 'Please enter Value!',
           },
         ]}
       >
         <Input/>
       </Form.Item>
       <Form.Item style={{marginLeft:"33%"}}>
            <Upload  onChange={onFileChange}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" size="large" style={{display:dispSubmitBtn}}>
                Submit
              </Button> 
          </Form.Item>         
  </Form>
  {/* {errMsg == true ?<> <br /><h3 style={{color:"red", fontSize:"13px", marginLeft:"35%"}}>Invalid Invoice Number!</h3></> : "" } */}
  

  <div style={{marginLeft:"35%" ,display: btnDispCss}}>
    <CsvDownload data={downArr}/>
  </div>

</>
  );
};

export default VisibilityOutbound;                                                                                                                                                                                                                                          