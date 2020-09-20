import moment from "moment";

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
          : i.capabilityname == filters.capabilitycode;
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
          : i.capabilityname == filters.capabilitycode;
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
          : i.capabilityname == filters.capabilitycode;
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
          : i.capabilityname == filters.capabilitycode;
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
  return { total, actual, totalpercent, actualpercent };
};

const getFiltersdata = (array) => {
  const tempcpname = array.map((i) => i.capabilityname);
  const customer = array.map((i) => i.projectname);
  const owner = array.map((i) => i.username);

  const capabilityname = new Set(tempcpname);

  return {
    capabilityname: [...capabilityname],
    customer: [...new Set(customer)],
    owner: [...new Set(owner)],
  };
};

export { getTableData, getLoginsummary, getActivitySummary, getFiltersdata };
