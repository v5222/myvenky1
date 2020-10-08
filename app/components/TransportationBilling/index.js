import React from "react";
import Filters from "./Filters";
import Table from "./Table";
import styles from "./transportationbilling.module.scss";



function TransportationBilling() {
  

  return (
    <div className={styles.container}>
      <Filters />
      <Table />
    </div>
  );
}

export default TransportationBilling;

