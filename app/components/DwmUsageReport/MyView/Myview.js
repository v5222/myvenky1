import React, { useEffect } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";

function Myview() {

  return (
    <>
      
        <div className={styles.container}>
        <div className="tvsit-card_carousel">
            <div>
              <div className={styles.d_flex}>
              <ViewCard />
                </div>
              </div>
              
          </div>
        </div>
              

     {/* mobile device container */}

      <div className={styles.mob_container}>

      <ViewCard />
      <ViewCard />
      <ViewCard />
      <ViewCard />
      <ViewCard />
     
     

      </div>
     
    </>
  );
}

export default Myview;
