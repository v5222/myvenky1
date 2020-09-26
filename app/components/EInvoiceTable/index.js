import React from "react";
import styles from "./EinvoiceTable.module.scss";
import CurrencyFormat from "react-currency-format";
import Barcode from "react-barcode";
import "./einvoicetable2.scss";
import { thru } from "lodash";
import indianCurrencyInWords from 'indian-currency-in-words';


class EinvoiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grossTotal: 0,
      taxableTotal: 0,
      usgstTotal: 0,
      cgstTotal: 0,
      igstTotal: 0,
      itemTotal: 0,
    };
  }

  calculate = (item) => {
    // let { item } = this.props;
    let TempGross = 0;
    let TempTaxable = 0;
    let TempUSGST = 0;
    let TempCGST = 0;
    let TempIGST = 0;
    let Total = 0;

    item.map((i) => {
      TempGross = TempGross + Number(i.itemqty) * Number(i.itemunitprice);
      TempTaxable = TempTaxable + Number(i.itemassamt);
      TempUSGST = TempUSGST + Number(i.itemsgstamt);
      TempCGST = TempCGST + Number(i.itemcgstamt);
      TempIGST = TempIGST + Number(i.itemigstamt);
      Total =
        Total +
        Number(i.itemassamt) +
        Number(i.itemsgstamt) +
        Number(i.itemigstamt) +
        Number(i.itemcgstamt);

      return null;
    });
    this.setState(
      {
        grossTotal: TempGross,
        taxableTotal: TempTaxable,
        usgstTotal: TempUSGST,
        cgstTotal: TempCGST,
        igstTotal: TempIGST,
        itemTotal: Total,
      },
      () => {
        console.log(this.state, "state");
      }
    );
  };

  componentDidMount() {
    this.calculate(this.props.item);
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.calculate(this.props.item);
    }
  }

  render() {
    const { item } = this.props;
    const {
      grossTotal,
      taxableTotal,
      usgstTotal,
      cgstTotal,
      igstTotal,
      itemTotal,
    } = this.state;
    console.log(item, "item");
    return (
      <div className="Invoicetable">
        <table
          className="table table-bordered"
          style={{ maxWidth: "100%", margin: "auto", fontSize: "10px" }}
        >
          <tr>
            <th
              
              style={{ width: "3%" }}
              rowSpan="2"
            >
              S.no
            </th>
            {/* <td  style={{ width: "25%" }}>
                Item Code
              </td> */}
            <th
              
              style={{ width: "20%" }}
              rowSpan="2"
            >
              Description of goods/services
            </th>

            <th
              
              style={{ width: "5%" }}
              rowSpan="2"
            >
              UOM
            </th>

            <th
              
              style={{ width: "5%" }}
              rowSpan="2"
            >
              HSN/SAC Code
            </th>
            <th
              
              style={{ width: "5%" }}
              rowSpan="2"
            >
              Qty{" "}
            </th>
            <th
              
              style={{ width: "4%" }}
              rowSpan="2"
            >
              Rate
            </th>
            <th
              
              style={{ width: "6%" }}
              rowSpan="2"
            >
              Gross Amount
            </th>

            <th
              
              style={{ width: "5%" }}
              rowSpan="2"
            >
              Disc.
            </th>
            <th
              
              style={{ width: "4%" }}
              rowSpan="2"
            >
              Taxable Value
            </th>
            <th
              
              style={{ width: "5%" }}
              colSpan="2"
            >
              CGST
            </th>
            <th
              
              style={{ width: "10%" }}
              colSpan="2"
            >
              SGST / UTGST
            </th>
            <th
              
              style={{ width: "10%" }}
              colSpan="2"
            >
              IGST
            </th>
            {/* <th  style={{ width: "10%" }}>
              SGST / CGST Amount
            </th> */}
            <th
              
              style={{ width: "10%" }}
              rowSpan="2"
            >
              Item Total Amount
            </th>
          </tr>
          <tr>
            {/* <td />
            <td /> */}
            {/* <td />
            <td />
            <td />
            <td />
            <td /> */}
            <td>Rate</td>
            <td>Amt</td>
            <td>Rate</td>
            <td>Amt</td>
            <td>Rate</td>
            <td>Amt</td>
          </tr>
          {item.map((i, indexes) => (
            <tr key={Math.random()}>
              <td
                key={Math.random()}
                
                style={{ width: "3%" }}
              >
                {indexes + 1}
              </td>

              <td
                key={Math.random()}
                
                style={{ width: "20%" }}
              >
                {/**  {i.itemprddesc==null ? i.remarks : i.itemprddesc  } */}
                {i.itemprddesc == null ? i.remarks : (i.itemprddesc + ".  " + i.remarks)}
              </td>
              <td
                key={Math.random()}
                
                style={{ width: "2%" }}
              >
                {i.itemunit}{" "}
              </td>

              <td
                key={Math.random()}
                
                style={{ width: "5%" }}
              >
                {i.itemhsncd}
              </td>
              <td
                key={Math.random()}
                
                style={{ width: "5%" }}
              >
                {i.itemqty}
              </td>
              <td
                key={Math.random()}
                
                style={{ width: "4%" }}
              >
                <CurrencyFormat
                  value={Number(i.itemunitprice).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              <td
                key={Math.random()}
                
                style={{ width: "6%" }}
              >
                <CurrencyFormat
                  value={(
                    Number(i.itemqty).toFixed(2) * Number(i.itemunitprice)
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              {/* <td
                  key={Math.random()}
                  
                  style={{ width: "7%" }}
                >
                  {itempo.OTHERSGST1}
                </td>
                <td
                  key={Math.random()}
                  
                  style={{ width: "9%" }}
                >
                  {itempo.FREIGHTINSURANCE}
                </td> */}
              <td key={Math.random()} style={{ width: "5%" }}>
                <CurrencyFormat
                  value={Number(i.itemdiscount).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>

              <td key={Math.random()} style={{ width: "5%" }}>
                <CurrencyFormat
                  value={Number(i.itemassamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (value != 0 ? <div>{value}</div> : "")}
                />
              </td>

              {/* cgst rate and amount */}
              <td key={Math.random()} style={{ width: "5%" }}>
                {i.itemcgstrt == 0 ? " " : i.itemcgstrt + "%"}
              </td>
              <td key={Math.random()} style={{ width: "5%" }}>
                <CurrencyFormat
                  value={Number(i.itemcgstamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (value != 0 ? <div>{value}</div> : "")}
                />
              </td>
              {/* sgst/ugst rate and amount */}
              <td key={Math.random()} style={{ width: "5%" }}>
                {i.itemsgstrt == 0 ? " " : i.itemsgstrt + "%"}
              </td>
              <td key={Math.random()} style={{ width: "5%" }}>
                <CurrencyFormat
                  value={Number(i.itemsgstamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (value != 0 ? <div>{value}</div> : "")}
                />
              </td>
              {/* Igst rate and amount */}
              <td key={Math.random()} style={{ width: "5%" }}>
                {i.itemigstrt == 0 ? " " : i.itemigstrt + "%"}
              </td>
              <td key={Math.random()} style={{ width: "5%" }}>
                <CurrencyFormat
                  value={Number(i.itemigstamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (value != 0 ? <div>{value}</div> : "")}
                />
              </td>
              <td key={Math.random()} style={{ width: "5%" }}>
                <CurrencyFormat
                  value={(
                    Number(i.itemassamt) +
                    Number(i.itemcgstamt) +
                    Number(i.itemsgstamt) +
                    Number(i.itemigstamt)
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) =>
                    value !== 0 ? <div>{value}</div> : ""
                  }
                />
              </td>
            </tr>
          ))}
          {/* {item.CustomerInvoiceItemsList.map((itempo, indexess) =>
              indexess == 0 ? (
                <tr key={Math.random()}>
                  <td key={Math.random()}  />
                  <td key={Math.random()} >
                    {itempo.COMPANY_GSTADDRESS}
                  </td>
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  <td key={Math.random()}  />
                  
                </tr>
              ) : null
            )} */}
          {/* {item.CGSTRATE_GST > 0 ? (
              <tr>
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  {" "}
                  CSGT @{item.CGSTRATE_GST.toFixed(2)}%{" "}
                </td>
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  <CurrencyFormat
                    value={item.CGSTAMT_GST.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </td>
              </tr>
            ) : null}
            {item.SGSTRATE_GST > 0 ? (
              <tr>
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  SGST @{item.SGSTRATE_GST.toFixed(2)}%
                </td>
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  <CurrencyFormat
                    value={item.SGSTAMT_GST.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </td>
              </tr>
            ) : null}

            {item.IGSTRATE_GST > 0 ? (
              <tr>
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  IGST @{item.IGSTRATE_GST.toFixed(2)}%
                </td>
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  <CurrencyFormat
                    value={item.IGSTAMT_GST.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </td>
              </tr>
            ) : null}

            {item.UGSTRATE_GST > 0 ? (
              <tr>
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  UGST @{item.UGSTRATE_GST.toFixed(2)}%
                </td>
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  <CurrencyFormat
                    value={item.UGSTAMT_GST.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </td>
              </tr>
            ) : null}

            {item.CESSRATE1_GST > 0 ? (
              <tr>
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  CESSGST @{item.CESSRATE1_GST.toFixed(2)}%
                </td>
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()}  />
                <td key={Math.random()} >
                  <CurrencyFormat
                    value={item.CESSAMT1_GST.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </td>
              </tr>
            ) : null} */}

          {/* grossTotal: "",
      taxableTotal: "",
      usgstTotal: "",
      cgstTotal: "",
      igstTotal: "",
      itemTotal */}

          <tr>
            <td  colSpan="2">
              TOTAL :
            </td>
            <td  colSpan="4" />
            <td  colSpan="1">
              <CurrencyFormat
                value={grossTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            <td  colSpan="1" />

            <td  colSpan="1">
              <CurrencyFormat
                value={taxableTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            <td  colSpan="1" />

            <td  colSpan="1">
              <CurrencyFormat
                value={cgstTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (value != 0 ? <div>{value}</div> : "")}
              />
            </td>
            <td  colSpan="1" />
            <td  colSpan="1">
              <CurrencyFormat
                value={usgstTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (value != 0 ? <div>{value}</div> : "")}
              />
            </td>
            <td  colSpan="1" />
            <td  colSpan="1">
              <CurrencyFormat
                value={igstTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (value != 0 ? <div>{value}</div> : "")}
              />
            </td>
            <td key={Math.random()} >
              <CurrencyFormat
                value={itemTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
          </tr>
        </table>





        <section className={styles.subcontainer_2}>
          <div className={styles.wrapper_1}>
            <div className={styles.subwrapper_2} style={{ paddingLeft: 'auto' }}>

              <div>
                <div className='amt_words'> <strong>Amount Chargeable(in words):  INR- </strong> {indianCurrencyInWords(itemTotal)}</div>
              </div>

            </div>
            <div className={styles.subwrapper_1} style={{ marginLeft: 'auto' }}>

              <table >
                <tr style={{ borderBottom: '1px solid black' }}>

                  <td colSpan="6" style={{ borderRight: '1px solid black', width: '262px', borderLeft: '1px solid black' }}>
                    Total Amount Before Tax:
          </td>
                  <td colSpan="2" style={{ width: '250px' }}>
                  <CurrencyFormat
                value={taxableTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
                  />
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid black' }}>

                  <td colSpan="6" style={{ borderRight: '1px solid black', width: '262px', borderLeft: '1px solid black' }}>
                    Add: CGST:
          </td>
                  <td colSpan="2" style={{ width: '250px' }}>
                  <CurrencyFormat
                  value={cgstTotal.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) =><div>{value}</div>}
                />
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid black' }}>

                  <td colSpan="6" style={{ borderRight: '1px solid black', width: '262px', borderLeft: '1px solid black' }}>
                    Add: SGST/UTGST:
          </td>
                  <td colSpan="2" style={{ width: '250px' }}>
                  <CurrencyFormat
                  value={usgstTotal.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) =><div>{value}</div>}
                />
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid black' }}>

                  <td colSpan="6" style={{ borderRight: '1px solid black', width: '262px', borderLeft: '1px solid black' }}>
                    Add: IGST:
          </td>
                  <td colSpan="2" style={{ width: '250px' }}>
                    {igstTotal.toFixed(2)}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid black' }}>

                  <td colSpan="6" style={{ borderRight: '1px solid black', width: '262px', borderLeft: '1px solid black' }} >
                    Other Taxes(TCS):
          </td>
                  <td colSpan="2" style={{ width: '250px' }}>
                    0
          </td>
                </tr>
                <tr>

                  <td colSpan="6" style={{ borderRight: '1px solid black', width: '262px', borderLeft: '1px solid black' }}>
                    Total Invoice Amount:
          </td>
                  <td colSpan="2" style={{ width: '250px' }}>
                  <CurrencyFormat
                  value={itemTotal.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
                  </td>
                </tr>

              </table>



            </div>
          </div>

          <div className={styles.wrapper_1}>
            <div className={styles.subwrapper_2} style={{ borderRight: '1px solid black' }}>
              <div>
                <h5 className={styles.terms_heading}>Terms and Conditions</h5>
              </div>
              <h6 className={styles.terms}>
                1) Any dispute with the Invoice shall be informed within 15 days
                from the date of receipt of the Invoice
              </h6>

              <h6 className={styles.terms}>
                2) Payments shall be made by at par cheque / DD / ECS in the
                name of TVS Supply Chain Solutions Limited
              </h6>

              <h6 className={styles.terms}>
                3) Interest shall be charged at 18 % p.a on delayed payments
              </h6>

              <h6 className={styles.terms}>
                4) The Agreement terms and conditions, if any shall prevail over
                the above terms and conditions.
              </h6>
              <h6 className={styles.terms}>
                5) Payment Due In 30 Days From Invoice Date.
              </h6>
            </div>
            <div className={styles.signature}>
              <div>Signature:</div>

              <div>Name:</div>
            </div>
          </div>

          <div className={styles.wrapper_1}>
            <div className={styles.subwrapper_2} style={{ borderRight: '1px solid black' }}>
              <h6>
                <strong className={styles.footer_list}>
                  Electronic Reference Number
                </strong>
              </h6>
              <h6>
                <strong className={styles.footer_list}>
                  Certified that the particulars given above are true and
                  correct
                </strong>
              </h6>
            </div>
            <div className={styles.subwrapper_footer}>
              <Barcode
                value="TVS SUPPLY CHAIN INVOICE"
                className="bar_code"
                height={15}
              />
            </div>
          </div>

        </section>

      </div>
    );
  }
}

export default EinvoiceTable;
