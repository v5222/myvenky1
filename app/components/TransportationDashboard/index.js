import React, { useState } from "react";
import styles from "./transportation.module.scss";
import "../TransportationDashboard/Table/TransportationDashboardTable.scss";
import Filters from "./Filters";
import Table from "./Table";
import { data } from './data'
import { Tabs } from 'antd';
import { Spin } from "antd";
import { apiURLTransportation } from "../../containers/App/services";
import Filterstyles from "../TransportationDashboard/Filters/FIlters.module.scss";
import Select from "antd/lib/select";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
import moment from "moment";
const currentDate = moment().format("YYYY-MM-DD");
const startDate = moment()
  .format("YYYY-MM-DD");

import { format } from 'date-fns'



class TransportationDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customerList: [],
      costCenter: [],
      billToId: [],
      selectDatefrom: null,
      selectDateto: null,
      loading: false
    }

  }



  handleChange = (value) => {

    document.getElementById("hdncustomercode").value = value;
    // let c = document.getElementById("hdncustomercode").value;
    // console.log(c)

    if (value === "KOVEXTNUD4") {
      const a = [{
        cost_center: "KOVTPT3225"

      }]
      const b = [
        { bill_toid: "AYAN36" },

        { bill_toid: "ORAG38" },
        { bill_toid: "PILL10" },
        { bill_toid: "SALI10" },
        { bill_toid: "TNCECL" },
        { bill_toid: "VADA29" },

      ]
      this.setState({
        costCenter: a,
        billToId: b
      })
    }
    else if (value === "ERCEXPUNTG") {
      const a = [
        { cost_center: "ERCTPT3245" },
        { cost_center: "ERCTPT3314" }
      ]
      const b = [

        { bill_toid: "GURU04" },
        { bill_toid: "MAHA41" },
        { bill_toid: "MUMBA3" },
        { bill_toid: "VIMA04" },


      ]
      this.setState({
        costCenter: a,
        billToId: b
      })
    }
    else if (value === "OTIEXHOSJM") {

      const a = [
        { cost_center: "OTIAWH3149" },
        { cost_center: "OTITPT3229" },
        { cost_center: "OTITPT3302" },
        { cost_center: "OTIAWH3128" },
        { cost_center: "OTITPT3156" }

      ]

      const b = [
        { bill_toid: "BHAN04" },
        { bill_toid: "BORI01" },
        { bill_toid: "GURGD9" },
        { bill_toid: "JAIP38" },
        { bill_toid: "JHCECL" },
        { bill_toid: "JIGA10" },
        { bill_toid: "KIAD12" },
        { bill_toid: "KOLK82" },
        { bill_toid: "LAKI01" },
        { bill_toid: "LUCK27" },
        { bill_toid: "LUDH37" },
        { bill_toid: "NAGO02" },
        { bill_toid: "PITA01" },
        { bill_toid: "RANC20" },
        { bill_toid: "SHAN12" },
        { bill_toid: "SOMA13" }
      ]
      this.setState({
        costCenter: a,
        billToId: b
      })


    }
    else {
      const a = [{
        cost_center: "",
      }]
      const b = [{
        bill_toid: ""
      }]
      this.setState({
        costCenter: a,
        billToId: b
      })
    }

  }


  costCenterChange = (value) => {
    document.getElementById("hdncostcenter").value = value;


  }

  billIdChange = (value) => {
    document.getElementById("hdnbilltoid").value = value;


  }

  handleSearch = () => {
    this.setState({ loading: true })
    let customerCode = document.getElementById("hdncustomercode").value;
    let costCenter = document.getElementById("hdncostcenter").value;
    let billToId = document.getElementById("hdnbilltoid").value;
    let fromDate = document.getElementById("hdnfromdate").value
    let toDate = document.getElementById("hdntodate").value

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({

        body:
        {
          type: "S2B",
          ctxt_ouinstance: "2",
          ctxt_user: "027266",
          billtocustomercode: customerCode,
          customercostcenter: costCenter,
          customerbilltoid: billToId,
          invoicegenerationtype: "One VCV - One Invoice",
          // refdocdatefrom: "2020-06-01",
          refdocdatefrom: this.state.selectDatefrom,
          // refdocdateto: "2020-10-21",
          refdocdateto: this.state.selectDateto,
          refdoctype: "VBR",
          invoicecategory: "Transportation"
        }
      }



      ),


    };
    fetch("https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/einvoiceprocess", bodyoption)

      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.Response.length > 0) {
          this.setState({
            customerList: data.Response,
            loading: false
          })

        }
        else {
          this.setState({
            customerList: [],
            loading: false
          })
        }

        console.log(this.state)
      }),
      (error) => {
        console.log("error", error)

      }

  }


  handleDateRange = (value) => {

    const concat = value + ""
    const split = concat.split(",")
    // console.log(split[0])
    // console.log(split[1])
    console.log(format(new Date(split[0]), 'yyyy/MM/dd'))
    console.log(format(new Date(split[0]), 'yyyy/MM/dd'))

    this.setState({
      selectDatefrom: format(new Date(split[0]), 'yyyy/MM/dd'),
      selectDateto: format(new Date(split[1]), 'yyyy/MM/dd')
    })

  }



  render() {

    return (

      <div className={styles.container}>
        <>
          <div className={Filterstyles.container}>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Customer code</div>
              <Select
                className={Filterstyles.select}
                onChange={this.handleChange}
                defaultValue="Select"
              >

                <Option
                  title="customer_code"
                  value="ERCEXPUNTG" key="1">
                  ERICSSON INDIA PRIVATE LIMITED
                </Option>
                <Option
                  title="customer_code"
                  value="KOVEXTNUD4" key="2">
                  KONE ELEVATOR INDIA PRIVATE LIMITED

                </Option>
                <Option
                  title="customer_code"
                  value="OTIEXHOSJM" key="3">
                  Otis Elevator Company (India) Ltd

                </Option>

                {/*<Option key="All" value="All">All</Option> */}
              </Select>
            </div>

            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Cost center</div>
              <Select
                className={Filterstyles.select}
                onChange={this.costCenterChange}
                defaultValue="Select"
              >
                {this.state.costCenter.map((i, index) => {
                  return (
                    <>
                      <Option title="cost_center" value={i.cost_center} key={index}>
                        {i.cost_center}
                      </Option>
                    </>
                  )
                })}
              </Select>
            </div>

            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Bill to ID</div>
              <Select
                className={Filterstyles.select}
                onChange={this.billIdChange}
                defaultValue="Select"
              >
                {this.state.billToId.map((i, index) => {
                  return (
                    <>
                      <Option
                        title="bill_toid"
                        value={i.bill_toid} key={index}>
                        {i.bill_toid}
                      </Option>
                    </>
                  )
                })}
              </Select>
            </div>
            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title}>Billing type</div>
              <Select
                defaultValue="Transportation"
                className={Filterstyles.select}
              >
                <Option value={'Transportation'} key={"Transportation"}>
                  Transportation
              </Option>
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

            <div className={Filterstyles.wrapper}>
              <div className={Filterstyles.title} style={{ color: "transparent" }}>Billing type</div>
              <Button type="primary" icon={<SearchOutlined />}
                onClick={this.handleSearch}
              >
                Search
          </Button>
            </div>

            <div>

              <input type="hidden" id="hdncustomercode" />
              <input type="hidden" id="hdncostcenter" />
              <input type="hidden" id="hdnbilltoid" />
              <input type="hidden" id="hdnfromdate" />
              <input type="hidden" id="hdntodate" />

            </div>



          </div>
          <div >
            <div>
              <div style={{ margin: "0px 25px" }}>
                <Tabs defaultActiveKey="1" >
                  <TabPane tab="Ready for billing" key="1">
                    <div className="tvsit-dwmdashboard_table">
                      <div className="tabel_scroll">
                        {
                          this.state.loading ? (
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
                              <div style={{ fontSize: "18px" }}>Loading Table</div>
                            </div>
                          ) : (
                              < table style={{ border: "1px solid #c1e3ff" }}>
                                <thead>
                                  <tr>
                                    <th style={{ width: "15%" }}>Customer Code
                      </th>
                                    <th style={{ width: "15%" }}>Cost Center
                  </th>
                                    <th style={{ width: "15%" }}>Bill To Id
                  </th>
                                    <th style={{ width: "15%" }}>Ref Doc
                  </th>
                                    <th style={{ width: "15%" }}>Invoice Amount
                  </th>
                                    <th style={{ width: "15%" }}>Route Code
                  </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.customerList.map((i, index) => (
                                    <tr>
                                      <td style={{ width: "15%" }}>{i.SHIP_TO_CUST}</td>
                                      <td style={{ width: "15%" }}>{i.COST_CENTER}</td>
                                      <td style={{ width: "15%" }}>{i.SHIP_TO_ID}</td>
                                      <td style={{ width: "15%" }}>{i.TVS_VCV_SCN_NO}</td>
                                      <td style={{ width: "15%" }}>{i.invoiceamount}</td>
                                      <td style={{ width: "15%" }}></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )
                        }



                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Not eligible for billing" key="2">
                  </TabPane>

                </Tabs>
              </div>

            </div>
          </div>






        </>

      </div >


    )
  }
}

export default TransportationDashboard;

const columnData2 = [
  {
    Header: "Customer Code",
    accessor: "customer_code",
  },
  {
    Header: "Cost Center",
    accessor: "cost_center",
  },
  {
    Header: "Bill To Id",
    accessor: "bill_toid",
  },

  {
    Header: "Ref Doc",
    accessor: "ref_doc",
  },
  {
    Header: "Invoice Amount",
    accessor: "invoice_amt",
  },
  {
    Header: "Route Code",
    accessor: "route_code",
  },
  ,
  {
    Header: "Reason",
    accessor: "reason",
  }
];


const columnData1 = [
  {
    Header: "Customer Code",
    accessor: "customer_code",
  },
  {
    Header: "Cost Center",
    accessor: "cost_center",
  },
  {
    Header: "Bill To Id",
    accessor: "bill_toid",
  },

  {
    Header: "Ref Doc",
    accessor: "ref_doc",
  },
  {
    Header: "Invoice Amount",
    accessor: "invoice_amt",
  },
  {
    Header: "Route Code",
    accessor: "route_code",
  },

];