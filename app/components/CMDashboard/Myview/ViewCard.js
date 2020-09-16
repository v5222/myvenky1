import React, { useEffect } from "react";
import styles from "./Viewcard.module.scss";
import conveyor from "../../../images/SVG/conveyor.svg";
import delivered from "../../../images/SVG/delivered.svg";
import transit from "../../../images/SVG/transit.svg";
function ViewCard({ data }) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.d_flex}>
          <div className={styles.icon}>
            <img src={conveyor} className='asdf' alt="total" />
          </div>
          <div className={styles.value}>
            <div className={styles.value_1}>
              {data !== undefined && data.totalinvoiceno !== undefined
                ? data.totalinvoiceno
                : 5890}
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
              {data !== undefined && data.intransit !== undefined
                ? data.intransit
                : 1233}
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
              {data !== undefined && data.delivered !== undefined
                ? data.delivered
                : 3212}
            </div>
            <div className={styles.value_2}>Delivered</div>
          </div>
        </div>
      </div>
      <div className={styles.title}>
        {data !== undefined && data.consignor !== undefined
          ? data.consignor
          : 1233}
      </div>
    </div>
  );
}

export default ViewCard;
