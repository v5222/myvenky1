import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import Menu from "antd/lib/menu";
import { Breadcrumb, Tabs, Select, Input, Button } from "antd";
import {
  SearchOutlined,
  ArrowDownOutlined,
  DownOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import ErrorBoundary from "components/ErrorBoundary";
import history from "utils/history";
import axios from "axios";
import ReactPaginate from "react-paginate";
import moment from "moment";

const { TabPane } = Tabs;
const { Option } = Select;

function VehicleTrackingSystem({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const [customerName, setCustomerName] = useState([]);
  const [custFullDetails, setCustFullDetails] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [dummyArray, setDummyArray] = useState(["1", "2", "3", "4"]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(50);
  const [currPage, setCurrPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [tabData, setTabData] = useState([]);
  const [orgTabData, setOrgTabData] = useState([]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  function callback(key) {
    // console.log(key);
  }

  function handleapidata(apidata) {
    setCustomerName(apidata);
  }

  function handleCustDetailsdata(apidata) {
    const slice = apidata.slice(offset, offset + perPage);
    setPageCount(Math.ceil(custFullDetails.length / perPage));
    setOrgTabData(apidata);
    setTabData(slice);
  }

  //  function handlePageClick(){
  // const selectedPage = e.selected;
  //  const offset = selectedPage * perPage;

  // setCurrPage(selectedPage)
  // setOffset(offset)
  // loadMoreData()
  // }

  //  function loadMoreData() {
  // 		const data = orgTabData;

  //     const slice = tabData.slice(offset, offset + perPage)
  //     setPageCount(Math.ceil(data.length / perPage))
  //     setTabData(slice)

  //   }

  const reqOpt = {
    body: {
      type: "DDLCUSTOMER",
      email: "muneesh",
      customer: "ALL",
    },
  };

  const custDetilsReqObj = {
    body: {
      type: "GRIDLOAD",
      email: "muneesh",
      customer: "ALL",
    },
  };

  const options = {
    headers: {
      'user': 'Lynk', 
      'Authorization': 'Bearer hoYNdvjFI20rCdc2nxpzaAGtvyXHOtk1dpHFh0Ha', 
      'Content-Type': 'application/json'
    }
  };


  useEffect(() => {
    axios
      .post(
        "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/vehicletracking",
        reqOpt,options
      )
      .then((res) => {
        console.log("---------------",res.data)
        if (res.data.body.statuscode == 200) {
          handleapidata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });

    axios
      .post(
        "https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts",
        custDetilsReqObj
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          handleCustDetailsdata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });
  }, []);

  useEffect(() => {
    let custVehicleSearchData = {
      body: {
        type: "VEHICLENOSEARCH",
        email: "muneesh",
        customer: "Ford india private limited",
        vehicleno: searchValue.toString(),
      },
    };
    axios
      .post(
        "https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts",
        custVehicleSearchData
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          handleCustDetailsdata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });
  }, [searchValue]);

  function handletripNo(tNo){
    if(tNo.startsWith("VCV")){
      let val = tNo.substring(3)
      return val
    }
    else{
      return tNo
    }
  }

  function handleSelectChange(value) {
    let v = value;
    let handleSelectedDatas = {
      body: {
        type: "GRIDLOAD",
        email: "muneesh",
        customer: v,
      },
    };

    axios
      .post(
        "https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts",
        handleSelectedDatas
      )
      .then((res) => {
        if (res.data.body.statuscode == 200) {
          handleCustDetailsdata(res.data.body.bodymsg);
        } else {
          console.log("Err");
        }
      });
  }

  return (
    <ErrorBoundary logout={logout} user={user}>
      <MainLayout logout={logout} user={user}>
        <main className="tvsit-dwm-container">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              Customer - Vehicle Tracking System
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="dwm_title">Customer - Vehicle Tracking System</h1>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="dashboard_header"
          />
          <div className="tvsit-vts-bgcontainer">
            <div>
              <div className="selectBox">
                <Select
                  id="custNameDet"
                  defaultValue="ALL"
                  style={{
                    width: 200,
                    background: "#FFFFFF",
                    border: "1px solid #D9D9D9",
                  }}
                  placeholder="Select"
                  optionFilterProp="children"
                  onChange={handleSelectChange}
                >
                  {customerName.length > 0 &&
                    customerName.map((val, index) => {
                      return (
                        <>
                          <Option value={val} key={index}>
                            {val}
                          </Option>
                        </>
                      );
                    })}
                </Select>
                <Input
                  style={{
                    background: "#FFFFFF",
                    width: 200,
                    border: "1px solid #D9D9D9",
                  }}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter Vehicle Number"
                />
              </div>
            </div>
            <Tabs
              style={{ marginLeft: "2%" }}
              defaultActiveKey="1"
              onChange={callback}
            >
              <TabPane tab="Active" key="1">
                {tabData.length > 0 &&
                  tabData.map((arr, ind) => {
                    return (
                      <div>
                        <div class="flex-container">
                          <div class="flex-item-left">
                            <h3 class="title1">
                              ID{" "}{console.log("API_DATA's", arr)}
                              <span
                                style={{ color: "#008DC5", fontWeight: "bold" }}
                              >
                                { handletripNo(arr.tripno)}
                              </span>
                            </h3>
                            <h3
                              class="title2"
                              style={{ color: "#123F74", fontWeight: "bold" }}
                            >
                              {arr.vehiclenumber ? arr.vehiclenumber : "--"}
                            </h3>
                          </div>
                          <div class="flex-item-center">
                            <h3 class="title3">
                              <EnvironmentOutlined
                                style={{ color: "#2FCB16" }}
                              />
                              {arr.originlocation ? arr.originlocation : "--"}
                            </h3>
                            <h3 class="title5">
                              <EnvironmentOutlined
                                style={{ color: "#FF0000" }}
                              />
                              {arr.destinationlocation
                                ? arr.destinationlocation
                                : "--"}
                            </h3>
                            <h3
                              class="title4"
                              style={{
                                color: "rgba(18, 63, 116, 0.7)",
                                fontWeight: "600",
                              }}
                            >
                              Started Date
                            </h3>
                            <h3
                              class="title6"
                              style={{ color: "#123F74", fontWeight: "600" }}
                            >
                              {arr.tripstarttimestamp
                                ? moment(
                                    arr.tripstarttimestamp
                                  ).format("MMM DD YYYY hh:mm A")
                                : "--"}
                            </h3>
                          </div>
                          <div class="flex-item-right">
                            <h3
                              class="title7"
                              style={{
                                color: "rgba(18, 63, 116, 0.7)",
                                fontWeight: "600",
                              }}
                            >
                              Remaining Distance
                            </h3>
                            <h3
                              class="title9"
                              style={{ color: "#123F74", fontWeight: "600" }}
                            >
                              {arr.remainingkm ? arr.remainingkm + " km" : "--"}
                            </h3>
                            <h3
                              class="title8"
                              style={{
                                color: "rgba(18, 63, 116, 0.7)",
                                fontWeight: "600",
                              }}
                            >
                              Total Distance
                            </h3>
                            <h3
                              class="title10"
                              style={{ color: "#123F74", fontWeight: "600" }}
                            >
                              {arr.plannedkm ? arr.plannedkm : "--"}
                            </h3>
                          </div>
                          <div class="flex-item-last">
                            <img
                              width="45px"
                              height="45px"
                              src={require("../../images/map-location.png")}
                              onClick={() =>
                                history.push({
                                  pathname:
                                    "/vehicletrackingsystem/" + arr.tripkey,
                                  state: { message: arr.tripkey },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </TabPane>
              <TabPane tab="Completed" key="2">
                {tabData.length > 0 &&
                  tabData.map((arr, ind) => {
                    return (
                      <div>
                        <div class="flex-container">
                          <div class="flex-item-left">
                            <h3 class="title1">
                              ID{" "}
                              
                              <span
                                style={{ color: "#008DC5", fontWeight: "bold" }}
                              >
                              { handletripNo(arr.tripno)}
                                {/* {arr.tripno ? (arr.tripno.startsWith("VCV") ? arr.tripno.substring(3) : arr.tripno) : "--"} */}
                              </span>
                            </h3>
                            <h3 class="title2">
                              {arr.vehiclenumber ? arr.vehiclenumber : "--"}
                            </h3>
                          </div>
                          <div class="flex-item-center">
                            <h3 class="title3">
                              <EnvironmentOutlined
                                style={{ color: "#2FCB16" }}
                              />
                              {arr.originlocation ? arr.originlocation : "--"}
                            </h3>
                            <h3 class="title5">
                              <EnvironmentOutlined
                                style={{ color: "#FF0000" }}
                              />
                              {arr.destinationlocation
                                ? arr.destinationlocation
                                : "--"}
                            </h3>
                            <h3
                              class="title4"
                              style={{
                                color: "rgba(18, 63, 116, 0.7)",
                                fontWeight: "600",
                              }}
                            >
                              Started Date
                            </h3>
                            <h3 class="title6">
                              {arr.tripstarttimestamp
                                ? moment(
                                    arr.tripstarttimestamp
                                  ).format("MMM DD YYYY hh:mm A")
                                : "--"}
                            </h3>
                          </div>
                          <div class="flex-item-right">
                            <h3
                              class="title7"
                              style={{
                                color: "rgba(18, 63, 116, 0.7)",
                                fontWeight: "600",
                              }}
                            >
                              Remaining Distance
                            </h3>
                            <h3 class="title9">
                              {arr.remainingkm ? arr.remainingkm + " km" : "--"}
                            </h3>
                            <h3
                              class="title8"
                              style={{
                                color: "rgba(18, 63, 116, 0.7)",
                                fontWeight: "600",
                              }}
                            >
                              Total Distance
                            </h3>
                            <h3 class="title10">
                              {arr.plannedkm ? arr.plannedkm : "--"}
                            </h3>
                          </div>
                          <div class="flex-item-last">
                            <img
                              width="45px"
                              height="45px"
                              src={require("../../images/map-location.png")}
                              onClick={() =>
                                history.push({
                                  pathname:
                                    "/vehicletrackingsystem/" + arr.tripkey,
                                  state: { message: arr.tripkey },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </TabPane>
            </Tabs>
            {/* <ReactPaginate
                  previousLabel={'prev'}
                  nextLabel={'next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={5}
                  // onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  ></ReactPaginate> */}
          </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default VehicleTrackingSystem;
