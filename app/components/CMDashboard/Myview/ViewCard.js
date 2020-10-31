import React, { useEffect } from "react";
import styles from "./Viewcard.module.scss";
import conveyor from "../../../images/SVG/conveyor.svg";
import delivered from "../../../images/SVG/delivered.svg";
import transit from "../../../images/SVG/transit.svg";
import nFormatter from "utils/helpers/numberFormator";
function ViewCard({ totalinvoice,delivered,intransit,origin }) {
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.d_flex}>
          <div className={styles.icon}>
            <img src={conveyor} className="asdf" alt="total" />
          </div>
          <div className={styles.value}>
            <div className={styles.value_1}>
              {totalinvoice 
                ? nFormatter(totalinvoice)
                : 0}
            </div>
            <div className={styles.value_2}>Total</div>
          </div>
        </div>

        <div className={styles.d_flex}>
          <div className={styles.icon}>
            <img src={transit} alt="delivered" />
          </div>
          <div className={styles.value}>
            <div className={styles.value_1}>
              {intransit 
                ? nFormatter(intransit)
                : 0}
            </div>
            <div className={styles.value_2}>InTransit</div>
          </div>
        </div>

        <div className={styles.d_flex}>
          <div className={styles.icon}>
            <img src={delivered} alt="delivered" />
          </div>
          <div className={styles.value}>
            <div className={styles.value_1}>
              {delivered
                ? nFormatter(delivered)
                : 0}
            </div>
            <div className={styles.value_2}>Delivered</div>
          </div>
        </div>
      </div>
      <div className={styles.title}>
        {origin
          ? origin
          : ""}
      </div>
    </div>
  );
}

export default ViewCard;
