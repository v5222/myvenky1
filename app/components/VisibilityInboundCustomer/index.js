import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, message } from 'antd';
import axios from "axios";
import CsvDownload from 'react-json-to-csv'
import { values } from "lodash";

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


const VisibInboundCustomer = () => {
  const [value, setValue] = useState(1);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [btnDispCss, setBtnDispCss] = useState("none");
  const [dispSubmitBtn, setDispSubmitBtn] = useState("block");
  const [downArr, setDownArr] = useState([]);
  const [errMsg, setErrMsg] = useState(false)
  const [dispSaveBtn, setDispSaveBtn] = useState(false);
  const [invData, setInvData] = useState([]);
  const [warehouseData, setWareHouseData] = useState([]);

  useEffect(() => {
    if(invData.length == 0 || warehouseData.length == 0 ){
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

    let reqWhObj = {
      body: {
        type: "GETWH",
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

      axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        reqWhObj
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          handleapiwarehousedata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });  
  }

  function info(data){
    message.info("Saved Successfully");
  }  

  // useEffect(() => {
  //   console.log("DownladBtn")
  // }, [showDownloadBtn])

  // useEffect(() => {
  //   console.log("DownArr",downArr)
  // },[downArr])

  function handleapidata(apidata){
    setInvData(apidata);
  }

  function handleapiwarehousedata(apidata) {
    setWareHouseData(apidata);
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

  function handleSaveInvoice(savDatas){
    // console.log("handleSaveInvoice",savDatas)
    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: {
            type: "SAVE",
            documentno: savDatas.InvoiceNumber,
            warehousename: savDatas.wareHouse,
            transportername: savDatas.transporterName,
            shippingio: savDatas.shippingIoDetail,
            ewaybillno: savDatas.ewayBill,
            flag: "CUSTOMER",
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("Customer--Res",data)
        if (data.body.statuscode && data.body.statuscode == 200) {
          handleDownloadInvoice(savDatas.InvoiceNumber)
          info()
          // custInfo()
          // handleCustDownload();
          // setDispSaveBtn(true);
        }else{
          console.log("RES--ERR",data)
        }
      })
      .catch((err) => console.log(err));
  
  }

  function handleDownloadInvoice(invNo){
    // console.log("HandleDownloadInv",invNo)

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
            // setErrMsg(true)
            setBtnDispCss("none")
          } 
          else{
            let tempDownData = res.data.body.bodymsg
            // console.log("Found",res)
            setDispSaveBtn(true)
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
    handleSaveInvoice(values)
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
          <Form.Item
            name="InvoiceNumber"
            label="Invoice Number"
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
            name="wareHouse"
            label="Warehouse"
            rules={[{ required: true }]}
          >
            <Select
              defaultValue="Select"
              style={{ width: 200 }}
              onChange={onHandleChange}
              allowClear
            >
              {warehouseData.length > 0 &&
                warehouseData.map((val, index) => {
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
            label="Shipping IO Detail"
            name="shippingIoDetail"
            rules={[
              {
                required: true,
                message: "Please enter Shipping IO Detail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Transporter Name"
            name="transporterName"
            rules={[
              {
                required: true,
                message: "Please enter Transporter Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="EWay Bill"
            name="ewayBill"
            rules={[
              {
                required: true,
                message: "Please enter EWay Bill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            {dispSaveBtn === false ? 
              <Button type="primary" htmlType="submit" size="large">
                Save
              </Button> : ""}
          </Form.Item>

          {/* <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" size="large" style={{display:dispSubmitBtn}}>
                Submit
              </Button> 
          </Form.Item>          */}
  </Form>
  {errMsg == true ?<> <br /><h3 style={{color:"red", fontSize:"13px", marginLeft:"35%"}}>Invalid Invoice Number!</h3></> : "" }
  

  <div style={{marginLeft:"35%" ,display: btnDispCss}}>
    <CsvDownload data={downArr}/>
  </div>

</>
  );
};

export default VisibInboundCustomer;                                                                                                                                                                                                                                          