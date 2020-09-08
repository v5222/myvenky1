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

const { Option } = Select;

function Filters({ fetchData, setFiltersOn, filtersOn, tableData }) {
  // const [filtersData, setFiltersData] = useState([]);

  const [custValue, setCustValue] = useState("All");
  const [location, setLocation] = useState("All");
  const [locationData, setLocationData] = useState([]);
  const [custData, setCustData] = useState([]);
  const [data, setData] = useState({
    ecode: "KARSHA01",
    type: "FILTER-1",
    customer: "All",
    location: "All",
    status: "All",
    filterdate: "NA",
    sdate: "2020-06-02",
    edate: "2020-08-31",
  });
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
    console.log(filterOption);
    fetch(apiURLCourier, bodyoption)
      .then((res) => res.json())
      .then((value) => {
        console.log(value, "from filters");
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
      ["sdate"]: moment(dates[0]).format(),
      ["edate"]: moment(dates[1]).format(),
    });
    // console.log(dates, "from date range");
  };

  useEffect(() => {
    fetchFilters();
    fetchData(data);
  }, [data]);
  // useEffect(()=>{

  // },[])

  return (
    <>
      <div className={styles.container}>
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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

        <div className={styles.wrapperDate}>
          <div className={styles.title_date}>Date</div>
          <RangePicker bordered={true} onChange={handleDateRange} />
        </div>

        <div className={styles.wrapper}>
          <div
            style={{
              color: "transparent",
              fontSize: "14px",
              lineHeight: "18px",
            }}
          >
            dummy
          </div>
          {/* <Button type="primary" icon={<DownloadOutlined />}> */}
          <CsvDownload
            data={tableData}
            filename="data.csv"
            className={styles.csvbtn}
          >
            <span style={{ marginRight: "5px" }}>
              <DownloadOutlined />
            </span>
            Download Report
          </CsvDownload>
          {/* </Button> */}
        </div>
      </div>
    </>
  );
}

export default Filters;
