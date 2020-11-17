import React, { useState, useEffect } from "react";
import Drawer from "antd/lib/drawer";
import Button from "antd/lib/button";
import Menu from "antd/lib/menu";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import PieChartOutlined from "@ant-design/icons/PieChartOutlined";
import LineChartOutlined from "@ant-design/icons/LineChartOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import Logo from "../../images/logo-full.png";
import Logo2 from "../../images/TVS-SCS-Tagline-Color.png";
import Courier from "../../images/SVG/couriersidebar.svg";
import history from "utils/history";
import { usersList } from "containers/App/DWMusers";
import { connect } from "react-redux";
const MenuDrawer = ({ selected, user, userRole, otpLogIn }) => {
  useEffect(() => {
    console.log(otpLogIn, userRole);
  }, [otpLogIn]);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <MenuFoldOutlined onClick={showDrawer} className="tvsit-header_menu-sm" />
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          backgroundColor: "#ECECEC",
          width: "100%",
          padding: "10px 0 10px 0",
        }}
      >
        <div
          style={{
            margin: "10px 0 50px 0 ",
            width: "100%",
            height: "70px",
          }}
        >
          {" "}
          <img src={Logo} className="tvsit_drawer_logo" />
          <img src={Logo2} className="tvsit_drawer_logo2" />
          <div
            style={{
              borderBottom: "1px solid #D9D9D9",
              width: "100%",
              paddingLeft: "0px",
            }}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: "#ECECEC", marginLeft: "10px" }}
        >
          {!usersList.includes(user.email) && userRole && (
            <Menu.Item
              key="/podDashboard"
              className={
                selected === "/podDashboard"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
              icon={<PieChartOutlined />}
              onClick={() => history.push("/podDashboard")}
            >
              POD Dashboard
            </Menu.Item>
          )}

          {!usersList.includes(user.email) && (
            <Menu.Item
              key="2"
              icon={<LineChartOutlined />}
              onClick={() => history.push("/courierManagement")}
              className={
                selected === "/courierManagement"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
            >
              Courier Management
            </Menu.Item>
          )}

          {!usersList.includes(user.email) && userRole && (
            <Menu.Item
              key="3"
              icon={<BarChartOutlined />}
              onClick={() => history.push("/dwmApplication")}
              className={
                selected === "/dwmApplication"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
            >
              DWM summary
            </Menu.Item>
          )}
          {!usersList.includes(user.email) && userRole && (
            <Menu.Item
              key="4"
              icon={<BarChartOutlined />}
              onClick={() => history.push("/dwmUsageReportApplication")}
              className={
                selected === "/dwmUsageReportApplication"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
            >
              DWM Report Insight
            </Menu.Item>
          )}
          {!usersList.includes(user.email) && userRole && (
            <Menu.Item
              key="5"
              icon={<BarChartOutlined />}
              onClick={() => history.push("/einvoice")}
              className={
                selected === "/einvoice"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
            >
              Einvoice Print
            </Menu.Item>
          )}
          {!usersList.includes(user.email) && userRole && (
            <Menu.Item
              key="5"
              icon={<BarChartOutlined />}
              onClick={() => history.push("/transportationmaster")}
              className={
                selected === "/transportationmaster"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
            >
              Transportation Master
            </Menu.Item>
          )}
          {!usersList.includes(user.email) && userRole && (
            <Menu.Item
              key="5"
              icon={<BarChartOutlined />}
              onClick={() => history.push("/transportation")}
              className={
                selected === "/transportation"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
            >
              Transportation
            </Menu.Item>
          )}
          <Menu.Item
            key="6"
            icon={<BarChartOutlined />}
            onClick={() => history.push("/vehicletrackingsystem")}
            className={
              selected === "/vehicletrackingsystem"
                ? "tvsit-main-menu-selected"
                : "tvsit-main-menu"
            }
          >
            Vehicle Tracking System
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<BarChartOutlined />}
            onClick={() => history.push("/cwb")}
            className={
              selected === "/cwb"
                ? "tvsit-main-menu-selected"
                : "tvsit-main-menu"
            }
          >
            Consignment Note
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};
const mapStateToProps = (state, ownProps) => ({
  userRole:
    state.global.userRole.length > 0
      ? state.global.userRole[0].usertype === "TVSUSER"
        ? true
        : false
      : true,
  otpLogIn: state.global.otpLogIn,
});

export default connect(
  mapStateToProps,
  null
)(MenuDrawer);
