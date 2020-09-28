import React, { useEffect, useState } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";
import "./flickity.scss";
import Carousel from "antd/lib/carousel";
import { apiURLCourier } from "../../../containers/App/services";

function Myview() {
  const [data, setData] = useState([]);
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const fetchData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          ecode: "KARSHA01",
          type: "FILTER-1",
          customer: "All",
          location: "All",
          status: "All",
          filterdate: "DATE",
          sdate: "2020-06-02",
          edate: "2020-08-31",
        },
      }),
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(apiURLCourier, bodyoption)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "from views");
        const { bodymsg } = data.body;
        const { statuscode } = data.body;
        statuscode === 201 ? setData([]) : setData(bodymsg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className="tvsit-card_carousel">
          <Carousel afterChange={onChange} dots={styles.dots}>
            <div>
              <div className={styles.d_flex}>
                <ViewCard data={data[0]} />
                <ViewCard data={data[1]} />
                <ViewCard data={data[0]} />
              </div>
            </div>
            <div>
              <div className={styles.d_flex}>
                <ViewCard />
                <ViewCard />
                <ViewCard />
              </div>
            </div>
            <div>
              <div className={styles.d_flex}>
                <ViewCard />
                <ViewCard />
                <ViewCard />
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
