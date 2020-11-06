import React, { useState, useEffect } from "react";
import Select from "antd/lib/select";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from "./Filters.module.scss";

const { Option } = Select;
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;




function Filters({ data, setTableData }) {
  const [search, setSearch] = useState({
    customer_code: "All",
    bill_toid: "All",
    cost_center: "All"

  })
  const handleChange = (value, option) => {
    setSearch({ ...search, [option.title]: value })
    console.log(option)
  }
  const handleSearch = () => {
    let newData = data.filter(i => {
      let cust_code = search.customer_code !== "All" ? search.customer_code : true
      let bil_id = search.bill_toid !== "All" ? search.bill_toid : true
      let cost_cen = search.cost_center !== "All" ? search.cost_center : true
      if (i.customer_code === cust_code && i.bill_toid === bil_id && i.cost_center === cost_cen) {
        return true
      }
      else {
        return false
      }
    })
    console.log(newData)

  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Customer code</div>
          <Select
            defaultValue="All"
            className={styles.select}
            onChange={handleChange}
          >
            {data.map((i, index) => {
              return (
                <>
                  <Option
                    title="customer_code"
                    value={i.customer_code} key={index}>
                    {i.customer_code}
                  </Option>
                </>
              )
            })}
            <Option key="All" value="All">All</Option>
          </Select>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>Cost center</div>
          <Select
            defaultValue="All"
            className={styles.select}
            onChange={handleChange}
          >
            {data.map((i, index) => {
              return (
                <>
                  <Option title="cost_center" value={i.cost_center} key={index}>
                    {i.cost_center}
                  </Option>
                </>
              )
            })}
            <Option key="All" value="All">All</Option>
          </Select>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>Bill to ID</div>
          <Select
            defaultValue="All"
            className={styles.select}
            onChange={handleChange}
          >
            {data.map((i, index) => {
              return (
                <>
                  <Option
                    title="bill_toid"
                    value={i.bill_toid} key={index}>
                    {i.bill_toid}
                  </Option>
                </>
              )
            })}
            <Option key="All" value="All">All</Option>
          </Select>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>Billing type</div>
          <Select
            defaultValue="Transportation"
            className={styles.select}
          >
            <Option value={'Transportation'} key={"Transportation"}>
              Transportation
              </Option>
          </Select>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>Date and Range picker</div>
          <RangePicker />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.title} style={{ color: "transparent" }}>Billing type</div>
          <Button type="primary" icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
}

export default Filters;
