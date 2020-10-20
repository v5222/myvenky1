import React, { useState } from "react";
import styles from "./transportation.module.scss";
import Filters from "./Filters";
import Table from "../TransportationDashboard/Table";
import { data } from './data'
import { Tabs } from 'antd';

const { TabPane } = Tabs;
function TransportationDashboard() {

  const [tableData, setTableData] = useState(data);
  
  

  return (
    <div className={styles.container}>
      <Filters data={data} setTableData={setTableData}/>
      <div style={{margin:"0px 25px"}}>
      <Tabs defaultActiveKey="1" >
    <TabPane tab="Ready for billing" key="1">
    <Table tableData={tableData} column={columnData1} />
    </TabPane>
    <TabPane tab="Not eligible for billing" key="2">
    <Table tableData={tableData} column={columnData2} />
    </TabPane>
    
  </Tabs>
  </div>
     
    </div>
  );
}

export default TransportationDashboard;

const columnData2 = [
  {
    Header: "Customer Code",
    accessor: "customer_code",
  },
  {
    Header: "Cost Center",
    accessor: "cost_center",
  },
  {
    Header: "Bill To Id",
    accessor: "bill_toid",
  },

  {
    Header: "Ref Doc",
    accessor: "ref_doc",
  },
  {
    Header: "Invoice Amount",
    accessor: "invoice_amt",
  },
  {
    Header: "Route Code",
    accessor: "route_code",
  },
  ,
  {
    Header: "Reason",
    accessor: "reason",
  }
];


const columnData1 = [
  {
    Header: "Customer Code",
    accessor: "customer_code",
  },
  {
    Header: "Cost Center",
    accessor: "cost_center",
  },
  {
    Header: "Bill To Id",
    accessor: "bill_toid",
  },

  {
    Header: "Ref Doc",
    accessor: "ref_doc",
  },
  {
    Header: "Invoice Amount",
    accessor: "invoice_amt",
  },
  {
    Header: "Route Code",
    accessor: "route_code",
  },
  
];