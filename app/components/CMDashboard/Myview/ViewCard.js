import React from "react";
import styles from "./Viewcard.module.scss";
import conveyor from "../../../images/SVG/conveyor.svg";
import delivered from "../../../images/SVG/devlivered.svg";
import transit from "../../../images/SVG/transit.svg";
function ViewCard() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Modicare</div>
      <div className={styles.content}>
        <div className={styles.d_flex}>
          <div className={styles.icon}>
            <img src={conveyor} alt="total" />
          </div>
          <div className={styles.value}>
            <div className={styles.value_1}>5890</div>
            <div className={styles.value_2}>total</div>
          </div>
        </div>

        <div className={styles.d_flex}>
          <div className={styles.icon}>
            <img src={delivered} alt="delivered" />
          </div>
          <div className={styles.value}>
            <div className={styles.value_1}>5890</div>
            <div className={styles.value_2}>total</div>
          </div>
        </div>

        <div className={styles.d_flex}>
          <div className={styles.icon}>
            <img src={transit} alt="delivered" />
          </div>
          <div className={styles.value}>
            <div className={styles.value_1}>5890</div>
            <div className={styles.value_2}>total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;
