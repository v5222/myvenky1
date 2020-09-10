import React from "react";
import Select from "antd/lib/select";
import Button from "antd/lib/button";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import DatePicker from "antd/lib/date-picker";

const { RangePicker } = DatePicker;
import styles from "./Filters.module.scss";

const { Option } = Select;

function Filters() {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Capability</div>
          <Select
            placeholder="All"
            onChange={handleChange}
            className={styles.select}
          >
            <Option value="jack">Modicare</Option>
            <Option value="lucy">Bosch</Option>

            <Option value="Yiminghe">JCH</Option>
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Customer</div>
          <Select
            placeholder="All"
            onChange={handleChange}
            className={styles.select}
          >
            <Option value="delivered">Owner</Option>
            <Option value="notdelivered">Not Delivered</Option>

            <Option value="intransit">In Transit</Option>
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Location</div>
          <Select
            placeholder="All"
            onChange={handleChange}
            className={styles.select}
          >
            <Option value="jack">AIZAWL DWH</Option>
            <Option value="lucy">Bhiwandi DWH</Option>

            <Option value="Yiminghe">Guwahati DWH</Option>
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Date Type & Range Picker </div>
          <Select
           placeholder="All"  
          onChange={handleChange}
          className={styles.select}
        >
          <Option default value="Today">Today</Option>
          <Option value="WTD">WTD</Option>

          <Option value="MTD">MTD</Option>
          <Option value="YTD">YTD</Option>
        </Select>
          

          
        </div>
     
        
          
      </div> 
    </>
  );
}

export default Filters; 