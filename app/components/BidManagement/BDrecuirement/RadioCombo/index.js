import React, { useEffect, useState } from "react";
import styles from "../bdrecuirement.module.scss";
const { Option } = Select;
import { Select } from "antd";
import { Radio } from "antd";
import { Input } from "antd";
function RadioCombo({ title }) {
  const [value, setValue] = useState(1);
  return (
    <div className={styles.flex_col}>
      <div>{title}</div>
      <div>
        <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
          <Radio value={1}>Yes</Radio>
          <Radio value={2}>No</Radio>
        </Radio.Group>
        <Input style={{ width: 200 }} placeholder="Select" />
      </div>
    </div>
  );
}

export default RadioCombo;
