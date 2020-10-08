import React, { useState, useEffect } from "react";
import Select from "antd/lib/select";
import Button from "antd/lib/button";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import DatePicker from "antd/lib/date-picker";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import moment from "moment";
const { RangePicker } = DatePicker;
import styles from "./Filters.module.scss";

const { Option } = Select;

function Filters() {
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Customer code</div>
          <Select
            defaultValue="All"
            className={styles.select}
          >
            
            <Option value="All" key="All">
              All
            </Option>
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Cost center</div>
          <Select
            defaultValue="All"
            className={styles.select}
          >
            
            <Option value="All" key="All">
              All
            </Option>
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Bill to ID</div>
          <Select
            defaultValue="All"
            className={styles.select}
          >

            <Option value="All" key="All">
              All
            </Option>
          </Select>
        </div>
        <div className={styles.wrapper}>
        <div className={styles.title}>Transportation</div>
        <Select
          defaultValue="All"
          className={styles.select}
        >
          
          <Option value="All" key="All">
            All
          </Option>
        </Select>
      </div>
        <div className={styles.wrapper}>
        <div style={{color:"transparent"}}>dummy</div>
        <Button type="primary">Search</Button>
        </div>

     
        
        
      </div>
    </>
  );
}

export default Filters;
