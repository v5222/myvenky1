import React, { useState, useEffect } from "react";
import styles from "./CMCTcontent.module.scss";
import Empty from "antd/lib/empty";
import EmptyImg from "../../../images/SVG/empty.svg";
import Steps from "antd/lib/steps";

const { Step } = Steps;
function Content() {
  const [isdata, setData] = useState(true);
  const data = {
    courierkey: 218494,
    date: "2020-08-05T00:00:00.000Z",
    documentno: "140464",
    documentcode: null,
    invoiceno: "QLV034966",
    invoicedate: "2020-07-15T00:00:00.000Z",
    consignor: "Modicare",
    consignee: "SUSHMA MAYANGLAMBAM",
    consignorpincode: "781035",
    consigneepincode: "795001",
    origin: "Guwahati DWH",
    destination: "IMPHAL WEST",
    district: null,
    zone: "E",
    boxes: null,
    weightinkgs: 8.735,
    surface: null,
    transittime: 72,
    oda: null,
    nonoda: null,
    pickuptime: null,
    deliveredtime: null,
    estimatedeliverydate: "2020-08-08T00:00:00.000Z",
    actualdeliverydate: null,
    delaykey: "Containment Zone",
    deliverylevel: null,
    status: "NOT YET RECEIVED AT INCITY IMPHAL",
    delayreason: null,
    couriername: "CONNECT EXPRESS",
    address1: "IMPHAL WEST",
    address2: "IMPHAL WEST",
    address3: "IMPHAL WEST",
    state: "IMPHAL WEST",
    phonenumber: "7005705216",
    vendormailid: "ithoiba.p@nosegay.co.in, lukhendro.k@nosegay.co.in",
    filename: "2020_08_07_17_50_Connect Express Pendency_NOSEGAY.xlsx",
    projectkey: "2",
    futurecolumn2: null,
    futurecolumn3: null,
    futurecolumn4: null,
    isactive: true,
    createdby: 77,
    createtimestamp: "2020-08-07T17:50:03.187Z",
    updatedby: null,
    updatedtimestamp: null,
  };

  return (
    <div className={styles.wrapper}>
      {!isdata ? (
        <Empty
          image={EmptyImg}
          className={styles.empty}
          description={
            <span className={styles.emptytext}>
              No Data to Display ,please enter invoice number/ document number
            </span>
          }
        />
      ) : (
        <div className={styles.container}>
          {/* <div className={styles.steps}>
            <Steps>
              <Step status="finish" title="Pickup" description="15-07-2020" />
              <Step title="In Transit" status="finish" description="72 Days" />
              <Step
                status="wait"
                title="Est.Delivery date"
                description="08-08-2020"
              />
            </Steps>
          </div>
          <div className={styles.content}>
            <div className={styles.content_wrapper}>
              <div className={styles.content_title}>Doc Number</div>
              <div className={styles.content_value}>{data.documentno}</div>
            </div>
           
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Content;
