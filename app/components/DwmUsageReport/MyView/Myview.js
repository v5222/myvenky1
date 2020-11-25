import React, { useEffect } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";
import Carousel from "antd/lib/carousel";
import "../../CMDashboard/Myview/flickity.scss";
function Myview({ data, loading, graph }) {
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
                {loading === true || data.length === 0
                  ? arr.slice(0, 3).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(0, 3).map((i, index) => {
                      let graphData = graph.filter(
                        (j) => j.activity === i.activity
                      );
                      return (
                        <ViewCard
                          title={i.activity}
                          total={i.total === null ? 0 : i.total}
                          actual={i.actual === null ? 0 : i.actual}
                          comments={
                            i.comments !== undefined ? i.comments : "NA"
                          }
                          key={index}
                          graphData={graphData}
                        />
                      );
                    })}
              </div>
            </div>

            <div>
              <div className={styles.d_flex}>
                {loading === true || data.length === 0
                  ? arr.slice(0, 3).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(3, 6).map((i, index) => {
                      let graphData = graph.filter(
                        (j) => j.activity === i.activity
                      );
                      return (
                        <ViewCard
                          title={i.activity}
                          total={i.total === null ? 0 : i.total}
                          actual={i.actual === null ? 0 : i.actual}
                          comments={
                            i.comments !== undefined ? i.comments : "NA"
                          }
                          key={index}
                          graphData={graphData}
                        />
                      );
                    })}
              </div>
            </div>
            <div>
              <div className={styles.d_flex}>
                {loading === true || data.length === 0
                  ? arr.slice(0, 3).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(6, 9).map((i, index) => {
                      let graphData = graph.filter(
                        (j) => j.activity === i.activity
                      );
                      return (
                        <ViewCard
                          title={i.activity}
                          total={i.total === null ? 0 : i.total}
                          actual={i.actual === null ? 0 : i.actual}
                          comments={
                            i.comments !== undefined ? i.comments : "NA"
                          }
                          key={index}
                          graphData={graphData}
                        />
                      );
                    })}
              </div>
            </div>
            <div>
              <div className={styles.d_flex}>
                {loading === true || data.length === 0
                  ? arr.slice(0, 3).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(9, 12).map((i, index) => {
                      let graphData = graph.filter(
                        (j) => j.activity === i.activity
                      );
                      return (
                        <ViewCard
                          title={i.activity}
                          total={i.total === null ? 0 : i.total}
                          actual={i.actual === null ? 0 : i.actual}
                          comments={
                            i.comments !== undefined ? i.comments : "NA"
                          }
                          key={index}
                          graphData={graphData}
                        />
                      );
                    })}
              </div>
            </div>
            <div>
              <div className={styles.d_flex}>
                {loading === true || data.length === 0
                  ? arr.slice(0, 3).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(12, 15).map((i, index) => {
                      let graphData = graph.filter(
                        (j) => j.activity === i.activity
                      );
                      return (
                        <ViewCard
                          title={i.activity}
                          total={i.total === null ? 0 : i.total}
                          actual={i.actual === null ? 0 : i.actual}
                          comments={
                            i.comments !== undefined ? i.comments : "NA"
                          }
                          key={index}
                          graphData={graphData}
                        />
                      );
                    })}
              </div>
            </div>
            <div>
              <div className={styles.d_flex}>
                {loading === true || data.length === 0
                  ? arr.slice(0, 3).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(15, 18).map((i, index) => {
                      let graphData = graph.filter(
                        (j) => j.activity === i.activity
                      );
                      return (
                        <ViewCard
                          title={i.activity}
                          total={i.total === null ? 0 : i.total}
                          actual={i.actual === null ? 0 : i.actual}
                          comments={
                            i.comments !== undefined ? i.comments : "NA"
                          }
                          key={index}
                          graphData={graphData}
                        />
                      );
                    })}
              </div>
            </div>
            <div>
              <div className={styles.d_flex}>
                {loading === true || data.length === 0
                  ? arr.slice(0, 3).map((i) => {
                      return <ViewCard title="" total={0} actual={0} key={i} />;
                    })
                  : data.slice(18, 21).map((i, index) => {
                      let graphData = graph.filter(
                        (j) => j.activity === i.activity
                      );
                      return (
                        <ViewCard
                          title={i.activity}
                          total={i.total === null ? 0 : i.total}
                          actual={i.actual === null ? 0 : i.actual}
                          comments={
                            i.comments !== undefined ? i.comments : "NA"
                          }
                          key={index}
                          graphData={graphData}
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
        {loading === true || data.length === 0
          ? arr.map((i) => {
              return <ViewCard title="" total={0} actual={0} key={i} />;
            })
          : data.map((i, index) => {
              let graphData = graph.filter((j) => j.activity === i.activity);
              return (
                <ViewCard
                  title={i.activity}
                  total={i.total === null ? 0 : i.total}
                  actual={i.actual === null ? 0 : i.actual}
                  comments={i.comments !== undefined ? i.comments : "NA"}
                  key={index}
                  graphData={graphData}
                />
              );
            })}
      </div>
    </>
  );
}

export default Myview;
