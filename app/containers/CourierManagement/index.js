import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import Menu from "antd/lib/menu";
// import CMConsignmentTracker from "../../components/CMConsignmentTracker";
import CMDashboard from "../../components/CMDashboard";
import Preferance from "../../components/CMDashboard/Preferences";
import { Typography } from "antd";
import { Pagination } from "antd";

import { Breadcrumb } from "antd";

const { Title } = Typography;
const { SubMenu } = Menu;
function CourierManagement({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <MainLayout logout={logout} user={user}>
      <main className="tvsit-cm-container">
        <Breadcrumb style={{ margin: "10px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Courier Management</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="cm_title">Courier Management</h1>

        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="dashboard_header"
        >
          {/* <Menu.Item key="tracker">Courier Consginment Tracker</Menu.Item>
        <Menu.Item key="search">Courier Consginment Search</Menu.Item>

        <Menu.Item key="track&trace">Track & Trace</Menu.Item> */}

          <Menu.Item key="dashboard">Delivery Status</Menu.Item>
          {/* <Menu.Item style={{marginLeft:'61rem'}}><Preferance /></Menu.Item> */}
        </Menu>
        <div className="tvsit-cm-wrapper">
          {/* <CMConsignmentTracker />  */}
          <CMDashboard />
         {/* <Pagination
            defaultCurrent={3}
            total={500}
            className="cm_pagination"
          /> */}
        </div>
      </main>
    </MainLayout>
  );
}

export default CourierManagement;
