import React from "react";
import styles from "./Viewcard.module.scss";

function ViewCard({ title, total, actual }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.d_flex}>
            <div className={styles.value}>
              <div className={styles.value_1}>Total</div>
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

        <div className={styles.title}>{title}</div>
      </div>
      {/* <div className={styles.container}>


      <div className={styles.content}>

      <div className={styles.d_flex}>
       
        <div className={styles.value}>
          <div className={styles.value_1}>Total</div>
          <div className={styles.value_2}>1153</div>
        </div>
        
      </div>

         <div className={styles.d_flex}>
        <div className={styles.value}>
          <div className={styles.value_1}>Actual</div>
          <div className={styles.value_2}>943</div>
        </div>
      </div>
      </div> 

     <div className={styles.title}>Activity Summary</div>
         
    
      </div>
    <div className={styles.container}>


      <div className={styles.content}>

      <div className={styles.d_flex}>
       
        <div className={styles.value}>
          <div className={styles.value_1}>Total</div>
          <div className={styles.value_2}>100%</div>
        </div>
        
      </div>

         <div className={styles.d_flex}>
        <div className={styles.value}>
          <div className={styles.value_1}>Actual</div>
          <div className={styles.value_2}>82%</div>
        </div>
      </div>
      </div> 

     <div className={styles.title}>KAM Performace</div>
         
    
      </div> */}
    </>
  );
}

export default ViewCard;
