import React, { useState } from "react";
import styles from "./transportation.module.scss";
import Filters from "./Filters";
import Table from "../TransportationDashboard/Table";
import { Data } from './data'

function TransportationDashboard() {

  const [tableData, setTableData] = useState(Data);
  
  const updateMyData = (rowIndex, columnId, value) => {
    setTableData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          console.log('row',row);
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  return (
    <div className={styles.container}>
      <Filters/>
      <Table tableData={tableData} column={columnData} updateMyData={updateMyData}/>
    </div>
  );
}

export default TransportationDashboard;

const columnData = [
  {
    Header: "Over ride value",
    accessor: "CUSTOMER_NAME",
  },
  {
    Header: "Invoice rule amount",
    accessor: "Rule_Amount",
  },
  {
    Header: "Ref Doc No",
    accessor: "Ref_Doc",
  },

  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Service Item",
    accessor: "ITEM_CODE",
  }
];
