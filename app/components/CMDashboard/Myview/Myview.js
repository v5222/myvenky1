import React, { useEffect, useState } from "react";
import styles from "./Myview.module.scss";
import ViewCard from "./ViewCard";
import "./flickity.scss";
import Carousel from "antd/lib/carousel";
import { apiURLCourier } from "../../../containers/App/services";

function Myview({usertype,otpLogIn}) {
  const [data, setData] = useState([]);
  const [count,setCount] = useState ([])
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const fetchData = () => {
    var myHeaders = new Headers();
    let options = {
      ecode: "KARSHA01",
      type: "FILTER-1",
      customer: "All",
      location: "All",
      status: "All",
      filterdate: "DATE",
      sdate: "2020-06-02",
      edate: "2020-08-31",
    }
    if(otpLogIn && usertype !== "TVSUSER"){
      options = {
            "type": "CARDS-FILTER",
            "consignor": usertype
        }
      }
    myHeaders.append("Content-Type", "application/json");
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({
        body: options,
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
        if(statuscode === 200){
          setData(bodymsg)
          setCount( new Array(Math.round(bodymsg.length/3)+1).fill(0))
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  // "consignor": "Modicare",
  // "origin": "Agartala DWH",
  // "deliveredcount": "0",
  // "undeliveredcount": "0",
  // "intransit": "0"

  // "origin": "JOHNSON CONTROLS HITACHI",
  // "location": "2",
  // "invoicecount": "13",
  // "deliveredcount": "11",
  // "undeliveredcount": "0",
  // "intransit": "0"
  return (
    <>
      <div className={styles.container}>
        <div className="tvsit-card_carousel">
          <Carousel afterChange={onChange} dots={styles.dots}>
            {count.map((i,index) =>{
              return (
                <>
                {index === 0 ? (
                  <div>
                  <div className={styles.d_flex}>
                    {data.slice(0,3).map(i=>{
                      return (
                        <>
                       <ViewCard 
                          origin = {i.origin}
                          totalinvoice ={i.invoicecount}
                          delivered ={i.deliveredcount}
                          intransit= {i.intransit}
                          
                        /> </>
                      )
                    })}    
                  </div>
                </div>
                ):(
                  <div>
              <div className={styles.d_flex}>
                {data.slice(index*3,(index+1)*3).map(i=>{
                  return (
                    <>
                   <ViewCard 
                      origin = {i.origin}
                      totalinvoice ={i.invoicecount}
                      delivered ={i.deliveredcount}
                      intransit= {i.intransit}
                      
                    /> </>
                  )
                })}    
              </div>
            </div>
                )}
              
                </>
              )
            })}
          {/* <div>
              <div className={styles.d_flex}>
                {data.slice(0,3).map(i=>{
                  return (
                    <>
                   <ViewCard 
                      origin = {i.origin}
                      totalinvoice ={i.invoicecount}
                      delivered ={i.deliveredcount}
                      intransit= {i.intransit}
                      
                    /> </>
                  )
                })}    
              </div>
            </div>
            <div>
            <div className={styles.d_flex}>
                {data.slice(3,6).map(i=>{
                  return (
                    <>
                   <ViewCard 
                      origin = {i.origin}
                      totalinvoice ={i.invoicecount}
                      delivered ={i.deliveredcount}
                      intransit= {i.intransit}
                      
                    /> </>
                  )
                })}    
              </div>
            </div>
            <div>
            <div className={styles.d_flex}>
                {data.slice(6,9).map(i=>{
                  return (
                    <>
                   <ViewCard 
                      origin = {i.origin}
                      totalinvoice ={i.invoicecount}
                      delivered ={i.deliveredcount}
                      intransit= {i.intransit}
                      
                    /> </>
                  )
                })}    
              </div>
            </div> */}
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
