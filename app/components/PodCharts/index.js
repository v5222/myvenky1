import React, { useState, useEffect } from "react";

import ReactStoreIndicator from "react-score-indicator";

const PodCharts = ({ total, completed, title }) => {
  const color = [
    "#23D29B",
    "#23D29B",
    "#23D29B",
    "#23D29B",
    "#23D29B",
    "#23D29B",
    "#23D29B",
    "#23D29B"
  ];
  let percentage;
  if (total === "0" || total === 0 || total === undefined || total === NaN) {
    percentage = "No Data";
  } else {
    percentage = Number((completed / total) * 100).toFixed(1) + "%";
  }
  return (
    <div>
      <div className="tvsit-charts_head">{title}</div>
      <div className="tvsit-charts_percent">{percentage} </div>

      <ReactStoreIndicator
        value={completed}
        maxValue={total}
        stepsColors={color}
        lineGap={0}
        lineWidth={30}
        fadedOpacity={10}
        width={300}
        textStyle={{ fontSize: "20px" }}
      />
    </div>
  );
};

export default PodCharts;
