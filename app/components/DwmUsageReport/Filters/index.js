import React, { useState, useEffect } from "react";
import Select from "antd/lib/select";
import Button from "antd/lib/button";
import DatePicker from "antd/lib/date-picker";
import moment from "moment";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import styles from "./Filters.module.scss";

const { RangePicker } = DatePicker;

const { Option } = Select;

function Filters({ filtersData, option, setOption, maxDate }) {
  const [date, setDate] = useState(true);
  const [visible, setVisible] = useState(false);
  const [dates, setDates] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
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
      type: "DATE_PICKER",
      key: { from: dates[0], to: dates[1] },
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
      type: "DATE_FILTER",
      [key]: value,
    });
    console.log(key, value);
  };
  const handleChange = (key, value) => {
    setOption({
      ...option,
      filters: {
        ...option.filters,
        [key]: value,
      },
    });
    // console.log(key, value);
  };

  // useEffect(() => {
  //   console.log(filtersData, "from filters");
  // }, [filtersData]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Capability</div>
          <Select
            defaultValue="All"
            onChange={(value) => handleChange("capabilitycode", value)}
            className={styles.select}
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
            onChange={(value) => handleChange("customer", value)}
            className={styles.select}
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
            defaultValue="All"
            onChange={(value) => handleChange("owner", value)}
            className={styles.select}
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
            <div className={styles.title} style={{color:"#123f74"}}>Date Type & Range Picker </div>
            <Select
              onChange={(value) => handleDateChange("key", value)}
              className={styles.select}
              defaultValue="MTD"
            >
              <Option value="ftd">Today</Option>
              <Option selected value="wtd">
                WTD
              </Option>

              <Option value="mtd">MTD</Option>
              <Option value="ytdc">YTD</Option>
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
        <div className={styles.refresh}>
          <p style={{ fontFamily: "Open sans" }}>
            Last Refresh Date :
            <span className={styles.refreshdate}>
              {moment(maxDate).format("DD-MM-YYYY")}
            </span>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Filters;
