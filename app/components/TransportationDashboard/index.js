import React from "react";
import styles from "./transportation.module.scss";
import "../TransportationDashboard/Table/TransportationDashboardTable.scss";

import { data } from "./data";
import { Tabs } from "antd";
import { Spin } from "antd";
import { apiURLTransportation } from "../../containers/App/services";
import Filterstyles from "../TransportationDashboard/Filters/FIlters.module.scss";
import Select from "antd/lib/select";
import { Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SaveOutlined } from "@ant-design/icons";
import { Empty } from "antd";
const { Option } = Select;
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
import moment from "moment";
const currentDate = moment().format("YYYY-MM-DD");
const startDate = moment().format("YYYY-MM-DD");
import { connect } from "react-redux";
import { format } from "date-fns";
import { Input } from "antd";
import { CUSTOMERCODE } from "../TransportationMasterDashboard/body";
import {
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  SyncOutlined,
} from "@ant-design/icons";
import _ from "lodash";

class TransportationDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customerList1: [],
      customerList2: [],
      costCenter: [],
      billToId: [],
      selectDatefrom: null,
      selectDateto: null,
      loading: false,
      billType: "",
      customerCode: [],
      billingCodeList: [],
      costCenterList: [],
      tCustomerCode: "",
      routecodeList: [],
      tCostCenter: "",
      tBillingId: "",
      tRouteCode: "",
      billTypeList: [],
      additionalChargeOutputList: [],
      isSave: false,
      analysiscodeList: [],
      analysiscode: "",
      owntaxregion: "",
      owntaxregionList: [],
      shiptoid: "",
      loading: null,
      tollCharges: null,
      halting: null,
      doubleDriver: null,
      multiPoint: null,
      oda: null,
      otherCharges: null,
      spin: false,
      noData: true,
      invoiceProcess: false,
    };
  }

  componentDidMount() {
    let customercode = {
      method: "POST",
      body: JSON.stringify(CUSTOMERCODE),
    };

    fetch(apiURLTransportation, customercode)
      .then((res) => res.json())
      .then((data) => {
        console.log("datacustomer", data);
        this.setState({
          customerCode: data.body.bodymsg.customercode,
        });
      });
    console.log(this.state.customerCode);
  }

  handleCustomerChange = (value) => {
    let customercodeoption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "BILLINGDDLCOSTCENTER",
          email: this.props.userEmail,
          customercode: value,
        },
      }),
    };

    fetch(apiURLTransportation, customercodeoption)
      .then((res) => res.json())
      .then((data) => {
        console.log("datacustomer", data);
        this.setState({
          costCenterList: data.body.bodymsg.costcenter,
          billingCodeList: data.body.bodymsg.billtoid,
          billTypeList: data.body.bodymsg.billtype,
          analysiscodeList: data.body.bodymsg.analysiscode,
          owntaxregionList: data.body.bodymsg.owntaxregion,
          tCustomerCode: value,
        });
      });
  };
  handleCostCenterChange = (value) => {
    let costcenteroption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "BILLINGDDLROUTECODE",
          costcenter: value,
          email: this.props.userEmail,
        },
      }),
    };

    fetch(apiURLTransportation, costcenteroption)
      .then((res) => res.json())
      .then((data) => {
        console.log("costcenter", data);
        this.setState({
          routecodeList: data.body.bodymsg.routecode,
          tCostCenter: value,
        });
      });
  };

  handleBillIdChange = (value) => {
    this.setState({
      tBillingId: value,
    });
  };
  handleRouteCodeChange = (value) => {
    this.setState({
      tRouteCode: value,
    });
  };
  handleBillingTypeChange = (value) => {
    this.setState({
      billType: value,
    });
  };
  handleAnalysisCodeChange = (value) => {
    this.setState({
      analysiscode: value,
    });
  };
  handleOwnTaxRegion = (value) => {
    this.setState({
      owntaxregion: value,
    });
  };
  handleShipToId = (value) => {
    this.setState({
      shiptoid: value,
    });
  };

  handleFetch = (tab, value, bodyOption) => {
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({
        // body: { ...bodyOption, ["eligibletype"]: value },
        body: { ...bodyOption },
      }),
    };
    console.log(value);

    fetch(apiURLTransportation, bodyoption)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.body.statuscode === 200) {
          if (tab === 1) {
            this.setState({
              additionalChargeOutputList: data.body.bodymsg.additionalcharges,
              customerList2: data.body.bodymsg.noteligible,
              customerList1: data.body.bodymsg.eligible,
              loading: false,
              isSave: true,
              spin: false,
              noData: false,
            });
          } else if (tab === 2) {
            this.setState({
              additionalChargeOutputList: data.body.bodymsg.additionalcharges,
              customerList2: data.body.bodymsg.noteligible,
              loading: false,
              isSave: true,
              spin: false,
              noData: false,
            });
          }
        } else {
          this.setState({
            additionalChargeOutputList: [],
            customerList2: [],
            customerList1: [],
            loading: true,
            isSave: false,
            spin: false,
            noData: true,
          });
          // alert(data.body.bodymsg);
          this.info(data.body.bodymsg);
        }
      });
  };
  info = (data) => {
    message.info(data);
  };

  handleSearch = () => {
    this.setState({
      loading: true,
      spin: true,
      invoiceProcess: false,
      isSave: false,
    });

    let bodyOption = {
      type: "S2B",

      email: this.props.userEmail,
      search: {
        customercode: this.state.tCustomerCode,
        costcenter: this.state.tCostCenter,
        routecode: this.state.tRouteCode,
        billingtype: this.state.billType,
        analysiscode: this.state.analysiscode,
        billtoid: this.state.tBillingId,
        shiptoid: this.state.shiptoid,
        owntaxregion: this.state.owntaxregion,
        fromdate: this.state.selectDatefrom,
        todate: this.state.selectDateto,
      },
    };
    console.log("bodyoption", bodyOption);

    this.handleFetch(1, "1", bodyOption);
    // this.handleFetch(2, "0", bodyOption);
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

  handleSave = (val) => {
    let saveoption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "ADDITIONALCHARGESINSERT",
          email: this.props.userEmail,
          search: {
            customercode: this.state.tCustomerCode,
            costcenter: this.state.tCostCenter,
            routecode: this.state.tRouteCode,
            billingtype: this.state.billType,
            analysiscode: this.state.analysiscode,
            billtoid: this.state.tBillingId,
            shiptoid: this.state.shiptoid,
            owntaxregion: this.state.owntaxregion,
            fromdate: this.state.selectDatefrom,
            todate: this.state.selectDateto,
          },

          output: this.state.additionalChargeOutputList,
        },
      }),
    };

    fetch(apiURLTransportation, saveoption)
      .then((res) => res.json())
      .then((data) => {
        console.log("insert", data);
        console.log(this.state.additionalChargeOutputList);
        this.setState({
          isSave: true,
          additionalChargeOutputList: data.body.bodymsg.additionalcharges,
          customerList1: data.body.bodymsg.eligible,
        });
      });
  };

  handleInput = (e, billingkey) => {
    console.log(billingkey, "billingkey");
    let temp = [...this.state.additionalChargeOutputList];
    temp = temp.map((i) => {
      if (i.billingkey === billingkey) {
        console.log(i, "i");
        console.log(e.target.name);
        i = { ...i, [e.target.name]: e.target.value };

        return i;
      } else {
        return i;
      }
    });
    this.setState({
      additionalChargeOutputList: temp,
    });

    console.log(additionalChargeOutputList);
  };

  processInvoice = (e) => {
    this.setState({
      invoiceProcess: true,
    });
    let processOption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "INVOICEPROCESS",
          email: "dev.support8@tvslsl.in",
          search: {
            customercode: this.state.tCustomerCode,
            costcenter: this.state.tCostCenter,
            routecode: this.state.tRouteCode,
            billingtype: this.state.billType,
            analysiscode: this.state.analysiscode,
            billtoid: this.state.tBillingId,
            shiptoid: this.state.shiptoid,
            owntaxregion: this.state.owntaxregion,
            fromdate: this.state.selectDatefrom,
            todate: this.state.selectDateto,
          },
        },
      }),
    };

    fetch(apiURLTransportation, processOption)
      .then((res) => res.json())
      .then((data) => {
        let newData = [...this.state.customerList1];
        if (data.body !== undefined) {
          newData = newData.map((i) => {
            let index = _.findIndex(data.body.bodymsg, function(o) {
              return o.billingkey == i.billingkey;
            });
            if (index !== -1) {
              return { ...i, ...data.body.bodymsg[index] };
            } else {
              return i;
            }
          });
        }
        console.log(newData);
        this.setState({
          isSave: true,
          customerList1: newData,
        });
      });
  };

  render() {
    const { invoiceProcess } = this.state;
    return (
      <div className={styles.container}>
        <>
          <div className={Filterstyles.container}>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Customer code</div>
              <Select
                className={Filterstyles.select}
                onChange={this.handleCustomerChange}
                defaultValue="Select"
                // value={this.state.tCustomerCode}
              >
                {this.state.customerCode.map((i, index) => {
                  return (
                    <>
                      <Option title="customer_name" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>

            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Cost center</div>
              <Select
                className={Filterstyles.select}
                onChange={this.handleCostCenterChange}
                defaultValue="Select"
              >
                {this.state.costCenterList.map((i, index) => {
                  return (
                    <>
                      <Option title="cost_center" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>

            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Route Code</div>
              <Select
                defaultValue="Select"
                onChange={this.handleRouteCodeChange}
                className={Filterstyles.select}
              >
                {this.state.routecodeList.map((i, index) => {
                  return (
                    <>
                      <Option title="route_code" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Billing type</div>
              <Select
                defaultValue="Select"
                onChange={this.handleBillingTypeChange}
                className={Filterstyles.select}
              >
                {this.state.billTypeList.map((i, index) => {
                  return (
                    <>
                      <Option title="bill_type" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Date and Range picker</div>
              <RangePicker
                bordered={true}
                allowClear={true}
                // value={this.state.selectDate}
                onChange={this.handleDateRange}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className={Filterstyles.container}>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Own tax region</div>
              <Select
                className={Filterstyles.select}
                onChange={this.handleOwnTaxRegion}
                defaultValue="Select"
              >
                {this.state.owntaxregionList.map((i, index) => {
                  return (
                    <>
                      <Option title="own_tax" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Bill to ID</div>
              <Select
                className={Filterstyles.select}
                onChange={this.handleBillIdChange}
                defaultValue="Select"
              >
                {this.state.billingCodeList.map((i, index) => {
                  return (
                    <>
                      <Option title="bill_toid" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>

            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Ship to ID</div>
              <Select
                className={Filterstyles.select}
                onChange={this.handleShipToId}
                defaultValue="Select"
              >
                {this.state.billingCodeList.map((i, index) => {
                  return (
                    <>
                      <Option title="bill_toid" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Analysis Code</div>
              <Select
                className={Filterstyles.select}
                onChange={this.handleAnalysisCodeChange}
                defaultValue="Select"
              >
                {this.state.analysiscodeList.map((i, index) => {
                  return (
                    <>
                      <Option title="analysis_code" value={i} key={index}>
                        {i}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className={Filterstyles.wrapper}>
              <div
                className={Filterstyles.title}
                style={{ color: "transparent" }}
              >
                Billing type
              </div>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={this.handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          <div>
            <div>
              <div style={{ margin: "0px 25px" }}>
                <Tabs defaultActiveKey="0" onChange={this.tabChange}>
                  <TabPane tab="Additional Charges" key="0">
                    <div className="tvsit-dwmdashboard_table">
                      <div className="tabel_scroll">
                        {
                          <table style={{ border: "1px solid #c1e3ff" }}>
                            <thead>
                              <tr>
                                <th style={{ width: "6%", fontSize: "10px" }}>
                                  Customer Code
                                </th>
                                <th style={{ width: "6%", fontSize: "10px" }}>
                                  {" "}
                                  Cost center
                                </th>
                                <th style={{ width: "6%", fontSize: "10px" }}>
                                  Bill to Id
                                </th>
                                <th style={{ width: "6%", fontSize: "10px" }}>
                                  Route Code
                                </th>
                                <th style={{ width: "6%", fontSize: "10px" }}>
                                  {" "}
                                  Ref Doc{" "}
                                </th>
                                <th style={{ width: "6%", fontSize: "10px" }}>
                                  Freight Revenue(???){" "}
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  {" "}
                                  Loading / Unloading
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  Toll charges
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  Halting
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  Double Driver
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  Multi point delivery
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  ODA / Docket charges
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  Other charges
                                </th>
                                <th style={{ width: "8%", fontSize: "10px" }}>
                                  Total Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.spin ? (
                                <tr>
                                  <td
                                    style={{ width: "6%", fontSize: "10px" }}
                                  />
                                  <td style={{ width: "6%", fontSize: "10px" }}>
                                    {" "}
                                  </td>
                                  <td
                                    style={{ width: "6%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "6%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "6%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "6%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "8%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "6%", fontSize: "10px" }}
                                  />
                                  <td style={{ width: "8%", fontSize: "10px" }}>
                                    {" "}
                                    <Spin size="large" />
                                  </td>
                                  <td
                                    style={{ width: "8%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "8%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "8%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "8%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "8%", fontSize: "10px" }}
                                  />
                                  <td
                                    style={{ width: "8%", fontSize: "10px" }}
                                  />
                                </tr>
                              ) : this.state.noData ? (
                                <tr>
                                  <td colSpan={14}>
                                    <h1
                                      style={{
                                        color: "#00000047",
                                        fontWeight: "100",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <Empty />
                                    </h1>
                                  </td>
                                </tr>
                              ) : (
                                this.state.additionalChargeOutputList.map(
                                  (i, index) => {
                                    return (
                                      <tr key={index}>
                                        <td
                                          style={{
                                            width: "6%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {i.customercode}
                                        </td>
                                        <td
                                          style={{
                                            width: "6%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {i.costcenter}
                                        </td>
                                        <td
                                          style={{
                                            width: "6%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {i.billtoid}
                                        </td>
                                        <td
                                          style={{
                                            width: "6%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {i.routecode}
                                        </td>
                                        <td
                                          style={{
                                            width: "6%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {i.refdocno}
                                        </td>
                                        <td
                                          style={{
                                            width: "6%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {i.freightrevenue}
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <Input
                                            placeholder="Loading/Unloading"
                                            type="number"
                                            name="loadingunloading"
                                            value={i.loadingunloading}
                                            onChange={(e) =>
                                              this.handleInput(e, i.billingkey)
                                            }
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <Input
                                            placeholder="Toll Charges"
                                            type="number"
                                            name="tollcharges"
                                            value={i.tollcharges}
                                            onChange={(e) =>
                                              this.handleInput(e, i.billingkey)
                                            }
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <Input
                                            placeholder="Halting"
                                            type="number"
                                            name="halting"
                                            value={i.halting}
                                            onChange={(e) =>
                                              this.handleInput(e, i.billingkey)
                                            }
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <Input
                                            placeholder="Double driver"
                                            type="number"
                                            name="doubledriver"
                                            value={i.doubledriver}
                                            onChange={(e) =>
                                              this.handleInput(e, i.billingkey)
                                            }
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <Input
                                            placeholder="Multi point delivery"
                                            type="number"
                                            name="multipointdelivery"
                                            value={i.multipointdelivery}
                                            onChange={(e) =>
                                              this.handleInput(e, i.billingkey)
                                            }
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <Input
                                            placeholder="ODA / Docket charges"
                                            type="number"
                                            name="odadocketcharges"
                                            value={i.odadocketcharges}
                                            onChange={(e) =>
                                              this.handleInput(e, i.billingkey)
                                            }
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <Input
                                            placeholder="Other Charges"
                                            type="number"
                                            name="othercharges"
                                            value={i.othercharges}
                                            onChange={(e) =>
                                              this.handleInput(e, i.billingkey)
                                            }
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: "8%",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {parseInt(i.freightrevenue) +
                                            parseInt(i.halting) +
                                            parseInt(i.doubledriver) +
                                            parseInt(i.multipointdelivery) +
                                            parseInt(i.othercharges) +
                                            parseInt(i.tollcharges) +
                                            parseInt(i.loadingunloading) +
                                            parseInt(i.odadocketcharges)}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              )}
                            </tbody>
                            {this.state.isSave ? (
                              <tfoot>
                                <tr>
                                  <td colSpan={13} />
                                  <td>
                                    <Button
                                      type="primary"
                                      icon={<SaveOutlined />}
                                      style={{ marginTop: "10px" }}
                                      onClick={this.handleSave}
                                    >
                                      Save
                                    </Button>
                                  </td>
                                </tr>
                              </tfoot>
                            ) : null}
                          </table>
                        }
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Ready for billing" key="1">
                    <div className="tvsit-dwmdashboard_table">
                      <div className="tabel_scroll">
                        {
                          <table style={{ border: "1px solid #c1e3ff" }}>
                            <thead>
                              <tr>
                                <th style={{ width: "15%" }}>Customer Code </th>
                                <th style={{ width: "15%" }}>Cost Center </th>
                                <th style={{ width: "15%" }}>Bill To Id </th>
                                <th style={{ width: "15%" }}>Route Code </th>
                                <th style={{ width: "15%" }}>Ref Doc </th>
                                <th style={{ width: "15%" }}>
                                  Invoice Amount(???){" "}
                                </th>
                                {invoiceProcess && (
                                  <>
                                    <th style={{ width: "15%" }}>Invoice No</th>
                                    <th style={{ width: "15%" }}>Status</th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.spin ? (
                                <tr>
                                  <td style={{ width: "15%" }} />
                                  <td style={{ width: "15%" }} />
                                  <td style={{ width: "15%" }} />
                                  <td style={{ width: "15%" }}>
                                    {" "}
                                    <Spin size="large" />
                                  </td>
                                  <td style={{ width: "15%" }} />
                                  <td style={{ width: "15%" }} />
                                </tr>
                              ) : this.state.noData ? (
                                <tr>
                                  <td colSpan={14}>
                                    <h1
                                      style={{
                                        color: "#00000047",
                                        fontWeight: "100",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <Empty />
                                    </h1>
                                  </td>
                                </tr>
                              ) : (
                                this.state.customerList1.map((i, index) => (
                                  <tr>
                                    <td style={{ width: "15%" }}>
                                      {i.customercode}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.costcenter}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.billtoid}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.routecode}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.refdocno}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.invoiceamount}
                                    </td>
                                    {invoiceProcess && (
                                      <>
                                        <td style={{ width: "15%" }}>
                                          {i.isinvoicegenerated == undefined ? (
                                            <SyncOutlined spin />
                                          ) : i.isinvoicegenerated ? (
                                            i.invoicenumber
                                          ) : (
                                            "Error"
                                          )}
                                        </td>
                                        <td style={{ width: "15%" }}>
                                          {i.isinvoicegenerated == undefined ? (
                                            <SyncOutlined spin />
                                          ) : i.isinvoicegenerated ? (
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                          ) : (
                                            <CloseCircleTwoTone twoToneColor="#bf1000" />
                                          )}
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                ))
                              )}
                            </tbody>
                            {this.state.isSave ? (
                              <tfoot>
                                <tr>
                                  <td colSpan={5} />
                                  <td>
                                    <Button
                                      type="primary"
                                      icon={<SaveOutlined />}
                                      style={{ marginTop: "10px" }}
                                      onClick={this.processInvoice}
                                    >
                                      Processing Invoice
                                    </Button>
                                  </td>
                                </tr>
                              </tfoot>
                            ) : null}
                          </table>
                        }
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Not eligible for billing" key="2">
                    <div className="tvsit-dwmdashboard_table">
                      <div className="tabel_scroll">
                        {
                          <table style={{ border: "1px solid #c1e3ff" }}>
                            <thead>
                              <tr>
                                <th style={{ width: "15%" }}>Customer Code </th>
                                <th style={{ width: "15%" }}>Cost Center </th>
                                <th style={{ width: "15%" }}>Bill To Id </th>
                                <th style={{ width: "15%" }}>Route Code </th>

                                <th style={{ width: "15%" }}>Ref Doc </th>
                                <th style={{ width: "15%" }}>
                                  Invoice Amount(???){" "}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.spin ? (
                                <div
                                  style={{
                                    marginLeft: "310%",
                                    marginTop: "50%",
                                  }}
                                >
                                  {" "}
                                  <Spin size="large" />{" "}
                                </div>
                              ) : this.state.noData ? (
                                <tr>
                                  <td colSpan={14}>
                                    <h1
                                      style={{
                                        color: "#00000047",
                                        fontWeight: "100",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <Empty />
                                    </h1>
                                  </td>
                                </tr>
                              ) : (
                                this.state.customerList2.map((i, index) => (
                                  <tr>
                                    <td style={{ width: "15%" }}>
                                      {i.customercode}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.costcenter}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.billtoid}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.routecode}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.refdocno}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.invoiceamount}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        }
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
)(TransportationDashboard);
