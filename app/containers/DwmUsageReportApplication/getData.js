import moment from "moment";
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

        prev.push(item.activityname);
      } else {
        newData = newData.filter((i) => {
          if (i.activityname === item.activityname) {
            if (tempCust && tempCap && tempOwn) {
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

          return true;
        });
      }
    }
  });
  return newData;
};

const getFiltersdata = (array) => {
  const tempcpname = array.map((i) => {
    // if (activitynameArr.includes(i.activityname)) {
    //   return i.capabilitycode;
    // }
    return i.capabilitycode;
  });
  const customer = array.map((i) => {
    // if (activitynameArr.includes(i.activityname)) {
    //   return i.projectname;
    // }
    return i.projectname;
  });
  const owner = array.map((i) => {
    // if (activitynameArr.includes(i.activityname)) {
    //   return i.username;
    // }
    return i.username;
  });

  const capabilityname = new Set(tempcpname);

  return {
    capabilityname: [...capabilityname],
    customer: [...new Set(customer)],
    owner: [...new Set(owner)],
  };
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
        moment(i.date).format("DD,MM,YYYY") >=
          moment(key.from).format("DD,MM,YYYY") &&
        moment(i.date).format("DD,MM,YYYY") <=
          moment(key.to).format("DD,MM,YYYY")
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
              .format("DD,MM,YYYY")
          : key === "ftd"
          ? moment()
              .startOf("day")
              .format("DD,MM,YYYY")
          : key === "ytdc"
          ? moment()
              .startOf("year")
              .format("DD,MM,YYYY")
          : moment()
              .startOf("week")
              .format("DD,MM,YYYY");

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
      if (item.date >= datetype) {
        if (tempCust && tempCap && tempOwn) {
          newArr.push(item);
        }
      }
    });
  }
  return newArr;
};
export { getSummary, getFiltersdata, getTableData };
