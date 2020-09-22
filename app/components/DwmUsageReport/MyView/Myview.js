import React, { useEffect } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";
import Carousel from "antd/lib/carousel";
import "../../CMDashboard/Myview/flickity.scss";
function Myview({ data, loading }) {
  const arr = [1, 2, 3, 4, 5, 6];
  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  return (
    <>
      <div className={styles.container}>
        <div className="tvsit-card_carousel">
          <Carousel afterChange={onChange} dots={styles.dots}>
            <div>
              <div className={styles.d_flex}>
                {loading === true
                  ? arr.map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(0, 6).map((i, index) => {
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

            <div>
              <div className={styles.d_flex}>
                {loading === true
                  ? arr.slice(0, 6).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(6, 12).map((i, index) => {
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
            <div>
              <div className={styles.d_flex}>
                {loading === true
                  ? arr.slice(0, 6).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(12, 18).map((i, index) => {
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
            <div>
              <div className={styles.d_flex}>
                {loading === true
                  ? arr.slice(0, 6).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(18, data.length).map((i, index) => {
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
          </Carousel>
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
