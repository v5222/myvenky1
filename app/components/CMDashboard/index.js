import React, { useState, useEffect } from "react";

import Myview from "./Myview/Myview";
import Filters from "./Filters";
import CMdashboardTable from "./Table";
import styles from "./Cmdashboard.module.scss";
import { apiURLCourier } from "../../containers/App/services";
import moment from "moment";
import {connect} from "react-redux"
const startDate = moment()
  .startOf("week")
  .format("YYYY-MM-DD");
const currentDate = moment().format("YYYY-MM-DD");
function CMDashboard({userRole,otpLogIn}) {
  const [filtersOn, setFiltersOn] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState(cloumns1);
  const [dates, setDates] = useState({
    sdate: "2020-06-02",
    edate: "2020-08-31",
  });
useEffect(()=>{
console.log(userRole)
},[userRole])
  const fetchData = (values) => {
    // console.log(apiURLCourier, values);
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({ body: values }),
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(apiURLCourier, bodyoption)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const { bodymsg } = data.body;
        const { statuscode } = data.body;
        if (statuscode === 201) {
          setTableData([]);
        } else {
          setTableData(bodymsg);
          setDates({ edate: values.edate, sdate: values.sdate });
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (filtersOn === true) {
      setColumns(column2);
    }
  }, [filtersOn]);

  return (
    <div className={styles.container}>
      <Myview  usertype = {userRole.length >0 ? userRole[0].usertype : null}
        otpLogIn={otpLogIn}/>
      <Filters
        fetchData={fetchData}
        filtersOn={filtersOn}
        setFiltersOn={setFiltersOn}
        tableData={tableData}
        usertype = {userRole.length >0 ? userRole[0].usertype : null}
        otpLogIn={otpLogIn}
      />
      <CMdashboardTable
        columnData={filtersOn === false ? cloumns1 : column2}
        dates={dates}
        data={tableData}
        loading={loading}
      />
    </div>
  );
}
const mapStateToProps =(state,ownProps)=>{
 return {
  userRole:state.global.userRole,
  otpLogIn:state.global.otpLogIn
 }
}
export default connect(mapStateToProps,null)(CMDashboard);

const cloumns1 = [
  {
    Header: "Customer",
    accessor: "origin",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Total Invoices",
    accessor: "invoicecount",
  },

  {
    Header: "Delivered",
    accessor: "deliveredcount",
  },
  {
    Header: "Not Delivered",
    accessor: "undeliveredcount",
  },
  {
    Header: "Intransit",
    accessor: "intransit",
  },
  {
    Header: "CWB",
    accessor: "cwb",
  },
  {
    Header: "Percentage",
    accessor: "percentage",
  },
  {
    Header: "Actions",
    accessor: "view",
  },
];

const column2 = [
  {
    Header: "Invoice No",
    accessor: "invoiceno",
  },
  {
    Header: "Customer",
    accessor: "consignor",
  },
  {
    Header: "Location",
    accessor: "origin",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Consignee",
    accessor: "consignee",
  },
  {
    Header: "Date",
    accessor: "date",
  },
];
