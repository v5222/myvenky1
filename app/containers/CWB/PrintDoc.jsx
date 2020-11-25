import React, { Component } from "react";
import styles from "./printdoc.module.scss";
import ReactBarcode from "react-barcode";
import Logo from "../../images/logo-full.png";
import moment from "moment";
export default class PrintDoc extends Component {
  render() {
    const { data } = this.props;
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
                TVS Supply Chain Solutions Limited
              </div>
              <div className={styles.tag}>
                (Formerly known as TVS Logistics Services Limited)
              </div>
              <div className={styles.addr1}>
                N0:226, Karunal kudil, Cathderal Road,
              </div>
              <div className={styles.addr2}>Gopalapuram ,Chennai - 600086</div>
            </div>
            <div className={styles.barcode}>
              <ReactBarcode
                value={data[0].barcode}
                height={60}
                width={2}
                fontSize={15}
              />
            </div>
          </section>

          <section className={styles.wrapper_2}>
            <h2 className={styles.title}>Consignment Note</h2>
            <div className={styles.cwbinfo}>
              <div style={{ width: "50%" }} />
              <div className={styles.cwbinfo_wrapper}>
                <div className={styles.cwbstatsus}>
                  <div>CWB Status :</div>
                  <div
                    style={{
                      textAlign: "left",
                      width: "50%",
                      fontWeight: "bolder",
                    }}
                  >
                    Collection
                  </div>
                </div>
                <div className={styles.cwbstatsus}>
                  <div>CWB Date :</div>{" "}
                  <div
                    style={{
                      textAlign: "left",
                      width: "50%",
                      fontWeight: "bolder",
                    }}
                  >
                    {moment(data[0].documentdate).format("DD-MM-YYYY")}
                  </div>
                </div>
                <div className={styles.cwbstatsus}>
                  <div>CWB No :</div>
                  <div
                    style={{
                      textAlign: "left",
                      width: "50%",
                      fontWeight: "bolder",
                    }}
                  >
                    {data[0].documentno}
                  </div>
                </div>
                <div className={styles.cwbstatsus}>
                  <div>Child CWB No :</div>{" "}
                  <div
                    style={{
                      textAlign: "left",
                      width: "50%",
                      fontWeight: "bolder",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.wrapper_3}>
            <div className={styles.consignor}>
              <div className={styles.title}>Consginor : </div>
              <div className={styles.info}>
                <div>{data[0].consignorname}</div>
                <div>{data[0].consignoraddress} </div>
                <div>{data[0].consignorcity}</div>

                <div>{data[0].consignorcode}</div>
                <div>{data[0].consignorzipcode}</div>
                <div>{data[0].consignorcontactno}</div>
              </div>
            </div>
            <div className={styles.consignee}>
              <div className={styles.title}>Consginee : </div>
              <div className={styles.info}>
                <div>{data[0].consigneename}</div>
                <div>{data[0].consigneeaddress} </div>
                <div>{data[0].consigneecity}</div>

                <div>{data[0].consigneecode}</div>
                <div>{data[0].consigneezipcode}</div>
                <div>{data[0].consigneecontactno}</div>
              </div>
            </div>
          </section>

          <section className={styles.wrapper_3} style={{ borderTop: "none" }}>
            <div className={styles.consignor}>
              <div className={styles.title}>Consignor Code:</div>
              <div className={styles.info}>{data[0].consignorcode}</div>
            </div>

            <div className={styles.consignee}>
              <div className={styles.title}>Consignee Code :</div>
              <div className={styles.info}>{data[0].consigneecode}</div>
            </div>
          </section>

          <section className={styles.wrapper_4}>
            <div className={styles.title}>
              Note: GST is borne by the Consignor / Consignee
            </div>
            <div className={styles.content}>
              <div className={styles.subcont}>
                <div> Contract No.: </div>
                <div>{data[0].salecontract}</div>
              </div>
              <div className={styles.subcont}>
                <div>
                  {" "}
                  Dt: {moment(data[0].documentdate).format("DD-MM-YYYY")}{" "}
                </div>
                <div> </div>
              </div>
              <div className={styles.subcont}>
                <div> Billable Value : </div>
                <div>{data[0].partvalue}</div>
              </div>
              <div className={styles.subcont}>
                <div> Origin: </div>
                <div> {data[0].consignorcity}</div>
              </div>
              <div className={styles.subcont}>
                <div> Destination </div>
                <div> {data[0].consigneecity}</div>
              </div>
            </div>
          </section>

          <section className={styles.wrapper_5}>
            <div className={styles.title}>
              Documents Attached : Original Invoice / Delivery Challan
            </div>
            {/* <div className={styles.title}>
              For Terms & Conditions, Please visit :{" "}
              <a link="http://tvslsl.com">http://tvslsl.com</a>
            </div> */}
            <table>
              <thead>
                <tr>
                  <th>Part No.</th>
                  <th>Sch. Qty</th>
                  <th>Weight</th>
                  <th>Invoice No.</th>
                  <th>Invoice Date</th>
                  <th>Invoice Qty</th>
                  <th>Actual Qty.</th>
                  <th>Invoice Amount</th>
                  <th>Value</th>
                  <th>Currency</th>
                  <th>Pack Used</th>
                  <th>No of Pcs</th>
                  <th>Box Conditions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data[0].partno}</td>
                  <td>{Number(data[0].partqty).toFixed(2)}</td>
                  <td>{`${data[0].partweight} ${data[0].partweightuom}`}</td>
                  <td>{data[0].documentno}</td>
                  <td>{moment(data[0].documentdate).format("DD-MM-YYYY")}</td>
                  <td>{Number(data[0].partqty).toFixed(2)}</td>
                  <td>{Number(data[0].partqty).toFixed(2)}</td>
                  <td> {Number(data[0].partvalue).toFixed(2)}</td>
                  <td>1344985.00 </td>
                  <td>INR</td>
                  <td />
                  <td>25</td>
                  <td>Good</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className={styles.wrapper_6}>
            <div className={styles.headings}>
              <div>
                <div>Vehicle No.</div>
                <div>Frieght Charges : As per Agreement</div>
                <div>Window Time in</div>
                <div>Window Time Out</div>
              </div>
              <div>
                <div>for TVS Supply Chain Solutions Limited</div>
                <div>( Name and Signature )</div>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.subbox_1}>
                <div className={styles.sub1}>
                  <div> POD Details :</div>
                  <div> Signature :</div>
                </div>
                <div className={styles.sub1}>
                  <div>Date</div>
                  <div>Time in</div>
                  <div>Time out</div>
                </div>
              </div>
              <div className={styles.subbox_2}>
                <div>Consignor Representaive</div>
                <div>Name</div>
                <div>Signature</div>
              </div>
            </div>
          </section>
          <div className="page-break" />
          <div className={styles.hr} />
          <div className={styles.terms_title}>
            TERMS AND CONDITIONS OF CARRIAGE OF GOODS BY
          </div>
          <p className={styles.terms}>
            TVS Supply chain solutions Limited This shipment is accepted by TVS
            Supply chain solutions Limited(Its employees and or its agents and
            hereinafter reffered to collectively as TVS SCS for carriage on
            behalf of the SHIPPER subjects to the terms and conditions
            hereinafter set out. TVS SCS reserves the right to carry the
            Shipper's goods by any route and procedure and by successive
            carriers and according to its own handings,storage and transporation
            methods (1) THE DOMESTICWAY BILL: A) This TVS SCS way bill is
            non-negotiable and the SHIPER acknowledges that it has been prepared
            by the SHIPPER or by TVS SCS on behalf of THE SHIPPER B) Shipment
            underthis way bill is carried at the SHIPPER's risk. (2) OBLIGATIONS
            AND RESPONSIBILITY OF THE SHIPPER: A) TVS SCS will only carry the
            goods which are the property of THE SHIPPER warrants thats it is
            authorised to accept and is accepting these conditions not only on
            behalf of itself but also as agent for or on behalf of all persons
            who are or may thereafter become interested in the goods. THE
            SHIPPER hereby undertakes to indemnity TVS SCS against any damages,
            cost and expenses resulting from breach of this warranty B) The
            SHIPPER warrants to TVS SCS that the description of goods as noted
            on this Waybill conforms accurately to the actual context of the
            including the right to abandon carriage of the same immediately upon
            TVS SCS having knowledge that such items infringes these conditions.
            C) It is the SHIPPER's obligation to ensure that all shipments
            tendered to TVS SCS for carriage are prepared and packed
            sufficiently to ensure sage transportation with ordinary care in
            handling. Any article susceptible to damage as a result of any
            condition which may be encourtered in transportation, collection and
            delivery must be adequately protected by the customer by proper
            packing. Each package within a shipment must be legibly and durably,
            marked with the full name and address of both the SHIPPER and
            Consignee. TVS SCS accepts no responsibility for inadequate packing
            or lack of sufficient addressee information necessary to effect
            delivery. D) TVS SCS will not carry (in addition to those items
            mentioned in Clause (s)(b) hereof) dangerous, hazzardous,
            combustible or explosive materials, Gold and silver bullion coin or
            any form of uncoined gold and silver or bullion platinum and other
            precious metals, precious and semi-precious stones including
            commercial cartons or industrial diamonds, currency (paper or coin)
            of any nationality or endorse in blank cashier's cheques, money
            orders or traveller's cheques, letters, antiques, pictures,
            livestock or plants and in the event that any SHIPPER should consign
            such items with TVS SCS, the SHIPPER shall indemnify TVS SCS for all
            claims,damages and expenses arising in connection therewith and TVS
            SCS shall have the right to deal with such items as it shall see fit
            including the right to abandon carriage of the same immediately upon
            TVS SCS having knowledge that such item infringes these conditions.
            (3) OCTROI, TAXES AND DUTIES: Any OCTROI, State Tax or any take or
            duties as may be applicable on this shipment would be payable by the
            consignee at the time of delivery of shipment. The SHIPPER hereby
            agress that if the consignee has refused to pay the amount. The
            SHIPPER will pay the dues to TVS SCS. TVS SCS reserve the rights of
            lien of any shipment till all the dues to TVS SCS are paid in full
            in respect of freight, octroi,duties,taxes and any other charges.
            TVS SCS also reserves its rights to deal with the shipment as it
            sees fit including the right to sell the goods of the SHIPPER in
            order to recover all the dues from the SHIPPERS. The SHIPPERS will
            undertake to provide documentation required such as GATE Pass,
            Invoice declaration, state and central sales tax, registration Nos,
            "N" forms, Form 31/32 and any other documents to enable as to clear
            the shipment expeditiously. TVS SCS will not be responsible for the
            delays and losses due to hold up for want of documentation and / or
            payment of levies. Service Tax shall be payed by
            Consignor/Consignee. (4) TVS SCS RIGHTS OF INSPECTION OF SHIPMENT:
            (A) TVS SCS has the right but not obligation to open and /or inspect
            any shipment consigned by the SHIPPER to ensure that all the items
            are capable or carriage to the destination within the standard
            operating procedure and handling methods of TVS SCS in making this
            reservation. TVS SCS does not warrant that any particular item to be
            carried is capable of carriage without infringing the law at any
            state of the country from to or through which the item may be
            carried. (B) TVS SCS reserves the rights to refuse shipments not
            confirming to these terms and conditions without assigning any
            reason whatsoever. (5) INSURANCE: The SHIPPER may if it desires
            insure the shipment at its own cost and TVS SCS wil not provide any
            isurance coverage in respect of the same even if the value of
            shipment is declared to TVS SCS by the SHIPPER. (6) LIMITATION OF
            LIABILITY: (A) The liability of TVS SCS for any loss or damage to
            the shipment will be strictly limited of Rs.500/- for each shipment
            (which term includes all documents and parcels consigned through TVS
            SCS by the SHIPPER) (7) CONSEQUENTIAL DAMAGES EXCLUDED: TVS SCS
            shall be liable in any event for any consequential or special
            damages or other direct or indirect loss however arising whether or
            not TVS SCS had knowledge that such damages might be incurred
            including but not limited to loss of income,profits,interest,utility
            or loss of market. (8) LIABILITIES NOT ASSUMED: (A) In particular
            TVS SCS will not be liable for any loss or damage to the shipment or
            delay in picking or delivering the shipment if it is due to acts of
            God, force majeure, occurence of any cause reasonably beyond the
            control of TVS SCS or loss or damage caused through strikes, riots,
            political and other disturbances such as fire, accidents of the
            vehicle carrying the goods, explosion beyond TVS SCS's control for
            the goods that are carried by TVS SCS. (B) The act, cause by the
            fault or ommission of the SHIPPER, the consignee or any other party
            who claims an interest in the shipment including violations of any
            terms and conditions hereof or any other person including Government
            officials in discharge of their official duties such as Customes,
            Taxation, Octroi Inspection etc,. The nature of the shipment or any
            defect characteristics, or inherit vice thereof electrical or
            magnetic injury, erasure or other such damages. (C) The SHIPPER
            indemnifies TVS SCS against any LOSS,damages , panalties action
            proceedings that may be instituted by any Government officials in
            discharge or their official duties such as Customs, Taxations,
            Octroi inspections etc., (D) Not withstanding what is stated above
            whilst TVS SCS will endaevour to provide expeditious delivery in
            accordance with its regular delivery schedules, TVS SCS will not
            under circumstances be liable for delay in pickup transportation or
            delivery of any shipments regardless of cause of such delays. (9)
            CLAIMS: (A) Any claims must be brought by the SHIPPER and delivery
            in writing to the office of TVS SCS nearest to the location at which
            the shipment is accepted within 30 days of the date of such
            acceptance. No claim can be made against TVS SCS beyond this time
            limit. (B) NO CLAIM FOR LOSS OR DAMAGE WILL BE ENTERTAINED UNTIL ALL
            TRANSPORTATION CHARGES HAVE BEEN PAID. THE AMOUNT OF ANY SUCH CLAIM
            WILL NOT BE DEDUCTED FROM ANY TRANSPORTATION CHARGES DUE TO TVS SCS.
            (10) GOVERNING LAS AND JURISDICTION OF COURTS: This agreement shall
            be Governed by the Laws of INDIA and Parties submit to the exclusive
            jurisdiction of the courts in Chennai.
          </p>

          <div>
            “This is a system generated CWB from TVS Supply Chain Solutions
            Limited”.
          </div>
        </div>
        <div />
      </>
    );
  }
}
