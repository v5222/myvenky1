import React from "react";

import Myview from "./Myview/Myview";
import Filters from "./Filters";
import CMdashboardTable from "./Table";
import styles from "./Cmdashboard.module.scss";
function CMDashboard() {
  return (
    <div className={styles.container}>
      <Myview />
      <Filters />
      <CMdashboardTable />
    </div>
  );
}

export default CMDashboard;
