import React from "react";
import styles from "../bdrecuirement.module.scss";
const { Option } = Select;
import { Select } from "antd";
import { Input } from "antd";
function SelectCombo({ title, data, type = "select" }) {
  return (
    <div className={styles.flex_col}>
      <div>{title}</div>
      <div>
        {type === "input" ? (
          <Input style={{ width: 200 }} placeholder="Select" />
        ) : (
          <Select style={{ width: 200 }} placeholder="Select">
            {data.map((i, index) => {
              return (
                <Option value={i} key={index}>
                  {i}
                </Option>
              );
            })}
          </Select>
        )}
      </div>
    </div>
  );
}

export default SelectCombo;
