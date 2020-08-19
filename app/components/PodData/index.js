import React from "react";

function PodData({ title1, title2, total, completed, title3 }) {
  let percentage;
  if (total === "0" || total === 0 || total === undefined || total === NaN) {
    percentage = "No Data";
  } else {
    percentage = Number((completed / total) * 100).toFixed(1) + "%";
  }
  return (
    <div className="tvsit-poddata">
      <div className="tvsit-poddata_container">
        <div className="tvsit-poddata_wrapper">
          <div className="tvsit-poddata_data">{total}</div>
          <div className="tvsit-poddata_title">{title1}</div>
        </div>
        {/* <div className="tvsit-poddata_vrline" /> */}
        <div className="tvsit-poddata_wrapper">
          <div className="tvsit-poddata_data">{completed}</div>
          <div className="tvsit-poddata_title">{title2}</div>
        </div>
      </div>
      <div className="tvsit-poddata_percentage">
        <div className="tvsit-poddata_percentage-value">{percentage}</div>
        {/* <div className="tvsit-poddata_title">{title3}</div> */}
      </div>
    </div>
  );
}

export default PodData;
