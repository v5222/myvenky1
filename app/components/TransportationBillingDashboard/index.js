import React from "react";
import styles from "./trbillingDashboard.module.scss";
import "./Table/Tbtable.scss";

// import { data } from "./data";
import { Tabs } from "antd";
import { Spin } from "antd";
import { apiURLTransportation } from "../../containers/App/services";
import Filterstyles from "./Filters/billingFilters.module.scss";
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

  handleFetch = (bodyOption) => {
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({
        // body: { ...bodyOption, ["eligibletype"]: value },
        body: { ...bodyOption },
      }),
    };

    fetch(apiURLTransportation, bodyoption)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.body.statuscode === 200) {
          this.setState({
            customerList1: [...this.state.customerList1, ...data.body.bodymsg],
            loading: false,
            isSave: true,
            spin: false,
            noData: false,
          });
        } else {
          this.setState({
            additionalChargeOutputList: [],
            customerList2: [],
            customerList1: [...this.state.customerList1],
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
    let tempfrom = this.state.selectDatefrom;
    let tempto = this.state.selectDatefrom;
    this.setState({
      loading: true,
      spin: true,
      invoiceProcess: false,
      isSave: false,
    });

    let bodyOption = {
      type: "S2BPENDING",

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
    console.log(moment(this.state.selectDateto).diff(moment(tempfrom), "days"));
    while (tempto !== this.state.selectDateto) {
      tempfrom = tempto;
      if (moment(this.state.selectDateto).diff(moment(tempfrom), "days") > 5) {
        tempto = moment(tempfrom)
          .add(5, "days")
          .format();
        bodyOption = {
          ...bodyOption,
          search: {
            ...bodyOption.search,
            fromdate: moment(tempfrom).format("YYYY-MM-DD"),
            todate: moment(tempto).format("YYYY-MM-DD"),
          },
        };
        this.handleFetch(bodyOption);
      } else {
        tempto = this.state.selectDateto;

        bodyOption = {
          ...bodyOption,
          search: {
            ...bodyOption.search,
            fromdate: moment(tempfrom).format("YYYY-MM-DD"),
            todate: moment(tempto).format("YYYY-MM-DD"),
          },
        };
        this.handleFetch(bodyOption);
      }
    }

    // this.handleFetch(bodyOption);
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
  componentDidUpdate() {
    console.log(this.state.customerList1, "from custlis");
  }

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
                <Option key="ALL" value="ALL">
                  All
                </Option>
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
                <Option key="ALL" value="ALL">
                  All
                </Option>
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
                <Option key="ALL" value="ALL">
                  All
                </Option>
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
                <Option key="ALL" value="ALL">
                  All
                </Option>
              </Select>
            </div>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Date and Range picker</div>
              <RangePicker
                bordered={true}
                allowClear={true}
                onChange={this.handleDateRange}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className={Filterstyles.container}>
            <div className={Filterstyles.wrapper} style={{ margin: "0 auto" }}>
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
                <Tabs defaultActiveKey="1" onChange={this.tabChange}>
                  <TabPane tab="Pending For Billing" key="1">
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
                                  Invoice Amount(₹){" "}
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
                                      {i.SHIP_TO_CUST}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.COST_CENTER}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.SHIP_TO_ID}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.routecode}
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {i.TVS_VCV_SCN_NO}
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
