import React, { Component } from "react";
import styles from "./label.module.scss";
import ReactBarcode from "react-barcode";
import Logo from "../../images/logo-full.png";
import moment from "moment";

export default class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const details = this.props.data[0];

    // const details = dataItems[0];
    // console.log(this.state.dataItems[0].barcode);

    return (
      <>
        <div className={styles.container}>
          <section className={styles.topLabel}>
            <div>
              <img
                src={Logo}
                style={{
                  height: "70px",
                  marginRight: "5px",
                }}
              />
            </div>
            <div className={styles.cmpAddr}>
              <div className={styles.cmpName}>
                TVS Supply Chain Solution Limited
              </div>
              <div className={styles.tag}>
                (formerly known as TVS logistics)
              </div>
            </div>
          </section>
          <section className={styles.wrapper_2}>
            <div className={styles.barcode}>
              <ReactBarcode
                value={details.barcode}
                height={60}
                width={2}
                fontSize={15}
              />
              <div className={styles.surface}>
                <div className={styles.content}>SUR</div>
                <div className={styles.content}>{details.partweight}</div>
                <div className={styles.content} />
                <div className={styles.content}>15/11</div>
                <div className={styles.content}>Prepaid</div>
              </div>
              <div className={styles.shipping}>
                <div className={styles.title}>Ship to : </div>
                <div className={styles.info}>
                  <div>{details.consigneename} </div>
                  <div>
                    {details.consigneeaddress + ": " + details.consigneezipcode}
                  </div>
                  {/* <div>{details.consigneecity}</div> */}
                  {/* <div>{details.consigneezipcode}</div> */}
                  <div>{details.consigneecontactno}</div>
                  <div>INDIA</div>
                </div>
              </div>
            </div>
          </section>
          {/* <hr /> */}
          {/* <section className={styles.wrapper_3}>
            <div className={styles.title}>
              <strong> Shipped By:</strong> TVS Seller Services Pvt Ltd, Return
              Address:
            </div>
            <div>
              TCI Supply Chain Solutions Near Kahpri Village, MADC Near Kahpri
              Village, MADC Nagpur Maharastra 441108, India{" "}
            </div>
            <div />
          </section> */}
          <hr />
          <section className={styles.wrapper_4}>
            <div>
              <strong> Customer Self Decalaration:</strong> The good sold are
              intended for end user consumption. Not for resale
            </div>
          </section>
          <hr />
          <section className={styles.wrapper_5}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>SELLER</th>
                  <th>GSTIN</th>
                  <th>INVOICE</th>
                  <th>DATE</th>
                  <th>ITEM TYPE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{details.customername}</td>
                  <td> 27AAAZId456</td>
                  <td>{details.documentno}</td>
                  <td>{moment(details.documentdate).format("DD-MM-YYYY")}</td>
                  <td>{details.partdescription}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className={styles.wrapper_6}>
            <div className={styles.routecode}>
              <h1>NAG1</h1>
            </div>
            <div className={styles.routecode}>
              <h1>NAG1</h1>
              <h1>
                <mark>0</mark>015
              </h1>
            </div>
            <div className={styles.routecode}>
              {" "}
              <h1>NAG1</h1>
              <h1>
                <mark>D</mark>015
              </h1>
            </div>
            <div className={styles.routecode}>
              {" "}
              <h1>NAG1</h1>
              <h1>
                {" "}
                <mark>0</mark>015
              </h1>
            </div>
            <div className={styles.routecode}>
              {" "}
              <h1>NAG1</h1>
            </div>
          </section>
          <h1>Sold on: www.tvsscs.in</h1>
        </div>
      </>
    );
  }
}
