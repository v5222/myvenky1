import React, { useState, useEffect, useRef } from "react";
import MainLayout from "containers/common/MainLayout/index.js";
import styles from "./Einvoice.module.scss";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import DatePicker from "react-datepicker";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import PrinterOutlined from "@ant-design/icons/PrinterOutlined";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from "react-to-print";
import InvoicePrint from "./InvoicePrint";
const { Option } = Select;
import ReactToPrint from "react-to-print";


const urls =
  "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/";
const printUrl =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/einvoicing";
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
      dataItems: {},
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
      invNo:''
    };
  }

  componentDidMount() {
    fetch(urls + "1")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          CompanyList: data[0].POCompanyList,
        });
      });
  }
  handleChange = (date) => {
    this.setState({
      selectStartDate: date,
    });
  };

  handleChanges = (date) => {
    this.setState({
      selectEndDate: date,
    });
  };

  handleSearch = (e) => {


    
   

    var ItemsLength = 0;
    var SubTotalList = [];
    var TotalList = [];
    if(this.state.invNo){
      let options = {
        method: "POST",
        body: JSON.stringify({ body: { type: "FILTERLISTREPORT",no:this.state.invNo } }),
      };
      fetch(printUrl, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "from Search");
          this.setState({
            isSuccess: true,
            isError: false,
            dataItems: data.body.bodymsg,
            SubTotalList: SubTotalList,
            TotalList: TotalList,
            isActive: true,
          });
        });

    }

   
    
  };

  handleInvoice =(e)=>{
    this.setState({
      invNo:e.target.value 
    })

    
  }
  BindOUInstance = () => {
    // var CompanyCode = document.getElementById("drpCompanyCode").value;
    fetch(
      "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/2"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            OUInstanceList: result[0].POOUInstanceList,
          });

          this.BindFinancialYear();
          this.BindFinanceBook();
        },
        (error) => {}
      );
  };

  BindFinancialYear = () => {
    // var CompanyCode = document.getElementById("drpCompanyCode").value;
    // var Ousplit = document.getElementById("drpOU").value;
    // var Ous = Ousplit.split("|")[0];
    fetch(
      "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/3"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            FinancialYearList: result[0].POFinYearList,
          });
          this.BindFinancialPeriod();
        },
        (error) => {}
      );
  };

  BindFinancialPeriod = () => {
    // var CompanyCode = document.getElementById("drpCompanyCode").value;
    // var FinYearCode = document.getElementById("drpFinYear").value;
    // var Ousplit = document.getElementById("drpOU").value;
    // var Ous = Ousplit.split("|")[0];
    fetch(
      "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/4"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            FinMonthList: result[0].POFinMonthList,
          });

          this.BindFinancialDates(result[0].POFinMonthList);
        },
        (error) => {}
      );
  };

  BindFinanceBook = () => {
    // var companyCode = document.getElementById("drpCompanyCode").value;
    // var Ousplit = document.getElementById("drpOU").value;
    // var Ous = Ousplit.split("|")[0];
    fetch(
      "https://api.tvslsl.in/CustomerApi/api/loginbased/BindLoginDetails/2/tvsuser/TVSLSL/FCY1920/5"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            FinBookList: result[0].POFinBookList,
          });
        },
        (error) => {}
      );
  };

  BindFinancialDates = (result) => {
    var stDate = result[0].FinMonthSTDateFormat;
    var etDate = result[0].FinMonthETDateFormat;
    var startDate = new Date(
      stDate.split("-")[2],
      Number(stDate.split("-")[1]) - 1,
      stDate.split("-")[0]
    );
    var endDate = new Date(
      etDate.split("-")[2],
      Number(etDate.split("-")[1]) - 1,
      etDate.split("-")[0]
    );
    this.setState({
      startDate: startDate,
      endDate: endDate,
      selectStartDate: startDate,
      selectEndDate: endDate,
    });
  };

  BindFinancialSelectedDates = (value) => {
    var EL = document.getElementById("drpFinPeriod").value;
    console.log(EL);
    var stDate = value.split(":")[0];
    var etDate = value.split(":")[1];
    var startDate = new Date(
      stDate.split("-")[2],
      Number(stDate.split("-")[1]) - 1,
      stDate.split("-")[0]
    );
    var endDate = new Date(
      etDate.split("-")[2],
      Number(etDate.split("-")[1]) - 1,
      etDate.split("-")[0]
    );
    this.setState({
      startDate: startDate,
      endDate: endDate,
      selectStartDate: startDate,
      selectEndDate: endDate,
    });
  };

  divHideShow = () => {
    this.setState({
      isActive: true,
      isPrint: true,
      isPdf: false,
      isLoader: true,
    });
  };

  divLoading = () => {
    this.setState({
      isLoader: false,
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
      <>
        <MainLayout logout={logout} user={user}>
          <section className={styles.container}>
            <Row gutter={[20, 16]}>
              {/* <Col span={4}>
                <div className={styles.label}>Company</div>
                <Select
                  style={{ width: "100%" }}
                  onChange={this.BindOUInstance}
                >
                  {CompanyList.map((item, index) => {
                    return (
                      <>
                        <Option key={item.CompanyCode} value={item.CompanyCode}>
                          {item.CompanyCode}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Col> */}
             {/** <Col span={4}>
                <div className={styles.label}>OU</div>
                <Select
                  style={{ width: "100%" }}
                  onChange={this.BindFinancialYear}
                >
                  {OUInstanceList.map((item, index) => {
                    return (
                      <>
                        <Option
                          key={item.OUInstanceName}
                          value={item.OUInstanceName}
                        >
                          {item.OUInstanceName}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Col>  */}
              {/* <Col span={4}>
                <div className={styles.label}>Finance Book</div>
                <Select style={{ width: "100%" }}>
                  {FinBookList.map((item, index) => {
                    return (
                      <>
                        <Option key={item.FB_ID} value={item.FB_ID}>
                          {item.FB_ID}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Col> */}
              {/* <Col span={4}>
                <div className={styles.label}>Financial Year</div>
                <Select
                  style={{ width: "100%" }}
                  onChange={this.BindFinancialPeriod}
                  id="drpFinYear"
                >
                  {FinancialYearList.map((item, index) => {
                    return (
                      <>
                        <Option key={item.FinYearCode} value={item.FinYearCode}>
                          {item.FinYearCode}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Col> */}
            {/*<Col span={4}>
                <div className={styles.label}>Financial Period</div>
                <Select
                  style={{ width: "100%" }}
                  id="drpFinPeriod"
                  onChange={(value) => this.BindFinancialSelectedDates(value)}
                >
                  {FinMonthList.map((item, index) => {
                    return (
                      <>
                        <Option
                          key={item.FinMonthSTDateFormat.toString()}
                          value={
                            item.FinMonthSTDateFormat.toString() +
                            ":" +
                            item.FinMonthETDateFormat.toString()
                          }
                        >
                          {item.FinDescription}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Col> */}  
              {/* <Col span={4}>
                <div className={styles.label}>Invoice Type</div>
                <Select style={{ width: "100%" }}>
                  <Option value="Contract Based">Contract Based</Option>
                  <Option value="Direct">Direct</Option>
                </Select>
              </Col> */}

              {/* Testing Changes  */}

              <Col span={3}>
                <div className={styles.label}>Date From</div>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={this.state.selectStartDate}
                  onChange={this.handleChange}
                  minDate={this.state.startDate}
                  maxDate={this.state.endDate}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </Col>
              <Col span={3}>
                <div className={styles.label}>Date To</div>
                <DatePicker
                  id="txtDateTo"
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  selected={this.state.selectEndDate}
                  onChange={this.handleChanges}
                  minDate={this.state.startDate}
                  maxDate={this.state.endDate}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </Col>
             {/* <Col span={4}>
                <div className={styles.label}>Customer Code From</div>
                <Input />
              </Col>
              <Col span={4}>
                <div className={styles.label}>Customer Code To</div>
                <Input />
              </Col>  */}
              <Col span={4}>
                <div className={styles.label}>Invoice No From</div>
                <Input 
                value={this.state.invNo}
                onChange={this.handleInvoice}
                />
              </Col>
             <Col span={4}>
                <div className={styles.label}>Invoice No To</div>
                <Input 
                  />
              </Col>   
              <Col span={6}>
                <div className={styles.label}>Report Type</div>
                <Select style={{ width: "100%" }}>
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
              <Col span={2}>
                <div className={styles.label} style={{ color: "transparent" }}>
                  dummy
                </div>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
              </Col>
              <Col span={2}>
                <div className={styles.label} style={{ color: "transparent " }}>
                  dummy
                </div>
                {/* <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                  Print
                </Button> */}
                {isActive && (
                  <ReactToPrint
                    bodyClass={styles.reactPrintContent}
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return <Button icon={<PrinterOutlined />}>Print</Button>;
                    }}
                    content={() => this.invoiceRef}
                  />
                )}
                </Col>
            </Row>
           {/* <Row gutter={[20, 16]}>
              <Col span={4}>
                <div className={styles.label}>Invoice No From</div>
                <Input 
                value={this.state.invNo}
                onChange={this.handleInvoice}
                />
              </Col>
             <Col span={4}>
                <div className={styles.label}>Invoice No To</div>
                <Input 
                  />
              </Col>   
              <Col span={8}>
                <div className={styles.label}>Report Type</div>
                <Select style={{ width: "100%" }}>
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
              <Col span={2}>
                <div className={styles.label} style={{ color: "transparent" }}>
                  dummy
                </div>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
              </Col>
              <Col span={2}>
                <div className={styles.label} style={{ color: "transparent " }}>
                  dummy
                </div>
                {/* <Button icon={<PrinterOutlined />} onClick={handlePrint}> ///this lines is already commented
                  Print
                </Button> //// closing will come here
                {isActive && (
                  <ReactToPrint
                    bodyClass={styles.reactPrintContent}
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return <Button icon={<PrinterOutlined />}>Print</Button>;
                    }}
                    content={() => this.invoiceRef}
                  />
                )}
                </Col>
            </Row>    */}

            <Row gutter={[20, 16]} />
          </section>

          {isActive && (
            <section className={styles.container}>
              <InvoicePrint
                ref={(el) => (this.invoiceRef = el)}
                data={dataItems}
              />
            </section>
          )}
        </MainLayout>
      </>
    );
  }
}

export default Einvoice;