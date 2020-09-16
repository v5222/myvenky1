import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import CMDashboard from "../../components/CMDashboard";
import DwmDasboard from '../../components/DwmDashboard'
import Menu from "antd/lib/menu";
import { Typography } from "antd";
import { Pagination } from "antd";

import { Breadcrumb } from "antd";

const { Title } = Typography;
const { SubMenu } = Menu;

function DwmApplication({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const handleClick = (e) => {
    setCurrent(e.key);
  };


  
  return (
    <MainLayout logout={logout} user={user}>
      <main className="tvsit-dwm-container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>DWM Application</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="dwm_title">DWM Application</h1>

        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="dashboard_header"
        >

        </Menu>
        <div className="tvsit-dwm-wrapper">
        <DwmDasboard />

        </div>

      </main>
    </MainLayout>
  )



}

export default DwmApplication;
