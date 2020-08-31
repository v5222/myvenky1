import React, { useState, useEffect, memo, useRef } from "react";
import { Redirect } from "react-router-dom";
import MainLayout from "../common/MainLayout/index.js";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Collapse from "antd/lib/collapse";

import DatePicker from "antd/lib/date-picker";
import Spin from "antd/lib/spin";
import { useQuery } from "react-query";

import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
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
  completedData,
  getDataonLoad,
  podCount,
  podData,
  pod24hrsCount,
  pod24hrsData,
  selected,
  toggleSelected,
  loading,
  setLoading,
  tableData,
  loggedIn,
  getEta,
  etaCount,
  // customer,
  // customertype,
  // divisioncode,
  getFilters,
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
  // const [tableData, setTableData] = useState(completedData);
  const [api, setApidata] = useState();
  const [filterType, setfilterType] = useState("MTD");
  const [visible, setVisible] = useState(false);
  const [tableLoad, setTableLoad] = useState(loading);
  const [dynamicTitle, setDynamicTitle] = useState("updated <24hrs");
  const [showCSV, setShowCSV] = useState(false);
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
  const isInitialMount = useRef(true);

  //Component Mount Hook
  useEffect(() => {
    getDataonLoad(options);
    getEta();
    // getFilters(options);
    fetchFilters();

    setLoading(true);
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
  const fetchFilters = () => {
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
        setCustomertype(data.body.bodymsg.customertype);
        setCustomer(data.body.bodymsg.customer);
        setdivisioncode(data.body.bodymsg.divisioncode);
      });
  };

  //Filters hook to change filter dropdown values
  useEffect(() => {
    // getFilters(options);
    fetchFilters();
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

  //Menu Component for Date Filters
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Date Picker</Menu.Item>
      <Menu.Item key="2">Date Type</Menu.Item>
    </Menu>
  );

  return (
    <div>
      {!loggedIn && <Redirect to="/" />}
      <MainLayout>
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
                style={{ color: "black", fontWeight: 500 }}
              >
                Entity
              </div>
              <Select
                value={
                  divisioncode !== undefined
                    ? divisioncode.length === 1
                      ? divisioncode[0].divisioncode
                      : "All"
                    : "All"
                }
                style={{ width: "100%" }}
                onChange={(value) => handleChange("divisioncode", value)}
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
                style={{ color: "black", fontWeight: 500 }}
              >
                Trip Type
              </div>
              <Select
                value={
                  customertype !== undefined && customertype.length === 1
                    ? customertype[0].customertype
                    : "All"
                }
                style={{ width: "100%" }}
                onChange={(value) => {
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
                style={{ color: "black", fontWeight: 500 }}
              >
                Customer
              </div>
              <Select
                value={
                  customer !== undefined
                    ? customer.length === 1
                      ? customer[0].customer
                      : "All"
                    : "All"
                }
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) => handleChange("customer", value)}
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
                    style={{ color: "black", fontWeight: 500 }}
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
          <Col className="gutter-row" lg={4} xs={2}>
            <div className="tvsit_pod-filters">
              <div className="tvsit_pod-title" style={{ color: "transparent" }}>
                Filter
              </div>
              <Dropdown
                overlay={menu}
                onVisibleChange={handleVisibleChange}
                visible={visible}
              >
                <CalendarOutlined
                  style={{ fontSize: "28px" }}
                  onClick={(e) => e.preventDefault()}
                />
              </Dropdown>
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
                  <div className="tvsit-charts_border">
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
                  <div className="tvsit-charts_border">
                    <PodData
                      title1="completed"
                      title2="pod updated"
                      title3="updated percentage"
                      total={completedCount}
                      completed={podCount}
                      showPercentage={true}
                    />
                  </div>
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
                  <div className="tvsit-charts_heading">POD {dynamicTitle}</div>
                  <div className="tvsit-charts_border">
                    <PodData
                      title1="completed"
                      title2={dynamicTitle}
                      title3="updated percentage"
                      total={completedCount}
                      completed={pod24hrsCount}
                      showPercentage={true}
                    />
                  </div>
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
                  <div className="tvsit-charts_heading">ETA</div>
                  <div className="tvsit-charts_border">
                    <div className="tvsit-poddata_eta">
                      <div className="tvsit-poddata_eta-value">{etaCount}</div>
                      <div className="tvsit-poddata_eta-title">
                        Estimated Trips To be Arrived
                      </div>
                    </div>
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
                        Export CSV
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
