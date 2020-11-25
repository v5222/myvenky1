import React, { useState, useEffect } from "react";
import styles from "./Dwmusagereport.module.scss";
import Filters from "./Filters";
import Myview from "./MyView/Myview";
import Table from "./Table";
import moment from "moment";
import message from "antd/lib/message";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { apiURLDwm, dwmBody } from "containers/App/services";
import {
  getSummary,
  getFiltersdata,
  getTableData,
  maxRefresDate,
} from "../../containers/DwmUsageReportApplication/getData";
import CsvDownload from "react-json-to-csv";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
function DwmUsageReport() {
  // //API Call
  // const { isLoading, error, data } = useQuery("dwmdata", () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Accept", "application/json");
  //   let options = {
  //     method: "POST",
  //     body: JSON.stringify(dwmBody),
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   return fetch(apiURLDwm, options)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => data.body.bodymsg);
  // });
  //satetes
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filtersData, setFiltersData] = useState({});
  const [summary, setSummary] = useState([]);
  const [maxDate, setMaxDate] = useState(moment());
  const [graph, setGraph] = useState([]);
  const [options, setOptions] = useState({
    type: "INSIGHT",
    ecode: "9999",
    filterdate: "FTD",
    sdate: "2020-08-11",
    edate: "2020-08-11",
    customer: "-1",
    capabilitycode: "-1",
    owner: "-1",
  });
  // //Data filter hook
  // useEffect(() => {
  //   console.log(data);
  //   // console.log(isLoading);
  //   // console.log(error);
  //   if (!isLoading) {
  //     // console.log(data.usageReportarr);
  //     setTableData(data.usageReportarr);
  //     // console.log(maxRefresDate(data.usageReportarr), "fro max");
  //     setMaxDate(maxRefresDate(data.usageReportarr));
  //     setOption({ ...option, dataArr: data.usageReportarr });
  //     // setTableData(tempTableData);
  //     // setFiltersData(getFiltersdata(data.usageReportarr));
  //   }
  // }, [data]);
  // useEffect(() => {
  //   setLoading(isLoading);
  // }, [isLoading]);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  function getFilters(array, option, callback) {
    getFiltersdata(array, option, callback);
  }
  const callbackFunction = (result) => {
    setFiltersData(result);
    // console.log(result);
  };
  useEffect(() => {
    let option = {
      method: "POST",
      body: JSON.stringify({ body: options }),
      headers: myHeaders,
      redirect: "follow",
    };
    setLoading(true);
    fetch(apiURLDwm, option)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas);
        setLoading(false);
        let { Output, response, graph } = datas.body.bodymsg;

        setTableData(response);
        setSummary(Output);
        setGraph(graph);
        setMaxDate(maxRefresDate(response));
      })
      .catch((err) => {
        setLoading(false);
        message.error("something went wrong ,please try again");
      });

    getFilters(options, callbackFunction);
  }, [options]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     setSummary(getSummary(option.dataArr, option.filters));
  //     // console.log(getSummary(option.dataArr, option.filters));
  //     setTableData(
  //       getTableData(option.dataArr, option.type, option.key, option.filters)
  //     );
  //     getFilters(data.usageReportarr, option, callbackFunction);
  //   }
  // }, [option]);
  return (
    <div className={styles.container}>
      <Filters
        filtersData={filtersData}
        option={options}
        setOption={setOptions}
        maxDate={maxDate}
      />
      <Myview loading={loading} data={summary} graph={graph} />
      <div className={styles.csvwrapper}>
        <CsvDownload
          data={tableData}
          filename="data.csv"
          className={styles.csvbtn}
        >
          <span className="wrapper">
            <DownloadOutlined />
          </span>
          Download Report
        </CsvDownload>
      </div>
      <Table tableData={tableData} column={columnData} loading={loading} />
    </div>
  );
}

export default DwmUsageReport;
const columnData = [
  {
    Header: "Report Date",
    accessor: "reportdate",
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
