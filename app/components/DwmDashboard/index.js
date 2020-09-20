import React, { useEffect, useState } from "react";
import styles from "./Dwmdashboard.module.scss";
import Filters from "./Filters";
import Myview from "../DwmDashboard/MyView/Myview";
import Table from "../DwmDashboard/Table";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { apiURLDwm, dwmBody } from "containers/App/services";
import {
  getTableData,
  getLoginsummary,
  getActivitySummary,
  getFiltersdata,
} from "../../containers/DwmApplication/getTableData";

function DwmDashboard() {
  const cache = useQueryCache();
  //API Call
  const { isLoading, error, data } = useQuery("dwmdata", () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    let options = {
      method: "POST",
      body: JSON.stringify(dwmBody),
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(apiURLDwm, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => data.body.bodymsg);
  });
  //satetes
  const [loading, setLoading] = useState(isLoading);
  const [tableData, setTableData] = useState([]);
  const [filtersData, setFiltersData] = useState({});
  const [summary, setSummary] = useState({
    loginSummary: {
      total: 0,
      actual: 0,
    },
    activitySummary: {
      total: 0,
      actual: 0,
      totalpercent: 0,
      actualpercent: 0,
    },
  });
  const [option, setOption] = useState({
    dataArr: [],
    type: "DATE_FILTER",
    key: "mtd",
    value: "1.C-MTD",
    filters: {
      customer: "All",
      capabilitycode: "All",
      owner: "All",
    },
  });

  //Data filter hook
  useEffect(() => {
    console.log(data);
    // console.log(isLoading);
    // console.log(error);
    if (!isLoading) {
      let tempTableData = getTableData(data.dashboardarr);
      setTableData(tempTableData);
      setFiltersData(getFiltersdata(data.dashboardarr));
      setOption({ ...option, dataArr: data.dashboardarr });
      // console.log(getTableData(data.dashboardarr));
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      let temploginSum = getLoginsummary(
        option.dataArr,
        option.type,
        option.key,
        option.value,
        option.filters
      );

      let tempActivitySum = getActivitySummary(
        option.dataArr,
        option.type,
        option.key,
        option.value,
        option.filters
      );
      setSummary({
        loginSummary: temploginSum,
        activitySummary: tempActivitySum,
      });
    }
  }, [option]);

  return (
    <div className={styles.container}>
      <Filters
        filtersData={filtersData}
        option={option}
        setOption={setOption}
      />
      <Myview loading={loading} data={summary} />
      <Table tableData={tableData} column={columnData} />
    </div>
  );
}

export default DwmDashboard;

const columnData = [
  {
    Header: "Capability Code",
    accessor: "capabilitycode",
  },
  {
    Header: "Project",
    accessor: "projectname",
  },
  {
    Header: "User",
    accessor: "username",
  },

  {
    Header: "Today Target",
    accessor: "todayTarget",
  },
  {
    Header: "Today Achievement",
    accessor: "todayAch",
  },
  {
    Header: "Monthly Target",
    accessor: "monthlyTarget",
  },
  {
    Header: "Monthly Achievement",
    accessor: "monthlyAch",
  },
];
