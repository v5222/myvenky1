import React, { useEffect, useState } from "react";
import styles from "./Viewcard.module.scss";
import graph from "../../../images/graph.png";
import { MiniBar } from "ant-design-pro/lib/Charts";
import moment from "moment";
function ViewCard({ title, total, actual, comments, graphData }) {
  const [visitData, setVisitData] = useState([]);
  const beginDay = new Date().getTime();
  useEffect(() => {
    if (graphData != undefined) {
      let temp = graphData.map((i) => {
        return {
          x: moment(i.date).format("YYYY-MM-DD"),
          y: i.actual,
        };
      });
      setVisitData(temp);
    }
  }, [graphData]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card_title}>{title}</div>
        <div className={styles.content}>
          <div className={styles.d_flex}>
            <div className={styles.value}>
              <div className={styles.value_1}>Target</div>
              <div className={styles.value_2}>{total}</div>
            </div>
          </div>
          <div className={styles.d_flex}>
            <div className={styles.value}>
              <div className={styles.value_1}>Actual</div>
              <div className={styles.value_2}>{actual}</div>
            </div>
          </div>
        </div>
        {comments !== "NA" ? (
          <>
            <div className={styles.reason}>Reason</div>
            <div className={styles.comment}>{comments}</div>
          </>
        ) : (
          <>
            <div className={styles.reason}>Reason</div>
            <div className={styles.comment}>Not Applicable</div>
          </>
        )}
        <div className={styles.graph}>
          {/* <img src={graph} /> */}
          <MiniBar height={70} data={visitData} />
        </div>
      </div>

      {/**========================= */}
    </>
  );
}

export default ViewCard;
