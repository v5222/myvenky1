import React, { useEffect } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";
import { apiURLDwm } from "../../../containers/App/services";

function Myview({ loading, data }) {
  return (
    <>
      <div className={styles.container}>
        <div className="tvsit-card_carousel">
          <div>
            <div className={styles.d_flex}>
              <ViewCard
                title={"Login Summary"}
                total={data.loginSummary.total === null ? 0 : data.loginSummary.total}
                actual={data.loginSummary.actual === null ? 0 : data.loginSummary.actual}
                loading={loading}
              />
              <ViewCard
                title={"Activity Summary"}
                total={data.activitySummary.total === null ? 0 :data.activitySummary.total}
                actual={data.activitySummary.actual === null ? 0 :data.activitySummary.actual}
                loading={loading}
              />
              <ViewCard
                title={"KAM Performance"}
                total={data.activitySummary.totalpercent  === null ? 0 : data.activitySummary.totalpercent}
                actual={data.activitySummary.actualpercent  === null ? 0 : data.activitySummary.actualpercent}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* mobile device container */}

      <div className={styles.mob_container}>
      <ViewCard
      title={"Login Summary"}
      total={data.loginSummary.total}
      actual={data.loginSummary.actual}
      loading={loading}
    />
    <ViewCard
      title={"Activity Summary"}
      total={data.activitySummary.total}
      actual={data.activitySummary.actual}
      loading={loading}
    />
    <ViewCard
      title={"KAM Performance"}
      total={data.activitySummary.totalpercent}
      actual={data.activitySummary.actualpercent}
      loading={loading}
    />
      </div>
    </>
  );
}

export default Myview;
