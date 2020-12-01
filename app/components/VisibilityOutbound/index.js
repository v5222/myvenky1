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
  const [errMsg, setErrMsg] = useState(false);
  const [delType, setDelType] = useState();
  const [labelName, setLabelName] = useState("");

  useEffect(() => {
    if(invData.length == 0 ){
      handleDropDownVal()
    }
  },[])

  function handleDropDownVal(){
    // setIniForm("Show")
    let reqObj = {
      body : {
        type : "DDLSERVICE",
        email : "Muneeshkumar.a@tvslsl.com",
      }
    };
    let reqObj2 = {
      body : {
        type : "DDLDELIVERY",
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
          console.log("DDLSERVICE",res)
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
          console.log("DDLDELIVARY",res)
          handleapidata2(res.data.body.bodymsg);
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

  useEffect(() => {

  },[])

  function handleapidata(apidata){
    setInvData(apidata);
  }

  function handleapidata2(apidata){
    setInvData2(apidata);
  }

  function handleapidata3(apidata){
    if(delType == "ENDCUSTOMER"){
      setLabelName("Site Code")
    }
    else{
      setLabelName("Warehouse Code")
    }
    setInvData3(apidata);
  }

  const onChange = e => {
    setValue(e.target.value);
  };

  const onHandleDeliType = e => {
    console.log("DelType@!@!",e)
    handleThirdDropDown(e)
    setDelType(e.target.value)
    setValue(e.target.value);
  }

  function handleThirdDropDown(val){
    console.log(" in handleThirdDropDown", val)
    setDelType(val)
    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: {
            "type": "DDLDELIVERYCUST",
            "deliveryname": val
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
         console.log("3rd Drop Down Res",data)
        if (data.body.statuscode && data.body.statuscode == 200) {
          handleapidata3(data.body.bodymsg);
        }
      })
      .catch((err) => console.log(err));
  }

  const onHandleChange = e => {
      console.log("OnChange",e)

    setDispSubmitBtn("block")
    setBtnDispCss("none")
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
     
          <Form.Item name="serviceType" label="Service Type" rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 200 }}   onChange={onHandleChange}
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
              <Select defaultValue="Select" style={{ width: 200 }}   onChange={onHandleDeliType}
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
          <Form.Item name="InvoiceNumberThree" label={labelName} rules={[{ required: true }]}>
              <Select defaultValue="Select" style={{ width: 200 }}   onChange={onHandleChange}
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
         <Input/>
       </Form.Item>
       <Form.Item
         label="Shipping IO Detail"
         name="shippingIoDetail"
         rules={[
           {
             required: false,
             message: 'Please enter Shipping IO Detail!',
           },
         ]}
       >
         <Input/>
       </Form.Item>
       <Form.Item
         label="Transporter Name"
         name="transporterName"
         rules={[
           {
             required: false,
             message: 'Please enter TransporterName!',
           },
         ]}
       >
         <Input/>
       </Form.Item>
       <Form.Item
         label="Eway Bill"
         name="ewayBill"
         rules={[
           {
             required: false,
             message: 'Please enter Eway Bill!',
           },
         ]}
       >
         <Input/>
       </Form.Item>
       <Form.Item style={{marginLeft:"33%"}}>
            <Upload  >
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