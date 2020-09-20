import React from "react";
import styles from "./Dwmusagereport.module.scss";
import Filters from "./Filters";
 import Myview from './MyView/Myview';
import Table from "./Table";

function DwmUsageReport() {



  return (
    <div className={styles.container}>
      <Filters />
      <Myview />
      <Table />
    </div>
  );

}

export default DwmUsageReport;
