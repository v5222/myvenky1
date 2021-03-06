import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, message, Spin } from 'antd';
import axios from "axios";
import CsvDownload from 'react-json-to-csv'

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


const VisibInboundDownloadForm = () => {
  const [value, setValue] = useState(1);
  const [invData, setInvData] = useState([]);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [btnDispCss, setBtnDispCss] = useState("none");
  const [dispSubmitBtn, setDispSubmitBtn] = useState("block");
  const [downArr, setDownArr] = useState([]);
  const [errMsg, setErrMsg] = useState(false)
  const [spinner, setSpinner] = useState("none")

  useEffect(() => {
    if(invData.length == 0 ){
      handleDropDownVal()
    }
  },[])

  function uploadStatus(){
    message.error("Invalid Invoice Number..!")
  }

  function handleDropDownVal(){
    // setIniForm("Show")
    let reqObj = {
      body : {
        type : "GETINVOICE",
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
    setSpinner("block")
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
            uploadStatus()
            setSpinner("none")
            // setErrMsg(true)
            setBtnDispCss("none")
          } 
          else{
            setSpinner("none")
            let tempDownData = res.data.body.bodymsg
            // console.log("Found",res)
            setDownArr(tempDownData)
            setDispSubmitBtn("none")
            setBtnDispCss("block")
            // setErrMsg(false)
          }
         
        })
        .catch(err=> console.log(err));
  }

  const onFinish = (values) => {
    // console.log('Success:', values);
    handleDownloadInvoice(values.InvoiceNumber)
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
     <Form.Item name="InvoiceNumber" label="Invoice Number" rules={[{ required: true }]}>
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
          <Spin style={{display:spinner}}></Spin>
          <div style={{marginLeft:"35%" ,display: btnDispCss}}>
            <CsvDownload data={downArr}/>
          </div>
          <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" size="large" style={{display:dispSubmitBtn}}>
                Submit
              </Button> 
          </Form.Item>         
  </Form>
  {/* {errMsg == true ?<> <br /><h3 style={{color:"red", fontSize:"13px", marginLeft:"35%"}}>Invalid Invoice Number!</h3></> : "" } */}
  

 
</>
  );
};

export default VisibInboundDownloadForm;  
                                                                                                                                                                                                                                        