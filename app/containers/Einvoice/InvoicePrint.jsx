import React, { useEffect, useState } from "react";
import styles from "./InvoicePrint.module.scss";
import TvsLogo from "../../images/TVS-SCS-Logo.png";
import QRCode from "qrcode.react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import EinvoiceTable from "../../components/EInvoiceTable";
import items from "./items.json";
import ReactToPrint from "react-to-print";
import { size } from "lodash";

const QRCODE =
  '{"SellerGstin":"37AACCT1412E1ZU","BuyerGstin":"37AABCM9425F1ZF","DocNo":"AP3PLCLI20000003","DocTyp":"INV","DocDt":"17/04/2020","TotInvVal":257012.54,"ItemCnt":2,"MainHsnCode":"9968","Irn":"e6157c135030019a84752600269ee987b4ab1091766ca379caa191d6048b469e","IrnDt":"2020-09-12 16:56:00"}';
class InvoicePrint extends React.Component {
  render() {
    const { InvoiceHeaderList } = this.props.data;
    const { InvoiceDetailsList } = this.props.data;
    const details = InvoiceHeaderList[0];

    const { item } = this.props;

    
    
    return (
      <div>
        <div className={styles.reportType}>{"ORIGINAL FOR RECIPIENT"}</div>
        <section className={styles.container}>
          <img src={TvsLogo} className={styles.logo} alt="logo" />
          <div className={styles.companyDetails}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bolder",
                marginBottom: "5px",
                textTransform: "uppercase",
                color: "transparent",
              }}
            >
              Seller Details
            </div>
            <div className={styles.companyName}>{details.sellerlglnm}</div>
            <div className={styles.companyName}>
              <i>{"(Formerly known as TVS Logistics Services Limited)"}</i>
            </div>
            {/* <div className={styles.companyName}>
            {details.sellerlglnm}
            </div> */}
            <div className={styles.companyAddr}>{details.selleraddress1}</div>
            <div className={styles.companyAddr}>{details.selleraddress2}</div>
            <div className={styles.companyAddr}>
              {details.sellerlocation + ":  " + details.sellerpincode}
            </div>
            {/** <div className={styles.companyAddr}>{details.sellerpincode}</div>  */}
            <div className={styles.companyAddr}>
              State Code : {details.sellerstcd} - {details.sellerdtlstname}
            </div>
            <div className={styles.companyAddr}>
              GSTIN : {details.sellergsting}
            </div>
            <div className={styles.companyAddr}>
              PAN : {details.sellergsting.slice(2, 12)}
            </div>
            <div className={styles.companyAddr}>UIN:{details.selleruin}</div>
          </div>

          {/* dispatch details */}

          {/**   {InvoiceDetailsList[0].itemisservc === "N" ? ( */}
          {InvoiceDetailsList[0] ? (
            <div
              className={styles.companyDetails}
              style={{ marginRight: "70px" }}
            >
              <div className={styles.dispatch}>Dispatch Details</div>
              <div className={styles.companyName}>
                <div className={styles.companyName}>{details.sellerlglnm}</div>

                <div className={styles.companyName}>
                  <i>{"(Formerly known as TVS Logistics Services Limited)"}</i>
                </div>
              </div>
              {/** {details.dispnm !== "NA" ? details.dispnm : details.sellerlglnm} */}  
              <div className={styles.companyName}>{details.dispnm}</div>
              <div className={styles.companyAddr}>
                {details.dispaddress1 !== "NA"
                  ? details.dispaddress1
                  : details.selleraddress1}
              </div>
              <div className={styles.companyAddr}>
                {details.dispaddress2 !== "NA"
                  ? details.dispaddress2
                  : details.selleraddress2}
              </div>
              <div className={styles.companyAddr}>
              {details.displocation + ":  " + details.disppincode}
            </div>


              <div className={styles.companyAddr}>
                State Code : {details.dispstcd} - {details.dispdtlstname}
              </div>
            </div>
          ) : (
            ""
          )}

          <div className={styles.qrcode}>
            <div>
              <QRCode value={details.qrcode} style={{ marginRight: "60px" }} />
            </div>
            <div className={styles.qr_details}>Version : {details.version}</div>
            <div>
              <div className={styles.qr_details}>
                IRN : {details.irn === null ? " " : details.irn.slice(0, 24)}
              </div>
              <div className={styles.qr_details}> {details.irn=== null ? " " : details.irn.slice(24, 48)}</div>
              <div className={styles.qr_details}> {details.irn=== null ? " " : details.irn.slice(48)}</div>
            </div>
          </div>
        </section>

        <div
          style={{
            display: "flex",
            margin: "5px 0px",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.supplytype}>
            Supply Type : {details.suptyp}
          </div>
          <div className={styles.invoicetype}>
            {"TAX INVOICE " + "(" + details.typ + ")"}
          </div>
          <div
            style={{
              justifySelf: "center",
            }}
            className={styles.supplytype}
          >
            Document Period: {details.refinvstdt} - {details.refinvenddt}
          </div>
        </div>
        <div
        className={styles.supplytype}
        >
          Place of Supply : {details.shipstcd} - {details.shipdtlstname} 
        </div>
        <section>
          <Row gutter={[3, 12]}>
            <Col span={12}>
              <div className={styles.invoiceNo}>
                Invoice No : <span>{details.no}</span>
              </div>
              <div className={styles.invoiceNo}>
                Invoice Date : <span>{details.dt}</span>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.invoiceNo1}>
                Original Document No :{" "}
                <span style={{ fontWeight: "600" }}>{details.refinvno}</span>
              </div>
              <div className={styles.invoiceNo1}>
                Original Document Date :{" "}
                <span style={{ fontWeight: "600" }}>{details.refinvdt}</span>
              </div>
            </Col>
            {/* <Col span={12} /> */}
          </Row>

          <Row gutter={[3, 12]}>
            <Col span={12}>
              <div className={styles.subcontainer}>
                <div className={styles.subheading}>Bill To Customer</div>
                <div
                  className={styles.subheading1}
                  style={{ fontWeight: "bold" }}
                >
                  {details.buyerlglnm}
                </div>
                {/* <div className={styles.subheading1}>{data.BILLTOADDRESS}</div> */}
                <div className={styles.subheading1}>
                  {" "}
                  {details.buyeraddress1}
                </div>
                <div className={styles.subheading1}>
                  {details.buyeraddress2}
                </div>
                <div className={styles.subheading1}>
                  {details.buyerlocation + ": " + details.buyerpincode}
                </div>
                <div className={styles.subheading1}>
                  State Code : {details.buyerstcd} - {details.buyerdtlstname}  
                </div>
                <div className={styles.subheading1}>
                  GSTIN : {details.buyergstin}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.subcontainer}>
                <div className={styles.subheading}>Ship To Customer</div>
                <div
                  className={styles.subheading1}
                  style={{ fontWeight: "bold" }}
                >
                  {details.shiplglnm}
                </div>
                {/* <div className={styles.subheading1}>
                  {data.PLACEOFSUPP_ADDRESS}
                </div> */}
                <div className={styles.subheading1}>{details.shipaddress1}</div>
                <div className={styles.subheading1}>{details.shipaddress2}</div>
                <div className={styles.subheading1}>
                  {details.shiplocation + ": " + details.shippincode}
                </div>
                {/*  <div className={styles.subheading1}>{details.shippincode}</div>  */}
                {/* <div className={styles.subheading1}></div> */}
                <div className={styles.subheading1}>
                  State Code : {details.shipstcd}  - {details.shipdtlstname} 
                </div>
                <div className={styles.subheading1}>
                  GSTIN : {details.shipgstin}
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={[3, 12]}>
            <Col span={12}>
              <div className={styles.subcontainer1}>
                {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
                <table  id={styles.subtable1}>
                  <tr>
                    <td className={styles.subtabletd}>
                      Customer Purchase Order:
                    </td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong style={{fontWeight:'normal'}}>{details.customerpo}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>
                      Customer Purchase Orderdate:
                    </td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong style={{fontWeight:'normal'}}>{details.customerpodate}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>Vendor Code:</td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong style={{fontWeight:'normal'}}>{details.vendorcode}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>Whether Reverse charge applicable (Y/N) : </td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong style={{fontWeight:'normal'}}>N</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>Supply of Service (Y/N) :</td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong style={{fontWeight:'normal'}}>{InvoiceDetailsList[0].itemisservc}</strong>
                    </td>
                  </tr>
                </table>

                {/* </div> */}
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.subcontainer}>
                <table id={styles.subtable1} className={styles.subcontainer2}>
                  <tr>
                    <td className={styles.subtabletd}>WCC No : {details.wcno}</td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>WCC Date : {details.wcdate}</td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>
                      Receipt No : {details.recepitno}
                    </td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>Site ID : {details.siteid}</td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.subtabletd}>Site Name : {details.sitename}</td>
                    <td key={Math.random()} className={styles.subtabletd}>
                      <strong />
                    </td>
                  </tr>
                </table>
              </div>
            </Col>
          </Row>
        </section>

        <EinvoiceTable item={InvoiceDetailsList} style={{margin:'auto'}}/>
        <div style={{textAlign:'center', color:'grey'}}>
        {InvoiceHeaderList[0].regdofficeaddress}
        </div>
        
      </div>
    );
  }
}

export default InvoicePrint;
