import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, message, Row, Col } from 'antd';
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


const VisibInboundRegional = () => {
  const [value, setValue] = useState(1);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [btnDispCss, setBtnDispCss] = useState("none");
  const [dispSubmitBtn, setDispSubmitBtn] = useState("block");
  const [downArr, setDownArr] = useState([]);
  const [errMsg, setErrMsg] = useState(false)
  const [dispRegionalDownBtn, setDispRegionalDownBtn] = useState(false);
  const [dispSaveBtn, setDispSaveBtn] = useState(false);
  const [lpnArray, setLpnArray] = useState([]);
  const [invData, setInvData] = useState([]);
  const [warehouseData, setWareHouseData] = useState([]);
  const [qtyVal, setQtyVal] = useState("");
  const [lpnVal, setLpnVal] = useState("");
  const [lpnInput, setLpnInput] = useState(true);
  const [regInvNo, setRegInvNo] = useState(""); 
  const [dispProcessBtn, setDispProcessBtn] = useState(true);

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
        // console.log("WH",res)
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
      setLpnVal(" ")
    // console.log("Save",values, "sAVdATAS", savDatas)

    setRegInvNo(values.regionalInvoiceNumber);
    if (lpnArray.length == qtyVal) {
      setLpnInput(false);
      setDispProcessBtn(false);
      setDispRegionalDownBtn(true);
      if (values.radioGroup == undefined || values.radioGroup == 1) {
        setRegInvNo(values.regionalInvoiceNumber);
        fetch(
          "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              body: {
                type: "SAVE",
                documentno: savDatas.regionalInvoiceNumber,
                warehousename: savDatas.regionalWareHouse,
                transportername: savDatas.regionalTransporterName,
                shippingio: savDatas.regionalShippingIoDetail,
                lpn: lpnArray,
                ewaybillno: savDatas.regionalEwayBill,
                flag: "REGIONAL",
                qty: savDatas.regionalQty ? savDatas.regionalQty : "",
              },
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            //  console.log("Regional--Res",data)
            if (data.body.statuscode && data.body.statuscode == 200) {
              setLpnVal(" ")
              handleDownRegional()
              info()
              setDispProcessBtn(true);
              setDispRegionalDownBtn(true);
            }
          })
          .catch((err) => console.log(err));
      } 
    } else {
      setLpnVal(" ")
      // console.log("Array-------Update----------Area",lpnVal)
      let r = lpnArray.concat(lpnVal);
      setLpnArray(r);
      // setScannedVal((scannedVal) => scannedVal + 1)
    }

  }

  function handleDownRegional() {
    setDispRegionalDownBtn(false);
    var regionalDownloadReqData = {
      body: {
        type: "DOWNLOAD",
        EMAIL: "muneeshkumar.a@tvslsl.com",
        invoiceno: regInvNo ? regInvNo : "GJ/KAD/DC2156",
      },
    };

    axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        regionalDownloadReqData
      )
      .then((res) => {
        // console.log("##Download-----Res",res.data)
        let tempDownData = res.data ? res.data.body.bodymsg : "no Data";
        setDispProcessBtn(true);
        setDispDownloadBtn(true);
        // console.log("TempData",tempDownData)
        setDumArr(tempDownData);
      })
      .catch((err) => console.log(err));
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
          <Form.Item name="regionalWareHouse" label="Warehouse" rules={[{ required: true }]}>
           <Select defaultValue="Select" style={{ width: 200 }}   onChange={onHandleChange}
                 allowClear>
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
       <Form.Item name="regionalInvoiceNumber" label="Invoice Number" rules={[{ required: true }]}>
         <Input/>
       </Form.Item>
       <Form.Item
         label="Shipping IO Detail"
         name="regionalShippingIoDetail"
         rules={[
           {
             required: true,
             message: 'Please enter Shipping IO Detail!',
           },
         ]}
       >
         <Input/>
       </Form.Item>
       <Form.Item
         label="Transporter Name"
         name="regionalTransporterName"
         rules={[
           {
             required: true,
             message: 'Please enter Transporter Name!',
           },
         ]}
       >
         <Input/>
       </Form.Item>
       <Form.Item
         label="EWay Bill"
         name="regionalEwayBill"
         rules={[
           {
             required: true,
             message: 'Please enter EWay Bill!',
           },
         ]}
       >
         <Input/>
       </Form.Item>
       <Form.Item
         label="Qty"
         name="regionalQty"
         rules={[
           {
             required: true,
             message: 'Please enter Qty!',
           },
         ]}
       >
         <Input onChange={event => setQtyVal(event.target.value)}/>
       </Form.Item>
       <Form.Item>
         <Row style={{marginLeft:"30%"}}>
            <Col span="6"></Col>
            <Col span="6"><b>TOTAL : </b> {qtyVal}</Col>
            <Col ><b>SCANNED : </b> {lpnArray.length} </Col>
         </Row>
         <Row style={{marginLeft:"30%"}}>
         <Col span="6"></Col>
         {lpnInput === true ? <> <Col span="6"><b>LPN : </b></Col>
            <Col><Input size="small" style={{width:200}} value={lpnVal}
              onChange={event => {
                setLpnVal(event.target.value)
              }}/></Col> </>: ""}
         </Row> 
       </Form.Item>
       <Form.Item {...tailLayout}>
           {dispProcessBtn === true ? 
           <Button type="primary" htmlType="submit" size="large">
             Save
           </Button> : ""
         }
           {dispRegionalDownBtn === true ? 
           <Button type="primary" size="large" onClick={handleDownRegional()}>
             Submit
           </Button>
           : ""
         }
       </Form.Item>

      
  </Form>
  <div style={{marginLeft:"35%" ,display: btnDispCss}}>
    <CsvDownload data={downArr}/>
  </div>

</>
  );
};

export default VisibInboundRegional;                                                                                                                                                                                                                                          