import moment from "moment";
import { apiURLDwm } from "containers/App/services.js";
import _ from "lodash";
const activitynameArr = [
  "Attendance >94% available",
  "Safety Incident /Accident",
  "Transit Damages/ODCs",
  "TAT Adherence/Window Time Adherence",
  "Handling Damage",
  "MHE Availability",
  "Nil Safety Incidents/Accidents /Breakdown of trucks",
  "FIFO/Customer Rejection/Held up stock Clearance",
  "Ontime MIS report to Customer on time - Daily/Monthly",
  "Transit Damages/ODCs",
  "Part Shortage for day",
  "GRN Error/Pending",
  "Putaway Pendency >48 Hrs",
  "PIV Completed",
  "Line stoppage due to MHE",
  "Preventive Maintenance (PM - W/O)",
  "All MHE to have daily check list",
  "Breakdown status of MHE",
  "Service to Billing Adherence & payment follow ups",
  "Closure of debit threat",
  "Vehicle Utilisation-Consolidation Inbound/Outbound",
  "Training And awareness program Plan and Status review",
  "FIFO/Customer Rejection/Held up stock Clearance",
  "PPE Adherence",
  "Transit time adherence (MR-Window time / LH - Transit time)",
];
const getSummary = (array, filters) => {
  let newData = [];
  let prev = [];

  array.forEach((item) => {
    let tempCust =
      filters.customer === "All" ? true : item.projectname == filters.customer;
    let tempCap =
      filters.capabilitycode === "All"
        ? true
        : item.capabilitycode == filters.capabilitycode;
    let tempOwn =
      filters.owner === "All" ? true : item.username == filters.owner;

    let tempTotal =
      item.targetvalues === null
        ? item.targetnorms !== null
          ? item.targetnorms
          : 0
        : parseInt(item.targetvalues);
    let tempActual = item.actual === null ? 0 : parseInt(item.actual);
    if (activitynameArr.includes(item.activityname)) {
      if (!prev.includes(item.activityname)) {
        if (tempCust && tempCap && tempOwn) {
          if (
            moment(item.date).format("DD-MM-YYYY") ===
            moment().format("DD-MM-YYYY")
          ) {
            if (filters.owner !== "All") {
              newData.push({
                activityname: item.activityname,
                total: tempTotal,
                actual: tempActual,
                comments: item.comments,
              });
            } else {
              newData.push({
                activityname: item.activityname,
                total: tempTotal,
                actual: tempActual,
                comments: "NA",
              });
            }
          } else {
            newData.push({
              activityname: item.activityname,
              total: 0,
              actual: 0,
              comments: "NA",
            });
          }
        } else {
          newData.push({
            activityname: item.activityname,
            total: 0,
            actual: 0,
            comments: "NA",
          });
        }

        prev.push(item.activityname);
      } else {
        newData = newData.filter((i) => {
          if (i.activityname === item.activityname) {
            if (tempCust && tempCap && tempOwn) {
              if (
                moment(item.date).format("DD-MM-YYYY") ===
                moment().format("DD-MM-YYYY")
              ) {
                if (filters.owner !== "All") {
                  i.total = parseInt(i.total) + tempTotal;
                  i.actual = parseInt(i.actual) + tempActual;
                  i.comments = item.comments;
                } else {
                  i.total = parseInt(i.total) + tempTotal;
                  i.actual = parseInt(i.actual) + tempActual;
                }
              }
            }
          }

          return true;
        });
      }
    }
  });
  return newData;
};

const getFiltersdata = async ( value, callback) => {
  console.log(value);
  let sdate;
  let edate;
  // let capabilityname = [];
  // let customer = [];
  // let owner = [];
  switch (value.filterdate) {
    case "MTD":
      sdate = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      edate = moment()
        .endOf("month")
        .format("YYYY-MM-DD");
      break;
    case "WTD":
      sdate = moment()
        .startOf("week")
        .format("YYYY-MM-DD");
      edate = moment()
        .endOf("week")
        .format("YYYY-MM-DD");
      break;
    case "YTD":
      sdate = moment()
        .startOf("year")
        .format("YYYY-MM-DD");
      edate = moment()
        .endOf("year")
        .format("YYYY-MM-DD");
      break;
    case "FTD":
      sdate = moment().format("YYYY-MM-DD");
      edate = moment().format("YYYY-MM-DD");
      break;
    default:
      sdate = moment(value.sdate).format("YYYY-MM-DD");
      edate = moment(value.edate).format("YYYY-MM-DD");
      break;
  }
  let options = {
    method: "POST",
    body: JSON.stringify({
      body: {
        type: "FILTERS",
        sdate:value.sdate,
        edate:value.edate,
        filterdate:value.filterdate,
        customer: value.customer,
        capabilitycode: value.capabilitycode,
        owner: value.owner,
      },
    }),
  };
  fetch(apiURLDwm, options)
    .then((res) => res.json())
    .then((data) => {
      const { capability, ownername, customername } = data.body.bodymsg;
      console.log(data);
      callback({
        capabilityname: capability !== undefined ? capability : [],
        owner: ownername !== undefined ? ownername : [],
        customer: customername !== undefined ? customername : [],
      });
      
    });
  
};


const getTableData = (array, type, key, filters) => {
  let newArr = [];
  if (type === "DATE_PICKER") {
    array.map((item) => {
      let tempCust =
        filters.customer === "All"
          ? true
          : item.projectname == filters.customer;
      let tempCap =
        filters.capabilitycode === "All"
          ? true
          : item.capabilitycode == filters.capabilitycode;
      let tempOwn =
        filters.owner === "All" ? true : item.username == filters.owner;
      if (
        moment(i.date).format("YYYY-MM-DD") >=
          moment(key.from).format("YYYY-MM-DD") &&
        moment(i.date).format("YYYY-MM-DD") <=
          moment(key.to).format("YYYY-MM-DD")
      ) {
        if (tempCust && tempCap && tempOwn) {
          newArr.push(item);
        }
      }
    });
  }
  if (type === "DATE_FILTER") {
    array.map((item) => {
      let datetype =
        key === "mtd"
          ? moment()
              .startOf("month")
              .format("YYYY-MM-DD")
          : key === "ftd"
          ? moment().format("YYYY-MM-DD")
          : key === "ytdc"
          ? moment()
              .startOf("year")
              .format("YYYY-MM-DD")
          : moment()
              .startOf("week")
              .format("YYYY-MM-DD");

      let tempCust =
        filters.customer === "All"
          ? true
          : item.projectname == filters.customer;
      let tempCap =
        filters.capabilitycode === "All"
          ? true
          : item.capabilitycode == filters.capabilitycode;
      let tempOwn =
        filters.owner === "All" ? true : item.username == filters.owner;
      if (moment(item.date).format("YYYY-MM-DD") >= datetype) {
        if (tempCust && tempCap && tempOwn) {
          newArr.push(item);
        }
      }
    });
  }
  return newArr;
};

const maxRefresDate = (array) => {
  console.log(array);
  let maxdate = {
    date: moment().format("YYYY-MM-DD"),
  };
  if (array.length > 0) {
    maxdate = _.maxBy(array, (i) => moment(i.reportdate).format("YYYY-MM-DD"));
  }

  return maxdate.date;
};
export { getSummary, getFiltersdata, getTableData, maxRefresDate };
