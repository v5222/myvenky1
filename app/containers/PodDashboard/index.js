import React, { useState, useEffect, memo, useRef } from "react";
import { Redirect } from "react-router-dom";
import MainLayout from "../common/MainLayout/index.js";
import PodCharts from "../../components/PodCharts";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";

import DatePicker from "antd/lib/date-picker";
import Spin from "antd/lib/spin";

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
  GET_ETA
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
  makeSelectEta
} from "./selectors";
import { makeSelectLogin } from "containers/App/selectors";
import { motion } from "framer-motion";
import CsvDownload from "react-json-to-csv";

const key = "podDashboard";

const { RangePicker } = DatePicker;
const data = {
  completed: [235, 150],
  lessthan24hr: [235, 12],
  verified: [235, 103]
};
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
  etaCount
}) {
  const { Option } = Select;
  const [customer, setCustomer] = useState([]);
  const [entity, setEntity] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  // const [tableData, setTableData] = useState(completedData);
  const [api, setApidata] = useState();
  const [filterType, setfilterType] = useState("MTD");
  const [visible, setVisible] = useState(false);
  const [tableLoad, setTableLoad] = useState(loading);
  const [dynamicTitle, setDynamicTitle] = useState("updated <24hrs");
  const [options, setOptions] = useState({
    type: "GETDATA",
    metrics: selected,
    ecode: "9999",
    customer: "All",
    customertype: "All",
    divisioncode: "All",
    filterdate: "MTD",
    sdate: "2020-08-08",
    edate: "2020-08-11"
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    console.log(loggedIn, "from loggedin");
  }, [loggedIn]);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    let temp = tableData;
    let customer_temp = new Set(temp.map(i => i.customer));
    let entity_temp = new Set(temp.map(i => i.divisioncode));
    let customertype_temp = new Set(temp.map(i => i.customertype));

    setCustomer([...customer_temp]);
    setEntity([...entity_temp]);
    setCustomerType([...customertype_temp]);
    setTableLoad(false);
    // setTableData(completedData);
  }, [tableData]);

  useEffect(() => {
    setLoading(true);
    if (selected === "ETA") {
      getDataonLoad({
        ...options,
        ["type"]: selected
      });
    } else {
      getDataonLoad({ ...options, ["metrics"]: selected });
    }
    setTableLoad(true);

    console.log(selected);
  }, [selected, options]);
  useEffect(() => {
    getDataonLoad(options);

    setLoading(true);
  }, []);
  useEffect(() => {
    console.log(selected, "from selected");
    getDataonLoad(options);
    // toggleSelected("iscompleted");
    getEta();
    setLoading(true);
  }, []);
  const handleChange = (label, value) => {
    setOptions({ ...options, [label]: value });
  };
  const handleDateRange = dates => {
    setOptions({
      ...options,
      ["sdate"]: moment(dates[0]).format(),
      ["edate"]: moment(dates[1]).format()
    });
    // console.log(dates, "from date range");
  };
  const handleVisibleChange = flag => {
    setVisible(flag);
  };
  const handleMenuClick = e => {
    if (e.key === "1") {
      setfilterType("DATE");
      setOptions({ ...options, ["filterdate"]: "DATE" });
    }
    if (e.key === "2") {
      setfilterType("MTD");
      setOptions({ ...options, ["filterdate"]: "MTD" });
    }
  };
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
        <Row gutter={10} style={{ margin: "22px" }}>
          <Col className="gutter-row" span={3} style={{ paddingLeft: "0px" }}>
            <div className="tvsit_pod-filters">
              <div
                className="tvsit_pod-title"
                style={{ color: "black", fontWeight: 500 }}
              >
                Entity
              </div>
              <Select
                defaultValue="All"
                style={{ width: "100%" }}
                onChange={value => handleChange("divisioncode", value)}
                name="divisioncode"
                ref={isInitialMount}
              >
                {entity.map((i, index) => {
                  return (
                    <>
                      <Option key={index} value={i}>
                        {i}
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
          <Col className="gutter-row" span={3}>
            <div className="tvsit_pod-filters">
              <div
                className="tvsit_pod-title"
                style={{ color: "black", fontWeight: 500 }}
              >
                Customer Type
              </div>
              <Select
                defaultValue="All"
                style={{ width: "100%" }}
                onChange={value => {
                  handleChange("customertype", value);
                  if (value === "P2P") {
                    setDynamicTitle("updated <7days");
                  } else {
                    setDynamicTitle("updated <24hrs");
                  }
                }}
              >
                {customerType.map((i, index) => {
                  return (
                    <>
                      <Option key={index} value={i}>
                        {i}
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
          <Col className="gutter-row" span={5}>
            <div className="tvsit_pod-filters">
              <div
                className="tvsit_pod-title"
                style={{ color: "black", fontWeight: 500 }}
              >
                Customer
              </div>
              <Select
                defaultValue="All"
                style={{ width: "100%" }}
                onChange={value => handleChange("customer", value)}
              >
                {customer.map((i, index) => {
                  return (
                    <>
                      <Option key={index} value={i}>
                        {i}
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
          {filterType === "MTD" ? (
            <>
              <Col className="gutter-row" span={5}>
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
                    onChange={value => handleChange("filterdate", value)}
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
              <Col className="gutter-row" span={6}>
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
                      moment("2020-08-11", "YYYY-MM-DD")
                    ]}
                  />
                </div>
              </Col>
            </>
          )}
          <Col className="gutter-row" span={4}>
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
                  onClick={e => e.preventDefault()}
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
            backgroundColor: "#ffff"
          }}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <Spin spinning={loading}>
                <div
                  className={
                    selected === "iscompleted"
                      ? "tvsit-charts_selected"
                      : "tvsit-charts_unselected"
                  }
                  onClick={() => toggleSelected("iscompleted")}
                >
                  <div className="tvsit-charts_heading">Completed Trips</div>
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
                    />
                  </div>
                </div>
              </Spin>
            </Col>
            <Col className="gutter-row" span={6}>
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
                    />
                  </div>
                </div>
              </Spin>
            </Col>
            <Col className="gutter-row" span={6}>
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
                      title1="pod updated"
                      title2={dynamicTitle}
                      title3="updated percentage"
                      total={podCount}
                      completed={pod24hrsCount}
                    />
                  </div>
                </div>
              </Spin>
            </Col>
            <Col className="gutter-row" span={6}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "30px 0 10px 0",
              alignItems: "flex-end"
            }}
          >
            <div
              style={{
                fontSize: "22px",
                textTransform: "uppercase",
                fontWeight: 600
              }}
            >
              Details{" "}
              {selected === "iscompleted"
                ? "OF COMPLETED TRIPS"
                : selected === "ispodverified"
                ? "OF EPOD UPDATED"
                : selected === "podverifieddays"
                ? `OF ${dynamicTitle}`
                : "OF ETA"}
            </div>
            <div>
              <CsvDownload
                data={tableData}
                filename="data.csv"
                style={{
                  //pass other props, like styles

                  backgroundColor: "#004178",
                  borderRadius: "5px",
                  border: "none",

                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "14px",
                  padding: "6px 24px",
                  textDecoration: "none"
                }}
              >
                Export CSV
              </CsvDownload>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <PodTable
              data={tableData}
              loading={tableLoad}
              setLoading={setTableLoad}
              selected={selected}
            />
          </div>
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
  etaCount: makeSelectEta()
});

export function mapDispatchToProps(dispatch) {
  return {
    getDataonLoad: values => {
      dispatch({
        type: GET_COMPLETED,
        payload: values
      });
    },
    getData: values => {
      dispatch({
        type: GET_COMPLETED,
        payload: values
      });
    },
    getEta: () => {
      dispatch({
        type: GET_ETA
      });
    },
    toggleSelected: value => {
      dispatch({ type: SET_SELECTED, selected: value });
    },
    setLoading: value => {
      dispatch({ type: SET_LOADING, loading: value });
    }
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
