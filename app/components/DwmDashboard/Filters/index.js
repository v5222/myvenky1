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
      sdate: dates[0],
        edate: dates[1],
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
      [key]: value,
  
    });
    // console.log(key, value);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Capability</div>
          <Select
           showSearch
            defaultValue="All"
            onChange={(value) => handleChange("capabilitycode", value)}
            className={styles.select}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {filtersData.capabilityname !== undefined &&
              filtersData.capabilityname.map((i, index) => {
                return (
                  <>
                    <Option value={i.capabilitycode} key={i.capabilitycode}>
                      {i.capabilitycode}
                    </Option>
                  </>
                );
              })}
            <Option value="All" key="All">
              All
            </Option>
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Customer</div>
          <Select
            defaultValue="All"
            showSearch
            onChange={(value) => handleChange("customer", value)}
            className={styles.select}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {filtersData.customer !== undefined &&
              filtersData.customer.map((i) => {
                return (
                  <>
                    <Option value={i.projectname} key={i.projectname}>
                      {i.projectname}
                    </Option>
                  </>
                );
              })}
            <Option value="All" key="All">
              All
            </Option>
          </Select>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title}>Owner</div>
          <Select
          showSearch
            defaultValue="All"
            onChange={(value) => handleChange("owner", value)}
            className={styles.select}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {filtersData.owner !== undefined &&
              filtersData.owner.map((i) => {
                return (
                  <>
                    <Option value={i.username} key={i.username}>
                      {i.username}
                    </Option>
                  </>
                );
              })}
            <Option value="All" key="All">
              All
            </Option>
          </Select>
        </div>

        {!date ? (
          <div className={styles.wrapper}>
            <div className={styles.title} style={{color:'#123f74'}}>Date Type & Range Picker </div>
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
            <div className={styles.title} style={{color:'#123f74'}}>Date Type & Range Picker </div>
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
                fontSize: "32px",
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
            <span className={styles.refreshdate}>10/09/2020</span>{" "}
          </p>
        </div> */}
      </div>
    </>
  );
}

export default Filters;
