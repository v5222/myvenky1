import React, { useState } from "react";
import Drawer from "antd/lib/drawer";
import Button from "antd/lib/button";
import Menu from "antd/lib/menu";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import CloudOutlined from "@ant-design/icons/CloudOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import Logo from "../../images/TVS-SCS-Logo-full-White.png";
import Logo2 from "../../images/TVS-SCS-Tagline-White.png";
import history from "utils/history";
const MenuDrawer = ({ selected }) => {
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
          backgroundColor: "#1890ff",
        }}
      >
        <div
          style={{
            margin: "10px auto 70px auto",
            width: "100%",
            height: "80px",
          }}
        >
          {" "}
          <img src={Logo} className="tvsit_drawer_logo" />
          <img src={Logo2} className="tvsit_drawer_logo2" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: "#1890ff" }}
        >
          <Menu.Item
            key="/podDashboard"
            icon={<BarChartOutlined />}
            className={
              selected === "/podDashboard"
                ? "tvsit-main-menu-selected"
                : "tvsit-main-menu"
            }
            onClick={() => history.push("/podDashboard")}
          >
            POD Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<CloudOutlined />}
            onClick={() => history.push("/courierManagement")}
            className={
              selected === "/courierManagement"
                ? "tvsit-main-menu-selected"
                : "tvsit-main-menu"
            }
          >
            Courier Management
          </Menu.Item>
          {/* <Menu.Item key="3" icon={<TeamOutlined />}>
            Profiles
          </Menu.Item> */}
        </Menu>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
