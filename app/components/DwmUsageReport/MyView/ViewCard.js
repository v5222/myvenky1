import React from "react";
import styles from "./Viewcard.module.scss";
import graph from "../../../images/graph.png";

function ViewCard({ title, total, actual, comments }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card_title}>{title}</div>
        <div className={styles.content}>
          <div className={styles.d_flex}>
            <div className={styles.value}>
              <div className={styles.value_1}>Target</div>
              <div className={styles.value_2}>{total}%</div>
            </div>
          </div>
          <div className={styles.d_flex}>
            <div className={styles.value}>
              <div className={styles.value_1}>Actual</div>
              <div className={styles.value_2}>{actual}%</div>
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
          <img src={graph} />
        </div>
      </div>

      {/**========================= */}
    </>
  );
}

export default ViewCard;
