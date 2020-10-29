import moment from "moment";
import { apiURLDwm } from "containers/App/services.js";
const getTableData = (array) => {
  let newData = [];
  let prev = [];
  array.forEach((item) => {
    let tempItem = item.username;

    if (!prev.includes(tempItem)) {
      newData.push({
        capabilitycode: item.capabilitycode,
        projectname: item.projectname,
        username: item.username,
        todayTarget: item.ftd === "1.C-FTD" ? item.budgetnew : 0,
        todayAch: item.ftd === "1.C-FTD" ? item.actualnew : 0,
        monthlyTarget: item.budgetnew,
        monthlyAch: item.actualnew,
      });
      prev.push(tempItem);
    } else {
      newData = newData.filter((i) => {
        if (i.username === item.username) {
          if (item.ftd === "1.C-FTD") {
            i.todayTarget = item.budgetnew;
            i.todayAch = item.actualnew;
          }
          if (item.mtd === "1.C-MTD") {
            i.monthlyTarget =
              parseInt(i.monthlyTarget) + parseInt(item.budgetnew);
            i.monthlyAch = parseInt(i.monthlyAch) + parseInt(item.actualnew);
          }
        }
        return true;
      });
    }
  });
  return newData;
};

const getLoginsummary = (array, type, key, value, filters) => {
  let total = 0;
  let actual = 0;
  if (type === "DATE_PICKER") {
    array.forEach((i) => {
      let tempCust =
        filters.customer === "All" ? true : i.projectname == filters.customer;
      let tempCap =
        filters.capabilitycode === "All"
          ? true
          : i.capabilitycode == filters.capabilitycode;
      let tempOwn =
        filters.owner === "All" ? true : i.username == filters.owner;
      if (
        moment(i.date).format("DD,MM,YYYY") >=
          moment(key.from).format("DD,MM,YYYY") &&
        moment(i.date).format("DD,MM,YYYY") <=
          moment(key.to).format("DD,MM,YYYY") &&
        i.budgetnew > 0
      ) {
        if (tempCust && tempCap && tempOwn) {
          total = total + 1;
        }
      }
      if (
        moment(i.date).format("DD,MM,YYYY") >=
          moment(key.from).format("DD,MM,YYYY") &&
        moment(i.date).format("DD,MM,YYYY") <=
          moment(key.to).format("DD,MM,YYYY") &&
        i.budgetnew > 0 &&
        i.actualnew > 0
      ) {
        if (tempCust && tempCap && tempOwn) {
          actual = actual + 1;
        }
      }
    });
  }
  if (type === "DATE_FILTER") {
    array.forEach((i) => {
      let tempCust =
        filters.customer === "All" ? true : i.projectname == filters.customer;
      let tempCap =
        filters.capabilitycode === "All"
          ? true
          : i.capabilitycode == filters.capabilitycode;
      let tempOwn =
        filters.owner === "All" ? true : i.username == filters.owner;
      if (i[key] === value && i.budgetnew > 0) {
        if (tempCust && tempCap && tempOwn) {
          total = total + 1;
        }
      }
      if (i[key] === value && i.budgetnew > 0 && i.actualnew > 0) {
        if (tempCust && tempCap && tempOwn) {
          actual = actual + 1;
        }
      }
    });
  }

  return { total, actual };
};

const getActivitySummary = (array, type, key, value, filters) => {
  let total = 0;
  let actual = 0;

  if (type === "DATE_PICKER") {
    array.forEach((i) => {
      let tempCust =
        filters.customer === "All" ? true : i.projectname == filters.customer;
      let tempCap =
        filters.capabilitycode === "All"
          ? true
          : i.capabilitycode == filters.capabilitycode;
      let tempOwn =
        filters.owner === "All" ? true : i.username == filters.owner;

      if (
        moment(i.date).format("DD,MM,YYYY") >=
          moment(key.from).format("DD,MM,YYYY") &&
        moment(i.date).format("DD,MM,YYYY") <=
          moment(key.to).format("DD,MM,YYYY")
      ) {
        if (tempCust && tempCap && tempOwn) {
          // console.log("entered");
          total += parseInt(i.budgetnew);
          actual += parseInt(i.actualnew);
        }
      }
    });
  }
  if (type === "DATE_FILTER") {
    array.forEach((i) => {
      let tempCust =
        filters.customer === "All" ? true : i.projectname == filters.customer;
      let tempCap =
        filters.capabilitycode === "All"
          ? true
          : i.capabilitycode == filters.capabilitycode;
      let tempOwn =
        filters.owner === "All" ? true : i.username == filters.owner;

      if (i[key] === value) {
        if (tempCust && tempCap && tempOwn) {
          total += parseInt(i.budgetnew);
          actual += parseInt(i.actualnew);
        }
      }
    });
  }
  let totalpercent = "100%";
  let actualpercent = Math.round((actual / total) * 100) + "%";
  return {
    total,
    actual,
    totalpercent,
    actualpercent: actualpercent === "NaN%" ? "0%" : actualpercent,
  };
};

// const getFiltersdata = (array) => {
//   const tempcpname = array.map((i) => i.capabilitycode);
//   const customer = array.map((i) => i.projectname);
//   const owner = array.map((i) => i.username);

//   const capabilityname = new Set(tempcpname);

//   return {
//     capabilityname: [...capabilityname],
//     customer: [...new Set(customer)],
//     owner: [...new Set(owner)],
//   };
// };
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

export { getTableData, getLoginsummary, getActivitySummary, getFiltersdata };
