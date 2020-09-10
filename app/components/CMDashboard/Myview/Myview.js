import React, { useEffect } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";
import Flickity from "react-flickity-component";
import "./flickity.scss";
import Carousel from "antd/lib/carousel";
import Preference from "../Preferences";

const flickityOptions = {
  initialIndex: 0,
  wrapAround: false,
  setGallerySize: true,
  cellAlign: "left",
  contain: true,
};

function Myview() {
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <>
      
         {/* <div className={styles.d_flex}>
            <div className={styles.title}>My View</div>
          <Preference />
            </div> */}

        {/* <Flickity
          className={"carousel"} // default ''
          elementType={"div"} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
        >
          <div className={styles.d_flex}>
            <ViewCard />
            <ViewCard />
            <ViewCard />
          </div>

          <div className={styles.d_flex}>
            <ViewCard />
            <ViewCard />
            <ViewCard />
          </div>

          <div className={styles.d_flex}>
            <ViewCard />
            <ViewCard />
            <ViewCard />
          </div>
         
        </Flickity> */}
        <div className={styles.container}>
        <div className="tvsit-card_carousel">
          <Carousel afterChange={onChange} dots={styles.dots}>
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
