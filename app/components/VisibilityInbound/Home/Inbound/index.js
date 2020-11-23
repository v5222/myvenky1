import React, { useState, useEffect } from "react";
import { Form, Input, Button,Select,Radio } from 'antd';
import {apiurlsi} from 'containers/VisibilityInbound/service';



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



const VIFORM = () => {

//   const [form,setform] =  useState({
//     partnumber:"",
//     date:"",
//     newrevision :"",
//     oldrevision:""

//   });


const [value, setValue] = React.useState(1);

 
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const onHandleChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
 

  const onFinish = (values) => {
    console.log('Success:', values);
    if(values.OldRevisionNumber !=values.NewRevisionNumber){
     fetch(apiurlsi,{
         method:"POST",
         headers:{'Content-Type': 'application/json'},
         body:JSON.stringify({
            "body": {
                "type": "INSERT",
                "ecode": '057725',
                "output": [
                    values 
                ]
            }
        })
     }).then(res => res.json())
       .then(data  => {console.log(data)})
       .catch(err=> console.log(err));
    }
  };

    

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

//  const handleChange = (data) => {
//     console.log('data:', data.target.value);
//     console.log('data:', data.target.id);
//     setform({...form, [data.target.id]:data.target.value})
   
//   };

  return (
    <Form autoComplete="off"
      {...layout}
      name="basic"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    <Form.Item name="radio-group" label="Type">
      <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>Regional</Radio>
      <Radio value={2}>Customer</Radio>
        </Radio.Group>
      </Form.Item>
    {value ===1 ? (<Form.Item name="InvoiceNumber" label="Invoice Number" rules={[{ required: true }]}>
    <Select defaultValue="lucy" style={{ width: 120 }}   onChange={onHandleChange}
          allowClear>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    </Form.Item>) :(
      <Form.Item
        label="InvoiceNumber"
        name="InvoiceNumber"
        rules={[
          {
            required: true,
            message: 'Please enter Invoice Number Number!',
          },
        ]}
      >
        <Input/>
      </Form.Item>)}
      <Form.Item name="warehousename" label="Warehouse Name" rules={[{ required: true }]}>
    <Select defaultValue="lucy" style={{ width: 120 }}   onChange={onHandleChange}
          allowClear>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    </Form.Item>
      <Form.Item
        label="Production Date"
        name="ProductionDate"
        rules={[
          {
            required: true,
            message: 'Please enter Production Date!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Old Revision Number"
        name="OldRevisionNumber"
        rules={[
          {
            required: true,
            message: 'Please enter Old Revision Number',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="New Revision Number"
        name="NewRevisionNumber"
        rules={[
          {
            required: true,
            message: 'Please enter New Revision Number',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VIFORM;

