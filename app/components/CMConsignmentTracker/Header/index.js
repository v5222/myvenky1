import React from "react";
import styles from "./CMCTheader.module.scss";
import Select from "antd/lib/select";
import Input from "antd/lib/input";
import Tooltip from "antd/lib/tooltip";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import InfoCircleOutlined from "@ant-design/icons/InfoCircleOutlined";
import UploadOutlined from "@ant-design/icons/UploadOutlined";

import Button from "antd/lib/button";
const { Option } = Select;

function Header() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.wrapper}>
      <Select
        onChange={handleChange}
        defaultValue="Select"
        style={{ width: "256px", marginRight: 15 }}
        size="large"
        className={styles.wrapper_select1}
      >
        <Option value="jack">Invoice Number</Option>
        <Option value="lucy">Doc Number</Option>
      </Select>
      <Input
        placeholder="Enter Invoice Number or Doc Number"
        style={{ width: 385, marginRight: 15 }}
        size="large"
        prefix={<SearchOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Type Doc / inovice number">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
      <Button type="primary" size="large" style={{ marginRight: 25 }}>
        Search
      </Button>
      <Button type="default" size="large" icon={<UploadOutlined />}>
        File Upload
      </Button>
    </div>
  );
}

export default Header;
