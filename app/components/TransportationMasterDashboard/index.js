import React, { useState } from "react";
import styles from "./transportation.module.scss";
import "../TransportationMasterDashboard/Table/TransportationDashboardTable.scss";
import { Tabs } from "antd";
import { Spin } from "antd";
import Select from "antd/lib/select";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
import { DatePicker, Space } from "antd";
const { TabPane } = Tabs;
import { Input } from "antd";
import { BILLINGBASIS, INVOICETYPE, REFDOC } from "./body";
import { connect } from "react-redux";

class TransportationMasterDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      billingBasis: [],
      refDocType: [],
      invoiceType: [],
      saleContract: [],
      costCenter: "",
      customerCode: "",
      customerName: "",
      tempbillingBasis: "",
      temprefDocType: "",
      tempinvoiceType: "",
      viewDetailList: [],
      isSave: false,
      message: "",
      accountusage: "",
    };
  }

  componentDidMount() {
    let configure = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "DDL",
          email: this.props.userEmail,
        },
      }),
    };

    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/transportationbilling",
      configure
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          refDocType: data.body.bodymsg.refdoctype,
          billingBasis: data.body.bodymsg.billingbasis,
          invoiceType: data.body.bodymsg.invoicetype,
        });
      });
    this.handleViewDetails();
    console.log("email", this.props.userEmail);
  }
  salecontractChange = (e) => {
    this.setState({
      saleContract: e.target.value,
    });

    let salecontractoption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "SALECONTRACT",
          email: this.props.userEmail,

          salecontract: e.target.value,
        },
      }),
    };
    console.log(salecontractoption);

    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/transportationbilling",
      salecontractoption
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("change", data);
        if (data.body.statuscode === 200) {
          this.setState({
            costCenter: data.body.bodymsg.costcenter,
            customerCode: data.body.bodymsg.customercode,
            customerName: data.body.bodymsg.customername,
          });
        } else {
          this.setState({
            message: data.body.bodymsg,
          });
          this.info(this.state.message);
        }
      });
  };

  info = (data) => {
    message.info(data);
  };

  handleSave = () => {
    let saleContractSave = this.state.saleContract;
    let customerCodeSave = this.state.customerCode;
    let costCenterSave = this.state.costCenter;
    let billingBasisSave = this.state.tempbillingBasis;
    let refDocSave = this.state.temprefDocType;
    let invoiceLogic = this.state.tempinvoiceType;
    let accountusage = this.state.accountusage;

    let saveoption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "SALECONTRACTINSERT",
          email: this.props.userEmail,

          output: [
            {
              salecontractno: saleContractSave,
              customercode: customerCodeSave,
              customername: this.state.customerName,
              costcenter: costCenterSave,
              refdoctype: refDocSave,
              billingbasis: billingBasisSave,
              invoicetype: invoiceLogic,
              accountusage: accountusage,
            },
          ],
        },
      }),
    };

    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/transportationbilling",
      saveoption
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.handleViewDetails();
        this.setState({
          isSave: true,
        });
        this.handleRefresh();
      });
  };
  handleRefresh = () => {
    window.location.reload(false);
  };

  handleViewDetails = () => {
    let saveoption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "SALECONTRACTSELECT",
          email: this.props.userEmail,
        },
      }),
    };

    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/transportationbilling",
      saveoption
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("view", data);
        this.setState({
          viewDetailList: data.body.bodymsg,
        });
      });
  };

  handlerefdoctype = (value) => {
    this.setState({
      temprefDocType: value,
    });
  };
  handlebillingbasis = (value) => {
    this.setState({
      tempbillingBasis: value,
    });
  };
  handleinvoicetype = (value) => {
    this.setState({
      tempinvoiceType: value,
    });
  };
  handleaccountusage = (e) => {
    this.setState({
      accountusage: e.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      isSave: false,
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <>
          <div>
            <div>
              <div style={{ margin: "0px 25px" }}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Enter Data" key="1">
                    <div className="tvsit-dwmdashboard_table">
                      <div className="tabel_scroll">
                        <table style={{ border: "1px solid #c1e3ff" }}>
                          <thead>
                            <tr>
                              <th style={{ width: "12%" }}>Sale contract </th>
                              <th style={{ width: "12%" }}>Customer Code</th>
                              <th style={{ width: "12%" }}>Cost Center </th>
                              <th style={{ width: "12%" }}>Ref Doc </th>
                              <th style={{ width: "12%" }}>Billing basis </th>
                              <th style={{ width: "12%" }}>Invoice Logic</th>
                              <th style={{ width: "12%" }}>Account Usage</th>
                              <th style={{ width: "5%" }} />
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ width: "12%" }}>
                                <Input
                                  placeholder="Sale contract"
                                  onChange={this.salecontractChange}
                                  value={this.state.saleContract}
                                />
                              </td>
                              <td style={{ width: "12%" }}>
                                <Input
                                  placeholder="Customer Code"
                                  value={this.state.customerCode}
                                  disabled
                                />
                              </td>
                              <td style={{ width: "12%" }}>
                                <Input
                                  placeholder="cost center"
                                  value={this.state.costCenter}
                                  disabled
                                />
                              </td>
                              <td style={{ width: "12%" }}>
                                <Select
                                  placeholder="Select"
                                  style={{ width: 160 }}
                                  onChange={this.handlerefdoctype}
                                >
                                  {this.state.refDocType.map((i, index) => {
                                    return (
                                      <>
                                        <Option
                                          title="ref_doc"
                                          value={i}
                                          key={index}
                                        >
                                          {i}
                                        </Option>
                                      </>
                                    );
                                  })}
                                </Select>
                              </td>
                              <td style={{ width: "12%" }}>
                                <Select
                                  placeholder="Select"
                                  style={{ width: 160 }}
                                  onChange={this.handlebillingbasis}
                                >
                                  {this.state.billingBasis.map((i, index) => {
                                    {
                                      console.log(i, index);
                                    }
                                    return (
                                      <>
                                        <Option
                                          title="billing_basis"
                                          value={i}
                                          key={index}
                                        >
                                          {i}
                                        </Option>
                                      </>
                                    );
                                  })}
                                </Select>
                              </td>
                              <td style={{ width: "12%" }}>
                                <Select
                                  placeholder="Select"
                                  style={{ width: 170 }}
                                  onChange={this.handleinvoicetype}
                                >
                                  {this.state.invoiceType.map((i, index) => {
                                    return (
                                      <>
                                        <Option
                                          title="invoice_type"
                                          value={i}
                                          key={index}
                                        >
                                          {i}
                                        </Option>
                                      </>
                                    );
                                  })}
                                </Select>
                              </td>
                              <td style={{ width: "12%" }}>
                                <Input
                                  placeholder="Account usage"
                                  onChange={this.handleaccountusage}
                                />
                              </td>
                              <td style={{ width: "5%" }}>
                                <Button
                                  type="primary"
                                  icon={<PlusOutlined />}
                                  onClick={this.handleSave}
                                >
                                  Save
                                </Button>
                                {this.state.isSave && (
                                  <p
                                    style={{
                                      marginTop: "3px",
                                      color: "#123F74",
                                    }}
                                  >
                                    Saved successfully
                                  </p>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="View Data" key="2">
                    <div className="tvsit-dwmdashboard_table">
                      <div className="tabel_scroll">
                        <table style={{ border: "1px solid #c1e3ff" }}>
                          <thead>
                            <tr>
                              <th style={{ width: "5%" }}>##</th>
                              <th style={{ width: "12%" }}>Sale contract</th>
                              <th style={{ width: "12%" }}>Customer code</th>
                              <th style={{ width: "12%" }}>Cost Center </th>
                              <th style={{ width: "12%" }}>Ref Doc </th>
                              <th style={{ width: "12%" }}>Billing basis </th>
                              <th style={{ width: "12%" }}>Invoice Logic</th>
                              <th style={{ width: "12%" }}>Account Usage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.viewDetailList.map((i, index) => {
                              return (
                                <tr>
                                  <td style={{ width: "5%" }}>{index + 1}</td>
                                  <td style={{ width: "12%" }}>
                                    {i.salecontractno}
                                  </td>
                                  <td style={{ width: "12%" }}>
                                    {i.customercode}
                                  </td>
                                  <td style={{ width: "12%" }}>
                                    {i.costcenter}
                                  </td>
                                  <td style={{ width: "12%" }}>
                                    {i.refdoctype}
                                  </td>
                                  <td style={{ width: "12%" }}>
                                    {i.billingbasis}
                                  </td>
                                  <td style={{ width: "12%" }}>
                                    {i.invoicetype}
                                  </td>
                                  <td style={{ width: "12%" }}>
                                    {i.accountusage}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  // userEmail:state.global.userRole.length > 0  ? state.global.userRole[0].usertype === "TVSUSER" ? true:false:true ,
  userEmail: state.global.userEmail,
});

export default connect(
  mapStateToProps,
  null
)(TransportationMasterDashboard);

// export default TransportationMasterDashboard;
