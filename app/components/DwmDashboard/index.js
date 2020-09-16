import React from "react";
import styles from "./Dwmdashboard.module.scss";
import Filters from "./Filters";
import Myview from "../DwmDashboard/MyView/Myview";
import Table from "../DwmDashboard/Table";
import { apiURLDwm } from "../../containers/App/services";

function DwmDashboard() {

  // // Hooks  starts here //
  // const [tableData, setTableData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [columns, setColumns] = useState(cloumns1);
  // const [dates, setDates] = useState({
  //   sdate: "2020-06-02",
  //   edate: "2020-08-31",
  // });
  // // hooks ends here //

  // const fetchData = (values) => {
  //   console.log(apiURLDwm, values);
  //   setLoading(true);
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   let bodyoption = {
  //     method: "POST",
  //     body: JSON.stringify({ body: values }),
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   fetch(apiURLDwm, bodyoption)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       const { bodymsg } = data.body;
  //       const { statuscode } = data.body;
  //       if (statuscode === 201) {
  //         setTableData([]);
  //       } else {
  //         setTableData(bodymsg);
  //         setDates({ edate: values.edate, sdate: values.sdate });
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   if (filtersOn === true) {
  //     setColumns(column2);
  //   }
  // }, [filtersOn]);


  return (
    <div className={styles.container}>
      <Filters />
      <Myview />
      <Table />
    </div>
  );
}

export default DwmDashboard;
