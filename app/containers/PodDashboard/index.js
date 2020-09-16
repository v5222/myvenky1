import React, { useState, useEffect, memo, useRef } from "react";
import { Redirect } from "react-router-dom";
import MainLayout from "../common/MainLayout/index.js";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Collapse from "antd/lib/collapse";
import DatePicker from "antd/lib/date-picker";
import Spin from "antd/lib/spin";
// import { useQuery } from "react-query";

import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import SyncOutlined from "@ant-design/icons/SyncOutlined";
import { useQuery } from "react-query";
import { Breadcrumb } from "antd";

// import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import FileExcelOutlined from "@ant-design/icons/FileExcelOutlined";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import PodTable from "components/PodTable";
import PodData from "components/PodData";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  GET_COMPLETED,
  GET_EPOD,
  GET_EPOD24HRS,
  SET_SELECTED,
  SET_LOADING,
  GET_ETA,
  GET_FILTERS,
} from "./constants";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import saga from "./saga";
import moment from "moment";
import reducer from "./reducer";
import {
  makeSelecttotalTripsCount,
  makeSelectcompletedCount,
  makeSelectcompletedData,
  makeSelectpodCount,
  makeSelectpodData,
  makeSelectpod24hrsCount,
  makeSelectpod24hrsData,
  makeSelectselected,
  makeSelectloading,
  makeSelectTableData,
  makeSelectEta,
  // makeSelectDivisionCode,
  // makeSelectCustomertype,
  // makeSelectCustomer,
} from "./selectors";
import { makeSelectLogin } from "containers/App/selectors";
import { motion } from "framer-motion";
import CsvDownload from "react-json-to-csv";
import { apiURL } from "containers/App/services";
import { isError } from "lodash";

const key = "podDashboard";

const { RangePicker } = DatePicker;
const data = {
  completed: [235, 150],
  lessthan24hr: [235, 12],
  verified: [235, 103],
};
const { Panel } = Collapse;
function PodDashboard({
  totaltrips,
  completedCount,
  getDataonLoad,
  podCount,
  pod24hrsCount,
  selected,
  toggleSelected,
  loading,
  setLoading,
  tableData,
  getEta,
  etaCount,
  isAuthenticated,
  logout,
  user,
  getAccessToken,
  login,
  // customer,
  // customertype,
  // divisioncode,
  getFilters,
  getUserProfile,
}) {
  // Saga and Reducer injectors
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  //testing
  // const { isLoading, error, data } = useQuery("repoData", () =>
  //   fetch(apiURL).then((res) => res.json())
  // );

  //Local States
  const { Option } = Select;
  const [customer, setCustomer] = useState([]);
  const [divisioncode, setdivisioncode] = useState([]);
  const [customertype, setCustomertype] = useState([]);
  const [custValue, setCustValue] = useState("All");
  const [custTValue, setCustTvalue] = useState("All");
  const [divValue, setDivValue] = useState("All");
  const [refreshData, setRefreshDate] = useState(moment().format("DD/MM/YYYY"));
  // const [tableData, setTableData] = useState(completedData);
  const [api, setApidata] = useState();
  const [filterType, setfilterType] = useState("MTD");
  const [visible, setVisible] = useState(false);
  const [tableLoad, setTableLoad] = useState(loading);
  const [dynamicTitle, setDynamicTitle] = useState("updated <24hrs");
  const [showCSV, setShowCSV] = useState(false);
  const [token, setToken] = useState("");
  const [options, setOptions] = useState({
    type: "GETDATA",
    metrics: selected,
    ecode: "9999",
    customer: "All",
    customertype: "All",
    divisioncode: "All",
    filterdate: "MTD",
    sdate: "2020-08-08",
    edate: "2020-08-11",
  });
  // const isInitialMount = useRef(true);

  const checkLogin = async () => {
    let token = await getUserProfile();
  };

  //Component Mount Hook
  useEffect(() => {
    setLoading(true);
    checkLogin();
    getDataonLoad(options);
    getEta();
    // getFilters(options);
    fetchFilters();

    getMaxDate();
  }, []);

  //Table or Grid Data updation hook
  useEffect(() => {
    let temp = tableData;

    setTableLoad(false);
    // setTableData(completedData);
  }, [tableData]);

  /*
  Testing hooks AND functions will come here should be removed while refactoring
*/
  useEffect(() => {
    console.log("from AdFS", user, isAuthenticated);
  }, [isAuthenticated, user]);
  useEffect(() => {
    // console.log(token, "adfs token");
  }, [token]);

  const fetchFilters = (options) => {
    let filterOption = { ...options, type: "FILTERS" };
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({
        body: filterOption,
      }),
    };
    fetch(apiURL, bodyoption)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let tempCust = data.body.bodymsg.customer;
        let tempCustT = data.body.bodymsg.customertype;
        let tempDiv = data.body.bodymsg.divisioncode;
        tempCust.length === 1
          ? setCustValue(tempCust[0].customer)
          : setCustValue(options.customer);
        tempCustT.length === 1
          ? setCustTvalue(tempCustT[0].customertype)
          : setCustTvalue(options.customertype);
        tempDiv.length === 1
          ? setDivValue(tempDiv[0].divisioncode)
          : setDivValue(options.divisioncode);
        setCustomertype(data.body.bodymsg.customertype);
        setCustomer(data.body.bodymsg.customer);
        setdivisioncode(data.body.bodymsg.divisioncode);
      });
  };

  //Filters hook to change filter dropdown values
  useEffect(() => {
    // getFilters(options);
    // console.log(options);
    fetchFilters(options);
  }, [options]);
  // useEffect(() => {
  //   console.log(filtersData, "filters data");
  //   if (filtersData !== undefined) {
  //     // let customer = filtersData.customer;
  //     // let divisioncode = filtersData.divisioncode;
  //     // let customertype = filtersData.customertype;
  //     // setCustomer([...customer.customer]);
  //     // setEntity([...divisioncode.divisioncode]);
  //     // setCustomerType([...customertype.customertype]);
  //   }
  // }, [filtersData]);

  //Grid and Tile Data Selection Hook one of type ETA, podverified, iscompleted,  podverifieddays(< 24hrs and 7 days)
  useEffect(() => {
    setLoading(true);
    if (selected === "ETA") {
      getDataonLoad({
        ...options,
        ["type"]: selected,
      });
    } else {
      getDataonLoad({ ...options, ["metrics"]: selected });
    }
    setTableLoad(true);
  }, [selected, options]);

  //Event Handlers
  const handleChange = (label, value) => {
    setOptions({ ...options, [label]: value });
  };
  const handleDateRange = (dates) => {
    setOptions({
      ...options,
      ["sdate"]: moment(dates[0]).format(),
      ["edate"]: moment(dates[1]).format(),
    });
    // console.log(dates, "from date range");
  };
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const handleMenuClick = (e) => {
    if (e.key === "1") {
      setfilterType("DATE");
      setOptions({ ...options, ["filterdate"]: "DATE" });
    }
    if (e.key === "2") {
      setfilterType("MTD");
      setOptions({ ...options, ["filterdate"]: "MTD" });
    }
  };

  //collapse change handler
  const handleCollapse = () => {
    console.log("triggered");
  };

  //MaxDate function
  const getMaxDate = () => {
    let options = {
      method: "POST",
      body: JSON.stringify({ body: { type: "MAXDATE", ecode: "9999" } }),
    };
    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from date");
        let TemprefreshData = moment(data.bodymsg[0].date).format("DD/MM/YYYY");
        setRefreshDate(TemprefreshData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Menu Component for Date Filters
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Date Picker</Menu.Item>
      <Menu.Item key="2">Date Type</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <MainLayout logout={logout} user={user}>
        {/* {!loggedIn && <Redirect to="/" />} */}
        {/* <MainLayout> */}
        <Breadcrumb className="pod_breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>POD Usage Report</Breadcrumb.Item>
        </Breadcrumb>
        <main className="tvsit-pod-container">
          <h1 className="pod_title">POD Usage Report</h1>

          <Row gutter={10} className="tvsit_pod-filters-row">
            <Col
              className="gutter-row"
              lg={3}
              xs={12}
              style={{ paddingLeft: "0px" }}
            >
              <div className="tvsit_pod-filters">
                <div
                  className="tvsit_pod-title"
                  style={{ color: "#004178", fontWeight: 500 }}
                >
                  Entity
                </div>

                <Select
                  value={divValue}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setDivValue(value);
                    handleChange("divisioncode", value);
                  }}
                  name="divisioncode"
                >
                  {divisioncode !== undefined
                    ? divisioncode.map((i, index) => {
                        return (
                          <>
                            <Option key={index} value={i.divisioncode}>
                              {i.divisioncode}
                            </Option>
                          </>
                        );
                      })
                    : ""}
                  <Option key="All" value="All">
                    All
                  </Option>
                </Select>
              </div>
            </Col>
            <Col className="gutter-row" lg={3} xs={12}>
              <div className="tvsit_pod-filters">
                <div
                  className="tvsit_pod-title"
                  style={{ color: "#004178", fontWeight: 500 }}
                >
                  Trip Type
                </div>
                <Select
                  value={custTValue}
                  // defaultValue={
                  //   customertype !== undefined && customertype.length === 1
                  //     ? customertype[0].customertype
                  //     : "All"
                  // }
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setCustTvalue(value);
                    handleChange("customertype", value);
                    if (value === "P2P") {
                      setDynamicTitle("updated <7days");
                    } else {
                      setDynamicTitle("updated <24hrs");
                    }
                  }}
                >
                  {customertype !== undefined &&
                    customertype.map((i, index) => {
                      return (
                        <>
                          <Option key={index} value={i.customertype}>
                            {i.customertype}
                          </Option>
                        </>
                      );
                    })}
                  <Option key="All" value="All">
                    All
                  </Option>
                </Select>
              </div>
            </Col>
            <Col className="gutter-row" lg={5} xs={10}>
              <div className="tvsit_pod-filters">
                <div
                  className="tvsit_pod-title"
                  style={{ color: "#004178", fontWeight: 500 }}
                >
                  Customer
                </div>
                <Select
                  value={custValue}
                  // defaultValue={
                  //   customer !== undefined && customer.length === 1
                  //     ? customer[0].customer
                  //     : "All"
                  // }
                  style={{ width: "100%" }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    console.log(input, option);
                    if (option.children !== null) {
                      return (
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }
                  }}
                  onChange={(value) => {
                    setCustValue(value);
                    handleChange("customer", value);
                  }}
                >
                  {customer !== undefined
                    ? customer.map((i, index) => {
                        return (
                          <>
                            <Option key={index} value={i.customer}>
                              {i.customer}
                            </Option>
                          </>
                        );
                      })
                    : ""}
                  <Option key="All" value="All">
                    All
                  </Option>
                </Select>
              </div>
            </Col>
            {filterType === "MTD" ? (
              <>
                <Col className="gutter-row" lg={5} xs={12}>
                  <div className="tvsit_pod-filters">
                    <div
                      className="tvsit_pod-title"
                      style={{ color: "#004178", fontWeight: 500 }}
                    >
                      Date Type & Range Picker
                    </div>
                    <Select
                      defaultValue="MTD"
                      style={{ width: "100%" }}
                      onChange={(value) => handleChange("filterdate", value)}
                    >
                      <Option value="MTD">MTD</Option>
                      <Option value="YTD">YTD</Option>
                      <Option value="WTD">WTD</Option>
                    </Select>
                    {/* <RangePicker /> */}
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col className="gutter-row" lg={6} xs={12}>
                  <div className="tvsit_pod-filters">
                    <div
                      className="tvsit_pod-title"
                      style={{ color: "black", fontWeight: 500 }}
                    >
                      Date Type & Range Picker
                    </div>
                    <RangePicker
                      onChange={handleDateRange}
                      defaultValue={[
                        moment("2020-08-08", "YYYY-MM-DD"),
                        moment("2020-08-11", "YYYY-MM-DD"),
                      ]}
                    />
                  </div>
                </Col>
              </>
            )}
            <Col className="gutter-row" lg={1} xs={2}>
              <div className="tvsit_pod-filters">
                <div
                  className="tvsit_pod-title"
                  style={{ color: "transparent" }}
                >
                  Filter
                </div>
                <Dropdown
                  overlay={menu}
                  onVisibleChange={handleVisibleChange}
                  visible={visible}
                >
                  <CalendarOutlined
                    style={{
                      fontSize: "33px",
                      color: "#ADADAD",
                      marginLeft: "6px",
                    }}
                    onClick={(e) => e.preventDefault()}
                  />
                </Dropdown>
              </div>
            </Col>
            <Col lg={6} xs={12}>
              <div className="tvsit_pod-title" style={{ color: "transparent" }}>
                Filter
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "2px",
                }}
              >
                <div style={{ marginRight: "5px" }}>
                  <SyncOutlined
                    style={{
                      fontSize: "18px",
                      lineHeight: 0.8,
                    }}
                  />
                </div>
                <div style={{ lineHeight: 1, fontSize: "18px" }}>
                  Last Refresh Date : {refreshData}
                </div>
              </div>
            </Col>
          </Row>
          {/* filter section ends here */}

          {/* sections start here */}

          <section
            style={{
              margin: "22px 0px",
              padding: "15px 22px",
              backgroundColor: "#ffff",
            }}
          >
            <Row gutter={16}>
              <Col className="gutter-row" lg={6} xs={12}>
                <Spin spinning={loading}>
                  <div
                    className={
                      selected === "iscompleted"
                        ? "tvsit-charts_selected"
                        : "tvsit-charts_unselected"
                    }
                    onClick={() => toggleSelected("iscompleted")}
                  >
                    <div className="tvsit-charts_heading">Completed</div>
                    {/* <PodCharts
                      title="Completed Trips"
                      total={totaltrips}
                      completed={completedCount}
                    /> */}
                    <PodData
                      title1="total"
                      title2="completed"
                      title3="completed percentage"
                      total={totaltrips}
                      completed={completedCount}
                      showPercentage={false}
                    />
                  </div>
                </Spin>
              </Col>
              <Col className="gutter-row" lg={6} xs={12}>
                <Spin spinning={loading}>
                  <div
                    className={
                      selected === "ispodverified"
                        ? "tvsit-charts_selected"
                        : "tvsit-charts_unselected"
                    }
                    onClick={() => toggleSelected("ispodverified")}
                  >
                    <div className="tvsit-charts_heading">POD updated</div>
                    <PodData
                      title1="completed"
                      title2="pod updated"
                      title3="updated percentage"
                      total={completedCount}
                      completed={podCount}
                      showPercentage={true}
                    />
                  </div>
                </Spin>
              </Col>
              <Col className="gutter-row" lg={6} xs={12}>
                <Spin spinning={loading}>
                  <div
                    className={
                      selected === "podverifieddays"
                        ? "tvsit-charts_selected"
                        : "tvsit-charts_unselected"
                    }
                    onClick={() => toggleSelected("podverifieddays")}
                  >
                    <div className="tvsit-charts_heading">
                      POD {dynamicTitle}
                    </div>
                    <PodData
                      title1="completed"
                      title2={dynamicTitle}
                      title3="updated percentage"
                      total={completedCount}
                      completed={pod24hrsCount}
                      showPercentage={true}
                    />
                  </div>
                </Spin>
              </Col>
              <Col className="gutter-row" lg={6} xs={12}>
                <Spin spinning={loading}>
                  <div
                    className={
                      selected === "ETA"
                        ? "tvsit-charts_selected "
                        : "tvsit-charts_unselected"
                    }
                    onClick={() => toggleSelected("ETA")}
                  >
                    <div className="tvsit-charts_heading">
                      Estimated Trip to be Arrived
                    </div>
                    <div className="tvsit-poddata_eta">
                      <div className="tvsit-poddata_eta-value">{etaCount}</div>
                      {/**   <div className="tvsit-poddata_eta-title">
                        Estimated Trips To be Arrived
                      </div>   */}
                    </div>
                  </div>
                </Spin>
              </Col>
            </Row>

            {/* table sections starts here */}
            <Collapse
              defaultActiveKey={["0"]}
              style={{ marginTop: "20px" }}
              onChange={() => setShowCSV((prev) => !prev)}
            >
              <Panel
                header={
                  selected === "iscompleted"
                    ? " Details OF COMPLETED TRIPS"
                    : selected === "ispodverified"
                    ? "Details OF EPOD UPDATED"
                    : selected === "podverifieddays"
                    ? `Details OF ${dynamicTitle}`
                    : " Details OF ETA"
                }
                extra={
                  <>
                    {showCSV && (
                      <div>
                        <CsvDownload
                          data={tableData}
                          filename="data.csv"
                          className="tvsit-pod_table-download"
                        >
                          <FileExcelOutlined /> Export CSV
                        </CsvDownload>
                      </div>
                    )}
                  </>
                }
                key="1"
                className="tvsit-pod_table-title"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "30px 0 10px 0",
                    alignItems: "flex-end",
                  }}
                >
                  {/* <div className="tvsit-pod_table-title">
                  Details{" "}
                  {selected === "iscompleted"
                    ? "OF COMPLETED TRIPS"
                    : selected === "ispodverified"
                    ? "OF EPOD UPDATED"
                    : selected === "podverifieddays"
                    ? `OF ${dynamicTitle}`
                    : "OF ETA"}
                </div> */}
                  {/* <div>
                  <CsvDownload
                    data={tableData}
                    filename="data.csv"
                    className="tvsit-pod_table-download"
                  >
                    Export CSV
                  </CsvDownload>
                </div> */}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <PodTable
                    data={tableData}
                    loading={tableLoad}
                    setLoading={setTableLoad}
                    selected={selected}
                  />
                </div>
              </Panel>
            </Collapse>
          </section>
        </main>
      </MainLayout>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  totaltrips: makeSelecttotalTripsCount(),
  completedCount: makeSelectcompletedCount(),
  completedData: makeSelectcompletedData(),
  podCount: makeSelectpodCount(),
  podData: makeSelectpodData(),
  pod24hrsCount: makeSelectpod24hrsCount(),
  pod24hrsData: makeSelectpod24hrsData(),
  selected: makeSelectselected(),
  loading: makeSelectloading(),
  tableData: makeSelectTableData(),
  loggedIn: makeSelectLogin(),
  etaCount: makeSelectEta(),
  // customer: makeSelectCustomer(),
  // customertype: makeSelectCustomertype(),
  // divisioncode: makeSelectDivisionCode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getDataonLoad: (values) => {
      dispatch({
        type: GET_COMPLETED,
        payload: values,
      });
    },
    getData: (values) => {
      dispatch({
        type: GET_COMPLETED,
        payload: values,
      });
    },
    getEta: () => {
      dispatch({
        type: GET_ETA,
      });
    },
    getFilters: (values) => {
      dispatch({
        type: GET_FILTERS,
        payload: { ...values, type: "FILTERS" },
      });
    },
    toggleSelected: (value) => {
      dispatch({ type: SET_SELECTED, selected: value });
    },
    setLoading: (value) => {
      dispatch({ type: SET_LOADING, loading: value });
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo
)(PodDashboard);
