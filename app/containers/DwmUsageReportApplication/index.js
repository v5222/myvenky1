import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import DwmUsageReport from '../../components/DwmUsageReport'
import Menu from "antd/lib/menu";
import { Typography } from "antd";
import { Pagination } from "antd";

import { Breadcrumb } from "antd";

const { Title } = Typography;
const { SubMenu } = Menu;

function DwmUsageReportApplication({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const handleClick = (e) => {
    setCurrent(e.key);
    console.log(e.key)
  };


  
  return (
    <MainLayout logout={logout} user={user}>
      <main className="tvsit-dwm-container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>DWM Usage Report</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="dwm_title">DWM Usage Report</h1>

        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="dashboard_header"
        >

        </Menu>
        <div className="tvsit-dwm-wrapper">
        <DwmUsageReport />

        </div>

      </main>
    </MainLayout>
  )



}

export default DwmUsageReportApplication;
