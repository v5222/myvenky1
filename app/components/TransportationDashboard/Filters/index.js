import React, { useState, useEffect } from "react";
import Select from "antd/lib/select";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
            <Option value={'test'} key={"test"}>
              test
              </Option>
          </Select>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>Cost center</div>
          <Select
            defaultValue="All"
            className={styles.select}
          >
            <Option value={'test'} key={"test"}>
              Cost center
              </Option>
          </Select>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>Bill to ID</div>
          <Select
            defaultValue="All"
            className={styles.select}
          >
            <Option value={'test'} key={"test"}>
              Cost center
              </Option>
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
          <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </div>
      </div>
    </>
  );
}

export default Filters;
