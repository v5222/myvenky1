import React, { useEffect } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";

function Myview({ data, loading }) {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className={styles.container}>
        <div className="tvsit-card_carousel">
          <div>
            <div className={styles.d_flex}>
              {loading === true
                ? arr.map((i) => {
                    return <ViewCard title="" total={0} actual={0} key={i} />;
                  })
                : data.map((i, index) => {
                    return (
                      <ViewCard
                        title={i.activityname}
                        total={i.total}
                        actual={i.actual}
                        comments={i.comments}
                        key={index}
                      />
                    );
                  })}
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
