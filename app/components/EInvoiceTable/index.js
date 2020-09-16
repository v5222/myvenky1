import React from "react";
import styles from "./EinvoiceTable.module.scss";
import CurrencyFormat from "react-currency-format";
import Barcode from "react-barcode";
import { thru } from "lodash";
import converter from "number-to-words";
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
  componentDidMount() {
    let { item } = this.props;
    let TempGross = 0;
    let TempTaxable = 0;
    let TempUSGST = 0;
    let TempCGST = 0;
    let TempIGST = 0;
    let Total = 0;
    item.map((i) => {
      TempGross = TempGross + parseInt(i.itemqty) * parseInt(i.itemunitprice);
      TempTaxable = TempTaxable + parseInt(i.itemassamt);
      TempUSGST = TempUSGST + parseInt(i.itemsgstamt);
      TempCGST = TempCGST + parseInt(i.itemcgstamt);
      TempIGST = TempIGST + parseInt(i.itemigstamt);
      Total =
        Total +
        parseInt(i.itemassamt) +
        parseInt(i.itemsgstamt) +
        parseInt(i.itemcgstamt) +
        parseInt(i.itemigstamt);
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
      <div className={styles.Invoicetable}>
        <table
          className="table table-striped table-dcnote"
          style={{ width: "100%", fontSize: "14px" }}
        >
          <tr>
            <th
              className="text-center txt-bld"
              style={{ width: "3%" }}
              rowSpan="2"
            >
              S.no
            </th>
            {/* <td className="text-center txt-bld" style={{ width: "25%" }}>
                Item Code
              </td> */}
            <th
              className="text-center txt-bld"
              style={{ width: "20%" }}
              rowSpan="2"
            >
              Description of goods/services
            </th>

            <th
              className="text-center txt-bld"
              style={{ width: "5%" }}
              rowSpan="2"
            >
              HSN/SAC Code
            </th>
            <th
              className="text-center txt-bld"
              style={{ width: "5%" }}
              rowSpan="2"
            >
              Qty{" "}
            </th>
            <th
              className="text-center txt-bld"
              style={{ width: "7%" }}
              rowSpan="2"
            >
              Rate
            </th>
            <th
              className="text-center txt-bld"
              style={{ width: "12%" }}
              rowSpan="2"
            >
              Gross Amount
            </th>

            <th
              className="text-center txt-bld"
              style={{ width: "10%" }}
              rowSpan="2"
            >
              Discount
            </th>

            <th
              className="text-center txt-bld"
              style={{ width: "10%" }}
              rowSpan="2"
            >
              Taxable Value
            </th>
            <th
              className="text-center txt-bld"
              style={{ width: "10%" }}
              colSpan="2"
            >
              CGST
            </th>
            <th
              className="text-center txt-bld"
              style={{ width: "10%" }}
              colSpan="2"
            >
              SGST / UGST
            </th>
            <th
              className="text-center txt-bld"
              style={{ width: "10%" }}
              colSpan="2"
            >
              IGST
            </th>
            {/* <th className="text-center txt-bld" style={{ width: "10%" }}>
              SGST / CGST Amount
            </th> */}
            <th
              className="text-center txt-bld"
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
            <td>Amnt</td>
            <td>Rate</td>
            <td>Amnt</td>
            <td>Rate</td>
            <td>Amnt</td>
          </tr>
          {item.map((i, indexes) => (
            <tr key={Math.random()}>
              <td
                key={Math.random()}
                className="text-left"
                style={{ width: "3%" }}
              >
                {indexes + 1}
              </td>
              {/* <td
                  key={Math.random()}
                  className="text-left"
                  style={{ width: "5%" }}
                /> */}
              <td
                key={Math.random()}
                className="text-left"
                style={{ width: "20%" }}
              >
                {i.itemprddesc}
              </td>

              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "5%" }}
              >
                {i.itemhsncd}
              </td>
              <td
                key={Math.random()}
                className="text-center"
                style={{ width: "5%" }}
              >
                {i.itemqty}
              </td>
              <td
                key={Math.random()}
                className="text-center"
                style={{ width: "7%" }}
              >
                <CurrencyFormat
                  value={parseInt(i.itemunitprice)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              <td
                key={Math.random()}
                className="text-center"
                style={{ width: "12%" }}
              >
                <CurrencyFormat
                  value={(
                    parseInt(i.itemqty) * parseInt(i.itemunitprice)
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              {/* <td
                  key={Math.random()}
                  className="text-right"
                  style={{ width: "7%" }}
                >
                  {itempo.OTHERSGST1}
                </td>
                <td
                  key={Math.random()}
                  className="text-right"
                  style={{ width: "9%" }}
                >
                  {itempo.FREIGHTINSURANCE}
                </td> */}
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                <CurrencyFormat
                  value={parseInt(i.itemdiscount).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                <CurrencyFormat
                  value={parseInt(i.itemassamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>

              {/* cgst rate and amount */}
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                {parseInt(i.itemcgstrt)}%
              </td>
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                <CurrencyFormat
                  value={parseInt(i.itemcgstamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              {/* sgst/ugst rate and amount */}
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                {parseInt(i.itemsgstrt)}%
              </td>
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                <CurrencyFormat
                  value={parseInt(i.itemsgstamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              {/* Igst rate and amount */}
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                {parseInt(i.itemigstrt)}%
              </td>
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                <CurrencyFormat
                  value={parseInt(i.itemigstamt).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
              <td
                key={Math.random()}
                className="text-right"
                style={{ width: "10%" }}
              >
                <CurrencyFormat
                  value={(
                    parseInt(i.itemassamt) +
                    parseInt(i.itemcgstamt) +
                    parseInt(i.itemsgstamt)
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </td>
            </tr>
          ))}
          {/* {item.CustomerInvoiceItemsList.map((itempo, indexess) =>
              indexess == 0 ? (
                <tr key={Math.random()}>
                  <td key={Math.random()} className="text-left" />
                  <td key={Math.random()} className="text-left">
                    {itempo.COMPANY_GSTADDRESS}
                  </td>
                  <td key={Math.random()} className="text-right" />
                  <td key={Math.random()} className="text-center" />
                  <td key={Math.random()} className="text-center" />
                  <td key={Math.random()} className="text-center" />
                  <td key={Math.random()} className="text-right" />
                  <td key={Math.random()} className="text-right" />
                  <td key={Math.random()} className="text-right" />
                  <td key={Math.random()} className="text-right" />
                  <td key={Math.random()} className="text-right" />
                  
                </tr>
              ) : null
            )} */}
          {/* {item.CGSTRATE_GST > 0 ? (
              <tr>
                <td key={Math.random()} className="text-left" />
                <td key={Math.random()} className="text-left">
                  {" "}
                  CSGT @{item.CGSTRATE_GST.toFixed(2)}%{" "}
                </td>
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right">
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
                <td key={Math.random()} className="text-left" />
                <td key={Math.random()} className="text-left">
                  SGST @{item.SGSTRATE_GST.toFixed(2)}%
                </td>
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right">
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
                <td key={Math.random()} className="text-left" />
                <td key={Math.random()} className="text-left">
                  IGST @{item.IGSTRATE_GST.toFixed(2)}%
                </td>
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right">
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
                <td key={Math.random()} className="text-left" />
                <td key={Math.random()} className="text-left">
                  UGST @{item.UGSTRATE_GST.toFixed(2)}%
                </td>
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right">
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
                <td key={Math.random()} className="text-left" />
                <td key={Math.random()} className="text-left">
                  CESSGST @{item.CESSRATE1_GST.toFixed(2)}%
                </td>
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-center" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right" />
                <td key={Math.random()} className="text-right">
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
            <td className="text-center txt-bld" colSpan="2">
              TOTAL :
            </td>
            <td className="text-center txt-bld" colSpan="3" />
            <td className="text-center txt-bld" colSpan="1">
              <CurrencyFormat
                value={grossTotal}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            <td className="text-center txt-bld" colSpan="1" />
            <td className="text-center txt-bld" colSpan="1">
              <CurrencyFormat
                value={taxableTotal}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            {/* <td className="text-center txt-bld" colSpan="1" /> */}
            <td className="text-center txt-bld" colSpan="2">
              <CurrencyFormat
                value={cgstTotal}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            <td className="text-center txt-bld" colSpan="2">
              <CurrencyFormat
                value={usgstTotal}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            <td className="text-center txt-bld" colSpan="2">
              <CurrencyFormat
                value={igstTotal}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            <td key={Math.random()} className="text-right">
              <CurrencyFormat
                value={itemTotal}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
          </tr>
        </table>
        <section className={styles.subcontainer_2}>
          <div className={styles.wrapper_1}>
            <div className={styles.subwrapper_1}>
              <div>Amount Chargeable(in words)</div>
              <div>Whether Reverse charge applicable (Y/N)</div>
              <div>Supply of Service (Y/N)</div>
            </div>
            <div className={styles.subwrapper_2}>
              <div>
                <strong> INR- {converter.toWords(itemTotal)}</strong>
              </div>
              <div>N</div>
              <div>{item[0].itemisservc}</div>
            </div>
          </div>
          <div className={styles.wrapper_1}>
            <div
              className={styles.subwrapper_1}
              style={{ borderRight: "none" }}
            >
              <div>
                <h5 style={{ font: "bold" }}>Terms and Conditions</h5>
              </div>
              <h6 className="pad-top-10 font-12">
                1) Any dispute with the Invoice shall be informed within 15 days
                from the date of receipt of the Invoice
              </h6>

              <h6 className="pad-top-10 font-12">
                2) Payments shall be made by at par cheque / DD / ECS in the
                name of TVS Supply Chain Solutions Limited
              </h6>

              <h6 className="pad-top-10 font-12">
                3) Interest shall be charged at 18 % p.a on delayed payments
              </h6>

              <h6 className="pad-top-10 font-12">
                4) The Agreement terms and conditions, if any shall prevail over
                the above terms and conditions.
              </h6>
              <h6 className="pad-top-10 font-12">
                5) Payment Due In 30 Days From Invoice Date.
              </h6>
            </div>
            {/* <div className={styles.subwrapper_2}>
              <h6 className="pad-top-20">Signature:</h6>

              <h6 className="pad-top-20">Name:</h6>

              <h6 className="pad-top-10">Designation:</h6>
            </div> */}
          </div>
          <div className={styles.wrapper_1}>
            <div className={styles.subwrapper_1}>
              <h6 className="pad-top-10">
                <strong>Electronic Reference Number</strong>
              </h6>
              <h6 className="pad-top-10">
                <strong>
                  Certified that the particulars given above are true and
                  correct
                </strong>
              </h6>
            </div>
            <div className={styles.subwrapper_2}>
              <Barcode
                value="TVS SUPPLY CHAIN INVOICE"
                className="img-responsive pad-top-20"
                // style={{ height: "30px" }}
                height={30}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default EinvoiceTable;
