import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select } from 'antd';
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
  console.log("Mounted")
  const [value, setValue] = useState(1);
  const [invData, setInvData] = useState([]);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [btnDispCss, setBtnDispCss] = useState("none");
  const [downArr, setDownArr] = useState([]);

  useEffect(() => {
    if(invData.length == 0 ){
      handleDropDownVal()
    }
  })

  function handleDropDownVal(){
    // setIniForm("Show")
    let reqObj = {
      body : {
        type : "GETINVOICE",
        email : "Muneeshkumar.a@tvslsl.com",
        invoice : "GJ/KAD/DC2156"
      }
    };

    axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
        reqObj
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          handleapidata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });
  }

  useEffect(() => {
console.log("DownladBtn")
  }, [showDownloadBtn])

  function handleapidata(apidata){
    setInvData(apidata);
  }

  const onChange = e => {
    setValue(e.target.value);
  };

  const onHandleChange = e => {
      console.log("OnChange",e)
      handleDownloadInvoice(e)
    setValue(e.target.value);
  };

  function handleDownloadInvoice(invNo){
    console.log("InvNo",invNo)

    var downloadReqData = {
        "body": {
          "type": "DOWNLOAD",
          "EMAIL": "muneeshkumar.a@tvslsl.com",
          "invoiceno": invNo ? invNo :  "GJ/KAD/DC2156"
        }
      }
      
      axios
        .post(
          "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/visibilityinbound",
          downloadReqData
        )
        .then((res) => {
        //   console.log("##Download--Cust---Res",res.data)
          let tempDownData = res.data ? res.data.body.bodymsg : "no Data"
          setDownArr(tempDownData)
          setBtnDispCss("block")
        })
        .catch(err=> console.log(err));
  }

  const onFinish = (values) => {
    console.log('Success:', values);
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
  </Form>
  <div style={{marginLeft:"35%" ,display: btnDispCss}}>
      <CsvDownload  data={downArr}/>
  </div>

</>
  );
};

export default VisibInboundDownloadForm;