import React, { useState, useEffect, useRef } from "react";
import MainLayout from "containers/common/MainLayout/index.js";
import styles from "./Einvoice.module.scss";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import ErrorBoundary from "components/ErrorBoundary";

import SearchOutlined from "@ant-design/icons/SearchOutlined";
import PrinterOutlined from "@ant-design/icons/PrinterOutlined";
import FileExcelOutlined from "@ant-design/icons/FileExcelOutlined";
import { Spin } from "antd";

import Input from "antd/lib/input";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from "react-to-print";
import InvoicePrint from "./InvoicePrint";
const { Option } = Select;
import ReactToPrint from "react-to-print";
import { message, Button } from "antd";

import SearchResult from "./SearchResult";
import NoResult from "./NoResult";

import { Link } from "react-router-dom";
import { apiURLEinvoice } from "containers/App/services.js";

import InvoiceUpload from "components/Einvoiceupload";
import DatePicker from "antd/lib/date-picker";
import { format } from "date-fns";

const { RangePicker } = DatePicker;
const urls =
  "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/";

const printUrl = apiURLEinvoice;

class Einvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isPrint: false,
      isActive: false,
      isPdf: false,
      isLoader: false,
      isSuccess: false,
      isError: false,
      dataItems: null,
      ItemsLength: 1,
      CompanyList: [],
      OUInstanceList: [],
      FinancialYearList: [],
      FinMonthList: [],
      FinBookList: [],
      SubTotalList: [],
      TotalList: [],
      QTyList: [],
      GrantTotal: 0,
      startDate: new Date(),
      endDate: new Date(),
      FormActivity: 1,
      selectStartDate: new Date(),
      selectEndDate: new Date(),
      invoicenofrom: "",
      invoicenoto: "",
      search: false,
      loading: false,
      selectValue: "",
      selectDatefrom: "",
      selectDateto: "",
      popUp: false,
    };
  }

  // componentDidMount() {
  //   fetch(urls + "1")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({
  //         CompanyList: data[0].POCompanyList,
  //       });
  //     });
  // }
  // handleChange = (date) => {
  //   this.setState({
  //     selectStartDate: date,
  //   });
  // };

  // handleChanges = (date) => {
  //   this.setState({
  //     selectEndDate: date,
  //   });
  // };

  handleSearch = (e) => {
    var ItemsLength = 0;
    var SubTotalList = [];
    var TotalList = [];

    this.setState({ loading: true });

    if (this.state.selectDatefrom && this.state.selectDateto) {
      let options = {
        method: "POST",
        body: JSON.stringify({
          body: {
            type: "INVOICEPRINT1",
            invoicenofrom: this.state.invoicenofrom,
            invoicenoto: this.state.invoicenoto,
            invoicenofromdate: this.state.selectDatefrom,
            invoicenotodate: this.state.selectDateto,
          },
        }),
      };
      fetch(printUrl, options)
        .then((res) => res.json())

        .then((data) => {
          console.log(data);

          this.setState({
            isSuccess: true,
            isError: false,
            dataItems: data.body.bodymsg,
            SubTotalList: SubTotalList,
            TotalList: TotalList,
            isActive: true,
            search: true,
            loading: false,
          });
        });
    } else {
      this.popUp();
    }
  };

  popUp = () => {
    message.info("Please select data range");
    this.setState({ loading: false });
  };

  handleInvoiceFrom = (e) => {
    this.setState({
      invoicenofrom: e.target.value,
    });
  };
  handleInvoiceTo = (e) => {
    this.setState({
      invoicenoto: e.target.value,
    });
  };
  handleDateRange = (value) => {
    const concat = value + "";
    const split = concat.split(",");
    console.log(format(new Date(split[0]), "yyyy-MM-dd"));
    console.log(format(new Date(split[1]), "yyyy-MM-dd"));

    this.setState({
      selectDatefrom: format(new Date(split[0]), "yyyy-MM-dd"),
      selectDateto: format(new Date(split[1]), "yyyy-MM-dd"),
    });
  };
  // BindOUInstance = () => {
  //   // var CompanyCode = document.getElementById("drpCompanyCode").value;
  //   fetch(
  //     "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/2"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           OUInstanceList: result[0].POOUInstanceList,
  //         });

  //         this.BindFinancialYear();
  //         this.BindFinanceBook();
  //       },
  //       (error) => { }
  //     );
  // };

  // BindFinancialYear = () => {
  //   // var CompanyCode = document.getElementById("drpCompanyCode").value;
  //   // var Ousplit = document.getElementById("drpOU").value;
  //   // var Ous = Ousplit.split("|")[0];
  //   fetch(
  //     "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/3"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           FinancialYearList: result[0].POFinYearList,
  //         });
  //         this.BindFinancialPeriod();
  //       },
  //       (error) => { }
  //     );
  // };

  // BindFinancialPeriod = () => {
  //   // var CompanyCode = document.getElementById("drpCompanyCode").value;
  //   // var FinYearCode = document.getElementById("drpFinYear").value;
  //   // var Ousplit = document.getElementById("drpOU").value;
  //   // var Ous = Ousplit.split("|")[0];
  //   fetch(
  //     "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/4"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           FinMonthList: result[0].POFinMonthList,
  //         });

  //         this.BindFinancialDates(result[0].POFinMonthList);
  //       },
  //       (error) => { }
  //     );
  // };

  // BindFinanceBook = () => {
  //   // var companyCode = document.getElementById("drpCompanyCode").value;
  //   // var Ousplit = document.getElementById("drpOU").value;
  //   // var Ous = Ousplit.split("|")[0];
  //   fetch(
  //     "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/5"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           FinBookList: result[0].POFinBookList,
  //         });
  //       },
  //       (error) => { }
  //     );
  // };

  // BindFinancialDates = (result) => {
  //   var stDate = result[0].FinMonthSTDateFormat;
  //   var etDate = result[0].FinMonthETDateFormat;
  //   var startDate = new Date(
  //     stDate.split("-")[2],
  //     Number(stDate.split("-")[1]) - 1,
  //     stDate.split("-")[0]
  //   );
  //   var endDate = new Date(
  //     etDate.split("-")[2],
  //     Number(etDate.split("-")[1]) - 1,
  //     etDate.split("-")[0]
  //   );
  //   this.setState({
  //     startDate: startDate,
  //     endDate: endDate,
  //     selectStartDate: startDate,
  //     selectEndDate: endDate,
  //   });
  // };

  // BindFinancialSelectedDates = (value) => {
  //   var EL = document.getElementById("drpFinPeriod").value;
  //   console.log(EL);
  //   var stDate = value.split(":")[0];
  //   var etDate = value.split(":")[1];
  //   var startDate = new Date(
  //     stDate.split("-")[2],
  //     Number(stDate.split("-")[1]) - 1,
  //     stDate.split("-")[0]
  //   );
  //   var endDate = new Date(
  //     etDate.split("-")[2],
  //     Number(etDate.split("-")[1]) - 1,
  //     etDate.split("-")[0]
  //   );
  //   this.setState({
  //     startDate: startDate,
  //     endDate: endDate,
  //     selectStartDate: startDate,
  //     selectEndDate: endDate,
  //   });
  // };

  // divHideShow = () => {
  //   this.setState({
  //     isActive: true,
  //     isPrint: true,
  //     isPdf: false,
  //     isLoader: true,
  //   });
  // };

  // divLoading = () => {
  //   this.setState({
  //     isLoader: false,
  //   });
  // };
  // handleDateRange = (dates) => {
  //   console.log(dates);
  // };

  handleSelect = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectValue: value,
    });
  };

  render() {
    const { logout, user } = this.props;
    const {
      CompanyList,
      OUInstanceList,
      FinBookList,
      FinancialYearList,
      FinMonthList,
      selectEndDate,
      startDate,
      endDate,
      isActive,
      dataItems,
    } = this.state;

    return (
      <ErrorBoundary logout={logout} user={user}>
        <MainLayout logout={logout} user={user}>
          <section className={styles.container}>
            <Row gutter={[20, 16]}>
              {/* Testing Changes  */}
              <Col span={5}>
                <div className={styles.label}>Dates</div>
                <RangePicker
                  allowClear={true}
                  onChange={this.handleDateRange}
                  style={{ width: "100%" }}
                  bordered={true}
                  format="DD-MM-YYYY"
                />
              </Col>

              <Col span={4}>
                <div className={styles.label}>Invoice No From</div>
                <Input
                  onChange={this.handleInvoiceFrom}
                  value={this.state.invoicenofrom}
                />
              </Col>
              <Col span={4}>
                <div className={styles.label}>Invoice No To</div>
                <Input
                  onChange={this.handleInvoiceTo}
                  value={this.state.invoicenoto}
                />
              </Col>
              <Col span={5}>
                <div className={styles.label}>Report Type</div>
                <Select onChange={this.handleSelect} style={{ width: "100%" }}>
                  <Option value="ORIGINAL FOR RECIPIENT">
                    ORIGINAL FOR RECIPIENT
                  </Option>
                  <Option value="DUPLICATE FOR TRANSPORTER">
                    DUPLICATE FOR TRANSPORTER
                  </Option>
                  <Option value="DUPLICATE FOR SUPPLIER">
                    DUPLICATE FOR SUPPLIER
                  </Option>
                  <Option value="TRIPLICATE FOR SUPPLIER">
                    TRIPLICATE FOR SUPPLIER
                  </Option>
                </Select>
              </Col>
              <Col span={2} style={{ marginRight: "5px" }}>
                <div className={styles.label} style={{ color: "transparent" }}>
                  Search
                </div>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
              </Col>
              <Col span={1}>
                <div className={styles.label} style={{ color: "transparent " }}>
                  Print
                </div>

                {isActive && (
                  <ReactToPrint
                    bodyClass={styles.reactPrintContent}
                    documentTitle="Invoice"
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return <Button icon={<PrinterOutlined />}>Print</Button>;
                    }}
                    content={() => this.invoiceRef}
                  />
                )}
              </Col>
              <Col span={1} style={{ marginLeft: "33px" }}>
                <div className={styles.label} style={{ color: "transparent" }}>
                  FileTemplate
                </div>
                <Button icon={<FileExcelOutlined />} type="primary">
                  <Link
                    to="../../images/FileTemp.xlsx"
                    target="_blank"
                    download
                    style={{ color: "white" }}
                  >
                    {" "}
                    File Template
                  </Link>
                </Button>
              </Col>
            </Row>
            <div>
              <InvoiceUpload />
            </div>

            <Row gutter={[20, 16]} />
          </section>
          {console.log(this.state)}
          {this.state.loading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <Spin size="large" />
              <div style={{ fontSize: "18px" }}>Loading Invoice</div>
            </div>
          ) : isActive ? (
            <section className={styles.container}>
              {this.state.dataItems.map((dataItems, i) => {
                return (
                  <NoResult>
                    <InvoicePrint
                      ref={(el) => (this.invoiceRef = el)}
                      data={dataItems}
                      key={i}
                      selectValue={this.state.selectValue}
                    />
                  </NoResult>
                );
              })}
            </section>
          ) : this.state.search == false ? (
            <div>
              <SearchResult />
            </div>
          ) : (
            <NoResult />
          )}
        </MainLayout>
      </ErrorBoundary>
    );
  }
}

export default Einvoice;
