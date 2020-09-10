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
          <div className={styles.title}>Customer</div>
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
          <div className={styles.title}>Status</div>
          <Select
            placeholder="All"
            onChange={handleChange}
            className={styles.select}
          >
            <Option value="delivered">Delivered</Option>
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

        <div className={styles.wrapperDate}>
          <div className={styles.title_date}>Date</div>
          <RangePicker bordered={true} />

          
        </div>
     {/* <div className={styles.wrapper_clear}>
          <div
            style={{
              color: "red",
              fontSize: "14px",
              lineHeight: "18px",
            }}
            className={styles.clearfilter}
          >
            dummy
          </div>
          <div className={styles.clearfilter}>clear filters</div>
        </div>
        <div className={styles.wrapper}>
          <div
            style={{
              color: "red",
              fontSize: "14px",
              lineHeight: "18px",
            }}
            className={styles.clearfilter}
          >
            dummy
          </div>
         <Button type="primary" style={{marginLeft:'auto'}} icon={<DownloadOutlined />}>
            Download Report
          </Button> 
        </div> */}
        
          <Button type="primary" style={{margin:'auto'}} icon={<DownloadOutlined  />}>
            Download Report
          </Button> 
      </div> 
    </>
  );
}

export default Filters;
