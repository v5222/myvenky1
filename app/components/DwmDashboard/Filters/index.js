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

function Filters({ filtersData, option, setOption }) {
  const [date, setDate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dates, setDates] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  useEffect(()=>{
console.log(filtersData,"from filters")
  },[filtersData])
  const handleMenuClick = (e) => {
    if (e.key == 2) {
      setDate(false);
      setVisible(false);
    } else {
      setDate(true);
      setVisible(false);
    }
  };
  const handleDateRange = (dates) => {
    setOption({
      ...option,
      filterdate: "DATE",
      sdate: moment(dates[0]).format("YYYY-MM-DD"),
        edate:moment(dates[1]).format("YYYY-MM-DD"),
    });
    console.log(dates, "From dates");
  };
  //Menu Component for Date Filters
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Date Picker</Menu.Item>
      <Menu.Item key="2">Date Type</Menu.Item>
    </Menu>
  );
  const handleDateChange = (key, value) => {
    setOption({
      ...option,
      filterdate:value,
     
    });
    console.log(key, value);
  };
  const handleChange = (key, value) => {
    setOption({
      ...option,
      [key]: value.length !== 0? value.join(","):"-1",
      
    });
    // console.log(key, value);
  };
  return (
    <>
      <div className={styles.container}>
      <div className={styles.wrapper}>
          <div className={styles.title}>Capability</div>
          <Select
           mode="multiple"
           allowClear
            placeholder="Select Capability Code"
            onChange={(value) => handleChange("capabilitycode", value)}
            className={styles.select}
            optionFilterProp="key"
          >
            {filtersData.capabilityname !== undefined &&
              filtersData.capabilityname.map((i, index) => {
                return (
                  <>
                    <Option value={i.capabilitykey} key={i.capabilitycode}>
                      {i.capabilitycode}
                    </Option>
                  </>
                );
              })}
           
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Customer</div>
          <Select
            mode="multiple"
            allowClear
             placeholder="Select Customer"
            onChange={(value) => handleChange("customer", value)}
            className={styles.select}
            optionFilterProp="key"
          >
            {filtersData.customer !== undefined &&
              filtersData.customer.map((i) => {
                return (
                  <>
                    <Option value={i.projectkey} key={i.projectname}>
                      {i.projectname}
                    </Option>
                  </>
                );
              })}
            
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Owner</div>
          <Select
           mode="multiple"
           allowClear
            placeholder="Select Owner"
            onChange={(value) => handleChange("owner", value)}
            className={styles.select}
            optionFilterProp="key"
          >
            {filtersData.owner !== undefined &&
              filtersData.owner.map((i) => {
                return (
                  <>
                    <Option value={i.userkey} key={i.username}>
                      {i.username}
                    </Option>
                  </>
                );
              })}
            
          </Select>
        </div>


        {!date ? (
          <div className={styles.wrapper}>
            <div className={styles.title} style={{color:"#123f74"}}>Date Type & Range Picker </div>
            <Select
              onChange={(value) => handleDateChange("key", value)}
              className={styles.select}
              defaultValue="Today"
            >
              <Option value="FTD">Today</Option>
              <Option value="WTD">
                WTD
              </Option>

              <Option value="MTD">MTD</Option>
              <Option value="YTD">YTD</Option>
            </Select>
          </div>
        ) : (
          <div className={styles.wrapperDate}>
            <div className={styles.title} style={{color:"#123f74"}}>Date Type & Range Picker </div>
            <RangePicker
              allowClear={false}
              onChange={handleDateRange}
              defaultValue={[
                moment(dates.startDate, "DD-MM-YYYY"),
                moment(dates.endDate, "DD-MM-YYYY"),
              ]}
            />
          </div>
        )}
        <div className={styles.calendar}>
          <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={visible}
          >
            <CalendarOutlined
              style={{
                fontSize: "33px",
                color: "#ADADAD",
                marginLeft: "6px",
              }}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        </div>
        {/* <div className={styles.refresh}>
          <p style={{ fontFamily: "Open sans" }}>
            Last Refresh Date :
            <span className={styles.refreshdate}>
              {moment(maxDate).format("DD-MM-YYYY")}
            </span>{" "}
          </p>
        </div> */}
      </div>
    </>
  );
}

export default Filters;
