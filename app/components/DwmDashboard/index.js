import React from "react";


import styles from "./Dwmdashboard.module.scss";
import Filters from "./Filters";
import Myview from "../DwmDashboard/MyView/Myview";
import Table from "../DwmDashboard/Table";
function DwmDashboard() {
  return (
    <div className={styles.container}>
    <Filters />
    <Myview />
    <Table />
      
    </div>
  );
}

export default DwmDashboard;