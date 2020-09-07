import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import Menu from "antd/lib/menu";
// import CMConsignmentTracker from "../../components/CMConsignmentTracker";
import CMDashboard from "../../components/CMDashboard";
const { SubMenu } = Menu;
function CourierManagement({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <MainLayout logout={logout} user={user}>
      <main className="tvsit-cm-container">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          {/* <Menu.Item key="tracker">Courier Consginment Tracker</Menu.Item>
          <Menu.Item key="search">Courier Consginment Search</Menu.Item>

          <Menu.Item key="track&trace">Track & Trace</Menu.Item> */}
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
        </Menu>
        <div className="tvsit-cm-wrapper">
          {/* <CMConsignmentTracker /> */}
          <CMDashboard />
        </div>
      </main>
    </MainLayout>
  );
}

export default CourierManagement;
