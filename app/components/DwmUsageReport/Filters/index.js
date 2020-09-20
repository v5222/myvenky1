import React from "react";
import Select from "antd/lib/select";
import Button from "antd/lib/button";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import DatePicker from "antd/lib/date-picker";

import Calendar from '../../../images/SVG/calendar.svg'

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
          <div className={styles.title}>Owner</div>
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
          <Option  value="Today">Today</Option>
          <Option selected value="WTD">WTD</Option>

          <Option value="MTD">MTD</Option>
          <Option value="YTD">YTD</Option>
        </Select>
        </div>
        <div className={styles.calendar}> <img src={Calendar}/> </div>
        <div className={styles.refresh}><p style={{fontFamily:'Open sans'}}>Last Refresh Date :<span className={styles.refreshdate}>10/09/2020</span> </p></div>
     
        
          
      </div> 
    </>
  );
}

export default Filters; 