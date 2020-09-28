import React, { useState, useEffect } from "react";
import Select from "antd/lib/select";
import Button from "antd/lib/button";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import DatePicker from "antd/lib/date-picker";
import moment from "moment";
const { RangePicker } = DatePicker;
import styles from "./Filters.module.scss";
import { apiURLCourier } from "../../../containers/App/services";
import CsvDownload from "react-json-to-csv";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
const { Option } = Select;

const currentDate = moment().format("YYYY-MM-DD");
const startDate = moment()
  .subtract(7, "d")
  .format("YYYY-MM-DD");
function Filters({ fetchData, setFiltersOn, filtersOn, tableData }) {
  // const [filtersData, setFiltersData] = useState([]);

  const [custValue, setCustValue] = useState("All");
  const [location, setLocation] = useState("All");
  const [locationData, setLocationData] = useState([]);
  const [custData, setCustData] = useState([]);
  const [date, setDate] = useState(true);
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    ecode: "KARSHA01",
    type: "FILTER-1",
    customer: "All",
    location: "All",
    status: "All",
    filterdate: "DATE",
    sdate: startDate,
    edate: currentDate,
  });

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const handleDateChange = (key, value) => {
    console.log(key, value);
    switch (value) {
      case "mtd": {
        setData({
          ...data,
          ["filterdate"]: "DATE",

          ["sdate"]: moment()
            .startOf("month")
            .format("YYYY-MM-DD"),
          ["edate"]: moment()
            .endOf("month")
            .format("YYYY-MM-DD"),
        });
        break;
      }
      case "wtd": {
        console.log("wtd");
        setData({
          ...data,
          ["filterdate"]: "DATE",

          ["sdate"]: moment()
            .startOf("week")
            .format("YYYY-MM-DD"),
          ["edate"]: moment().format("YYYY-MM-DD"),
        });
        break;
      }
      case "ytd": {
        console.log("ytd");
        setData({
          ...data,
          ["filterdate"]: "DATE",

          ["sdate"]: moment()
            .startOf("year")
            .format("YYYY-MM-DD"),
          ["edate"]: moment()
            .endOf("year")
            .format("YYYY-MM-DD"),
        });
        break;
      }
    }
  };

  const handleMenuClick = (e) => {
    if (e.key == 2) {
      setData({
        ...data,
        ["filterdate"]: "DATE",

        ["sdate"]: moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        ["edate"]: moment()
          .endOf("month")
          .format("YYYY-MM-DD"),
      });
      setDate(false);
      setVisible(false);
    } else {
      setDate(true);
      setVisible(false);
      setData({
        ...data,
        ["filterdate"]: "DATE",

        ["sdate"]: startDate,
        ["edate"]: currentDate,
      });
    }
  };
  //Menu Component for Date Filters
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Date Picker</Menu.Item>
      <Menu.Item key="2">Date Type</Menu.Item>
    </Menu>
  );
  const fetchFilters = () => {
    let filterOption = { ...data, ["type"]: "FILTER-3" };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let bodyoption = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({ body: filterOption }),
    };
    // console.log(filterOption);
    fetch(apiURLCourier, bodyoption)
      .then((res) => res.json())
      .then((value) => {
        // console.log(value, "from filters");
        let tempCust = value.body.bodymsg.customer;
        let tempLocation = value.body.bodymsg.location;
        if (tempCust !== undefined) {
          tempCust.length === 1
            ? setCustValue(tempCust[0].consignor)
            : setCustValue(data.customer);
        }
        if (tempLocation !== undefined) {
          tempLocation.length === 1
            ? setLocation(tempLocation[0].origin)
            : setLocation(data.location);
        }
        setCustData(value.body.bodymsg.customer);
        setLocationData(value.body.bodymsg.location);
        // setFiltersData(value.bodymsg);
      });
  };
  const handleChange = (label, value) => {
    if (label === "customer") {
      if (value === "All") {
        setFiltersOn(false);
        setData({ ...data, [label]: value, ["type"]: "FILTER-1" });
      } else {
        setFiltersOn(true);
        setData({ ...data, [label]: value, ["type"]: "FILTER-2" });
      }
    } else {
      setData({ ...data, [label]: value, ["type"]: "FILTER-2" });
    }
  };
  const handleDateRange = (dates) => {
    // setFiltersOn(true);
    setData({
      ...data,
      ["filterdate"]: "DATE",
      // ["type"]: "FILTER-2",
      ["sdate"]: moment(dates[0]).format("YYYY-MM-DD"),
      ["edate"]: moment(dates[1]).format("YYYY-MM-DD"),
    });
    // console.log(dates, "from date range");
  };

  useEffect(() => {
    fetchFilters();
    fetchData(data);
  }, [data]);
  useEffect(() => {
    console.log(startDate, currentDate);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner1}>
          <div className={styles.wrapper}>
            <div className={styles.title}>Customer</div>
            <Select
              value={custValue}
              onChange={(value) => {
                setCustValue(value);
                handleChange("customer", value);
              }}
              className={styles.select}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                if (option.children !== null) {
                  return (
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  );
                }
              }}
            >
              {custData.length > 0
                ? custData.map((i, index) => {
                    return (
                      <>
                        <Option key={index} value={i.consignor}>
                          {i.consignor}
                        </Option>
                      </>
                    );
                  })
                : ""}
              <Option key="All" value="All">
                All
              </Option>
              {/* <Option value="lucy">Bosch</Option>

            <Option value="Yiminghe">JCH</Option> */}
            </Select>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.title}>Status</div>
            <Select
              defaultValue="All"
              onChange={(value) => {
                setCustValue(value);
                handleChange("status", value);
              }}
              className={styles.select}
              disabled={!filtersOn}
            >
              <Option value="DELIVERED">DELIVERED</Option>
              <Option value="UNDELIVERED">UNDELIVERED</Option>

              <Option value="IN TRANSIT">IN TRANSIT</Option>
              <Option key="All" value="All">
                All
              </Option>
            </Select>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.title}>Location</div>
            <Select
              value={location}
              onChange={(value) => {
                setCustValue(value);
                handleChange("location", value);
              }}
              className={styles.select}
              disabled={!filtersOn}
            >
              {locationData.length > 0
                ? locationData.map((i, index) => {
                    return (
                      <>
                        <Option key={index} value={i.origin}>
                          {i.origin}
                        </Option>
                      </>
                    );
                  })
                : ""}
              <Option key="All" value="All">
                All
              </Option>
            </Select>
          </div>

          {!date && (
            <div className={styles.wrapper}>
              <div className={styles.title_date}>Date Type</div>
              <Select
                onChange={(value) => handleDateChange("key", value)}
                className={styles.select}
                defaultValue="MTD"
              >
                <Option selected value="wtd">
                  WTD
                </Option>

                <Option value="mtd">MTD</Option>
                <Option value="ytd">YTD</Option>
              </Select>
            </div>
          )}

          {date && (
            <div className={styles.wrapperDate}>
              <div className={styles.title_date}>Date</div>
              <RangePicker
                bordered={true}
                onChange={handleDateRange}
                allowClear={false}
                defaultValue={[
                  moment(startDate, "YYYY-MM-DD"),
                  moment(currentDate, "YYYY-MM-DD"),
                ]}
              />
            </div>
          )}
          <div>
            <div
              className={styles.title_date}
              style={{
                color: "transparent",
                fontSize: "14px",
              }}
            >
              Date Type
            </div>
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
        </div>

        <div className={styles.wrapper_csv}>
          <div
            style={{
              color: "transparent",
              fontSize: "14px",
              lineHeight: "18px",
            }}
            className={styles.clearfilter}
          >
            dummy
          </div>

          <CsvDownload
            data={tableData}
            filename="data.csv"
            className={styles.csvbtn}
          >
            <span className="wrapper">
              <DownloadOutlined />
            </span>
            Download Report
          </CsvDownload>
        </div>
      </div>
    </>
  );
}

export default Filters;
