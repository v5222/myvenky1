import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Radio, Row, Col, message, Spin, Switch } from "antd";
import { apiurlsi } from "containers/VisibilityInbound/service";
import axios from "axios";
import { now, values } from "lodash";
import CsvDownload from "react-json-to-csv";
import VisibilityInboundDownload from "components/VisibilityInboundDownload/index.js";
import VisibilityInboundCustomer from "components/VisibilityInboundCustomer/index.js";
import VisibilityInboundRegional from "components/VisibilityInboundRegional/index.js";
import VisibilityOutbound from "components/VisibilityOutbound/index.js";
import history from "utils/history";

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
  const [qtyVal, setQtyVal] = useState(0);
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
  const [showScannVal, setShowScannVal] = useState(false);
  const [disableInp, setDisableInp] = useState(false)
  const [loading, setLoading] = useState(false) 
  const [switchState, setSwitchState] = useState(false)

  useEffect(() => {
    if (invData.length == 0 || warehouseData.length == 0) {
      handleDropDownVal();
      handleCustDropDownVal();
    }
  }, []);

  function info(data) {
    message.success("Saved Successfully");
  }

  function errInfo(data) {
    message.error("Failed To Save..!");
  }

  function downStatus(data){
    message.error(data);
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

  const onRadioBtnChange = (e) => {
    setValue(e.target.value)
    set
  }

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
    // console.log("Save", values);
    setDisableInp(true)
    setRegInvNo(values.regionalInvoiceNumber);
    if ( qtyVal == lpnArray.length) {
      setLoading(true)
      setLpnInput(false);
      setDispRegionalDownBtn(false);
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
            // console.log("Regional--Res", data);
            if (data.body.statuscode && data.body.statuscode == 200) {
              
              setDispProcessBtn(true);
              info();
              setLoading(false)
              setDispRegionalDownBtn(true);
            }
            else{
              errInfo()
            }
          })
          .catch((err) => {
              console.log(err)
              errInfo()
            });
    } else {
      // console.log("Array-------Update----------Area",lpnVal)
      let r = lpnArray.concat(lpnVal);
      setLpnArray(r);
      resetValues();
      // setScannedVal((scannedVal) => scannedVal + 1)
    }
  };

  useEffect(() => {
    console.log("lpnArr", lpnArray)
    if(lpnArray.length == qtyVal){
      setShowScannVal(false)
      // setDispProcessBtn(true)
    }
  },[lpnArray])

  function handleDownRegional() {
    setDispRegionalDownBtn(false);
    var regionalDownloadReqData = {
      body: {
        type: "DOWNLOAD",
        EMAIL: "muneeshkumar.a@tvslsl.com",
        invoiceno: regInvNo,
      },
    };

    axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        regionalDownloadReqData
      )
      .then((res) => {
        console.log("##Download-----Res",res.data)
        if(res.data.body.statuscode === 200){
          let tempDownData = res.data ? res.data.body.bodymsg : "no Data";
          setDumArr(tempDownData);
          setDispProcessBtn(true);
          setDispDownloadBtn(true);
        // console.log("TempData",tempDownData)
        }
        else{
          downStatus(res.data.body.bodymsg)
        }
        
      })
      .catch((err) => console.log(err));
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function handleQtyVal(event){
    // console.log("event",event)
    setQtyVal(event)
    setShowScannVal(true)
  }

  useEffect(() => {
    // console.log("qtyVal",qtyVal)
    if(qtyVal === ""){
      setShowScannVal(false)
    }
    else{
      console.log("else")
    }
  },[qtyVal])

  function handleSwitch(checkedVal){
    // console.log("Switch",checkedVal)
    setSwitchState(checkedVal)
  }

  useEffect(() => {
    // console.log("ssss",switchState)
  },[switchState])

  return (
    <>
<Switch checkedChildren="Outbound" unCheckedChildren="Inbound" style={{marginLeft:"85%"}} onClick={(checked)=> handleSwitch(checked)}/>
    {
      switchState === false ? 
      <>
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
          onChange={onRadioBtnChange}
          value={value}
          defaultValue={1}
          id="radioBtnVal"
        >
          <Radio value={1}><b>Regional</b></Radio>
          <Radio value={2}><b>Customer</b></Radio>
          <Radio value={3}><b>Download</b></Radio>
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
      
      {value == 1 || value == "" || value == undefined ? (
        <>
          {/* <VisibilityInboundRegional /> */}
          <Form.Item
            name="regionalWareHouse"
            label="Warehouse"
            rules={[{ required: true }]}
          >
            <Select
              defaultValue="Select"
              style={{ width: 300 }}
              onChange={onHandleChange}
              id="whId"
              disabled={disableInp}
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
            name="regionalInvoiceNumber"
            label="Invoice Number"
            rules={[{ required: true }]}
          >
            <Input disabled={disableInp} style={{ width: 300 }}/>
          </Form.Item>
          <Form.Item
            label="Shipping IO Detail"
            name="regionalShippingIoDetail"
            rules={[
              {
                required: true,
                message: "Please enter Shipping IO Detail!",
              },
            ]}
          >
            <Input disabled={disableInp} style={{ width: 300 }}/>
          </Form.Item>
          <Form.Item
            label="Transporter Name"
            name="regionalTransporterName"
            rules={[
              {
                required: true,
                message: "Please enter Transporter Name!",
              },
            ]}
          >
            <Input  disabled={disableInp} style={{ width: 300 }}/>
          </Form.Item>
          <Form.Item
            label="EWay Bill"
            name="regionalEwayBill"
            rules={[
              {
                required: true,
                message: "Please enter EWay Bill!",
              },
            ]}
          >
            <Input disabled={disableInp} style={{ width: 300 }}/>
          </Form.Item>
          <Form.Item
            label="Qty"
            name="regionalQty"
            rules={[
              {
                required: true,
                message: "Please enter Qty!",
              },
            ]}
          >
            <Input onChange={event => handleQtyVal(event.target.value)} style={{ width: 300 }} disabled={disableInp}/>
          </Form.Item>
          <>
          {showScannVal === true ? 
            <Form.Item>
            <Row style={{ marginLeft: "33%" }}>
              <Col span="6" />
              <Col span="6">
                <b>TOTAL : </b> {qtyVal}
              </Col>
              <Col>
                <b>SCANNED : </b> {lpnArray.length}{" "}
              </Col>
            </Row>
              <Row style={{ marginLeft: "33%" }}>
                <Col span="6" />
                {lpnInput === true ? (
                  <>
                    {" "}
                    <Col span="6">
                      <b>LPN : </b>
                    </Col>
                    <Col>
                      <Input
                        size="small"
                        value={lpnVal}
                        onChange={(event) => {
                          setLpnVal(event.target.value)
                        }}
                        style={{ width: 200 }}
                      />
                    </Col>{" "}
                  </>
                ) : (
                  ""
                )}
              </Row>
          </Form.Item>
        :""}
          </>
          {loading === true ? <Spin style={{marginLeft:"35%"}}></Spin> : ""}
          <Form.Item {...tailLayout}>
            {dispProcessBtn === false ? (
              <Button type="primary" htmlType="submit" size="large">
                Save
              </Button>
            ) : (
              ""
            )}
            {dispRegionalDownBtn === true ? (
              <Button
                type="primary"
                size="large"
                onClick={handleDownRegional()}
              >
                Submit
              </Button>
            ) : (
              ""
            )}
          </Form.Item>
        </>
      ) : (
        ""
      )}
      {value === 3 ? <VisibilityInboundDownload /> : ""}
    </Form>
    {dispDownloadBtn === true ?
    <div style={{marginLeft:"33%"}}>
    <CsvDownload data={dummyArr}/>     </div>
    : ""}

    </>
    : 
          <VisibilityOutbound />
    }
    </>

   
  );
};

export default VIFORM;
