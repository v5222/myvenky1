import React, { useState, useEffect } from "react";
import styles from "./Dwmusagereport.module.scss";
import Filters from "./Filters";
import Myview from "./MyView/Myview";
import Table from "./Table";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { apiURLDwm, dwmBody } from "containers/App/services";
import {
  getSummary,
  getFiltersdata,
  getTableData,
} from "../../containers/DwmUsageReportApplication/getData";
function DwmUsageReport() {
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
  const [summary, setSummary] = useState([]);
  const [option, setOption] = useState({
    dataArr: [],
    type: "DATE_FILTER",
    key: "mtd",
    filters: {
      customer: "All",
      capabilitycode: "All",
      owner: "All",
    },
  });
  //Data filter hook
  useEffect(() => {
    // console.log(data);
    // console.log(isLoading);
    // console.log(error);
    if (!isLoading) {
      setTableData(data.usageReportarr);
      setFiltersData(getFiltersdata(data.usageReportarr));
      setOption({ ...option, dataArr: data.usageReportarr });
      // setTableData(tempTableData);
      // setFiltersData(getFiltersdata(data.usageReportarr));
    }
  }, [data]);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if (!isLoading) {
      setSummary(getSummary(option.dataArr, option.filters));
      console.log(getSummary(option.dataArr, option.filters));
      setTableData(
        getTableData(option.dataArr, option.type, option.key, option.filters)
      );
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

export default DwmUsageReport;
const columnData = [
  {
    Header: "Report Date",
    accessor: "date",
  },
  {
    Header: "User Name",
    accessor: "username",
  },
  {
    Header: "Activity Name",
    accessor: "activityname",
  },

  {
    Header: "Target Value",
    accessor: "targetvalues",
  },
  {
    Header: "Actual",
    accessor: "actual",
  },
  {
    Header: "Comments",
    accessor: "comments",
  },
];
