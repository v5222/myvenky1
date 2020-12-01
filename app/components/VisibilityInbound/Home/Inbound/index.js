import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Radio, Row, Col, message } from "antd";
import { apiurlsi } from "containers/VisibilityInbound/service";
import axios from "axios";
import { now, values } from "lodash";
import CsvDownload from "react-json-to-csv";
import VisibilityInboundDownload from "components/VisibilityInboundDownload/index.js";
import VisibilityInboundCustomer from "components/VisibilityInboundCustomer/index.js";
import VisibilityInboundRegional from "components/VisibilityInboundRegional/index.js";
import VisibilityOutbound from "components/VisibilityOutbound/index.js";

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

let arrCpy = [];

const VIFORM = () => {
  const [value, setValue] = useState(1);
  const [invData, setInvData] = useState([]);
  const [custInvData, setCustInvData] = useState([]);
  const [warehouseData, setWareHouseData] = useState([]);
  const [custWarehouseData, setCustWareHouseData] = useState([]);
  const [dispDownBtn, setDispDownBtn] = useState(false);
  const [dispRegionalDownBtn, setDispRegionalDownBtn] = useState(false);
  const [dispProcessBtn, setDispProcessBtn] = useState(false);
  const [scanValue, setScanVal] = useState();
  const [iniForm, setIniForm] = useState();
  const [qtyVal, setQtyVal] = useState("");
  const [dispSaveBtn, setDispSaveBtn] = useState(false);
  const [dispDownloadBtn, setDispDownloadBtn] = useState(false);
  const [scannedVal, setScannedVal] = useState(0);
  const [lpnVal, setLpnVal] = useState("");
  const [lpnArray, setLpnArray] = useState([]);
  const [dummyArr, setDumArr] = useState([]);
  const [customerArr, setCustomerArr] = useState([]);
  const [custInvNo, setCustInvNo] = useState("");
  const [regInvNo, setRegInvNo] = useState("");
  const [lpnInput, setLpnInput] = useState(true);

  useEffect(() => {
    if (invData.length == 0 || warehouseData.length == 0) {
      handleDropDownVal();
      handleCustDropDownVal();
    }
  }, []);

  // info = (data) => {
  //   message.info(data);
  // };

  function info(data) {
    message.info("Saved Successfully");
  }

  function handleCustDropDownVal() {
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
          handleCustapidata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });
  }

  function handleDropDownVal() {
    // setIniForm("Show")
    let reqWhObj = {
      body: {
        type: "GETWH",
        email: "Muneeshkumar.a@tvslsl.com",
      },
    };

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

  function handleCustapidata(apidata) {
    setCustInvData(apidata);
  }

  function handleapiwarehousedata(apidata) {
    setWareHouseData(apidata);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onHandleChange = (e) => {
    // console.log("OnChange",e)
    setCustInvNo(e.target.value);
    setValue(e.target.value);
  };

  function resetValues() {
    // lpnVal = "";
    setLpnVal(" ");
  }

  const onFinish = (values) => {
    console.log("Save", values);

    setRegInvNo(values.regionalInvoiceNumber);
    if (lpnArray.length == qtyVal) {
      setLpnInput(false);
      setDispRegionalDownBtn(false);
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
                documentno: values.regionalInvoiceNumber,
                warehousename: values.regionalWareHouse,
                transportername: values.regionalTransporterName,
                shippingio: values.regionalShippingIoDetail,
                lpn: lpnArray,
                ewaybillno: values.regionalEwayBill,
                flag: "REGIONAL",
                qty: values.regionalQty ? values.regionalQty : "",
              },
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("Regional--Res", data);
            if (data.body.statuscode && data.body.statuscode == 200) {
              handleDownRegional();
              info();
              setDispProcessBtn(true);
              setDispRegionalDownBtn(true);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      // console.log("Array-------Update----------Area",lpnVal)
      let r = lpnArray.concat(lpnVal);
      setLpnArray(r);
      resetValues();
      // setScannedVal((scannedVal) => scannedVal + 1)
    }
  };

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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      autoComplete="off"
      {...layout}
      name="basic"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="radioGroup" label="Type">
        <Radio.Group
          onChange={onChange}
          value={value}
          defaultValue={1}
          id="radioBtnVal"
        >
          <Radio value={1}>Regional</Radio>
          <Radio value={2}>Customer</Radio>
          <Radio value={4}>OutBound</Radio>
          <Radio value={3}>Download</Radio>
        </Radio.Group>
        {/* Customer */}
      </Form.Item>
      {value == 2 ? (
        <>
          <VisibilityInboundCustomer />
        </>
      ) : (
        ""
      )}
      {value == 4 ? (
        <>
          <VisibilityOutbound />
        </>
      ) : (
        ""
      )}
      {value == 1 || value == "" || value == undefined ? (
        <>
          <VisibilityInboundRegional />
          {/* <Form.Item name="regionalWareHouse" label="Warehouse" rules={[{ required: true }]}>
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
           {dispProcessBtn === false ? 
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
       </Form.Item> */}
        </>
      ) : (
        ""
      )}
      {value === 3 ? <VisibilityInboundDownload /> : ""}
    </Form>
  );
};

export default VIFORM;
