import React, { useEffect, useState } from "react";
import { getTableData } from "../DwmApplication/getTableData";
import { apiURLDwm, dwmBody } from "containers/App/services";
import { useQuery, useMutation, useQueryCache } from "react-query";
function TestPage() {
  const cache = useQueryCache();
  const { isLoading, error, data } = useQuery("dwmdata", () => {
    let options = {
      method: "POST",
      body: JSON.stringify(dwmBody),
    };
    return fetch(apiURLDwm, options)
      .then((res) => res.json())
      .then((data) => data.body.bodymsg);
  });
  useEffect(() => {
    // console.log(data);
    // console.log(isLoading);
    // console.log(error);
    if (data !== undefined) {
      console.log(getTableData(data.dashboardarr));
    }
  }, [data]);
  return (
    <div>
      {data !== undefined &&
        data.dashboardarr.map((i, index) => {
          return (
            <>
              <div>{i.projectname}</div>
              <div>{i.entityname}</div>
              <div>{i.ftd}</div>
              <div>{i.mtd}</div>
              <div>{i.budgetnew}</div>
              <div>{i.actualnew}</div>
              <div>{i.username}</div>
            </>
          );
        })}
    </div>
  );
}

export default TestPage;
