import React, { useEffect, useState } from "react";
import styles from "./Dwmdashboard.module.scss";
import Filters from "./Filters";
import Myview from "../DwmDashboard/MyView/Myview";
import Table from "../DwmDashboard/Table";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { apiURLDwm, dwmBody } from "containers/App/services";
import CsvDownload from "react-json-to-csv";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import {
  getTableData,
  getLoginsummary,
  getActivitySummary,
  getFiltersdata,
} from "../../containers/DwmApplication/getTableData";


function DwmDashboard() {
  const cache = useQueryCache();
  
  //satetes
  const [loading, setLoading] = useState(false);
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
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
     myHeaders.append("Accept", "application/json");
  const [options,setOptions] = useState({
        
        type: "SUMMARY",
        ecode: "9999",
        filterdate: "FTD",
        sdate: "2020-08-11",
        edate: "2020-08-11",
        customer: "All",
        capabilitycode: "All",
        owner: "All"
      
     })
     function getFilters(array, option, callback) {
      getFiltersdata(array, option, callback);
    }
    const callbackFunction = (result) => {
      setFiltersData(result);
       console.log(result,"from result");
    };
  useEffect(()=>{

    let option = {
      method: "POST",
       body: JSON.stringify({body:options}),
     headers: myHeaders,
      redirect: "follow",
    }
    setLoading(true)
  fetch(apiURLDwm,option)
  .then(res=>res.json())
  .then(datas=>{
    console.log(datas)
    setLoading(false)
    let {loginsummary,activitysummary,performsummary,data} = datas.body.bodymsg

    setSummary({
             loginSummary: loginsummary[0],
             activitySummary: {
               total:activitysummary[0].total,
               actual:activitysummary[0].actual,
               totalpercent:performsummary[0].total,
               actualpercent:performsummary[0].actual
             },
           });
setTableData(data)

  })
  .catch(err=>{
    setLoading(false)
    alert(err)
  })
 
  getFilters( options, callbackFunction);
  },[options])
  // const [option, setOption] = useState({
  //   dataArr: [],
  //   type: "DATE_FILTER",
  //   key: "mtd",
  //   value: "1.C-MTD",
  //   filters: {
  //     customer: "All",
  //     capabilitycode: "All",
  //     owner: "All",
  //   },
  // });


  //API Call
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

  // //Data filter hook
  // useEffect(() => {
  //   console.log(data);
  //   // console.log(isLoading);
  //   // console.log(error);
  //   if (!isLoading) {
  //     let tempTableData = getTableData(data.dashboardarr);
  //     setTableData(tempTableData);
  //     setFiltersData(getFiltersdata(data.dashboardarr));
  //     setOption({ ...option, dataArr: data.dashboardarr });
  //     // console.log(getTableData(data.dashboardarr));
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     let temploginSum = getLoginsummary(
  //       option.dataArr,
  //       option.type,
  //       option.key,
  //       option.value,
  //       option.filters
  //     );

  //     let tempActivitySum = getActivitySummary(
  //       option.dataArr,
  //       option.type,
  //       option.key,
  //       option.value,
  //       option.filters
  //     );
  //     setSummary({
  //       loginSummary: temploginSum,
  //       activitySummary: tempActivitySum,
  //     });
  //   }
  // }, [option]);

  return (
    <div className={styles.container}>
      <Filters
        filtersData={filtersData}
        option={options}
        setOption={setOptions}
      />
      <Myview loading={loading} data={summary} />
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
    accessor: "dailytarget",
  },
  {
    Header: "Today Achievement",
    accessor: "dailyachievement",
  },
  {
    Header: "Monthly Target",
    accessor: "monthlytarget",
  },
  {
    Header: "Monthly Achievement",
    accessor: "monthlyachievement",
  },
];
