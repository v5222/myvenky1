import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import CMDashboard from "../../components/CMDashboard";
import DwmDasboard from "../../components/DwmDashboard";
import Menu from "antd/lib/menu";
import { Typography } from "antd";
import { Pagination } from "antd";
import ErrorBoundary from "components/ErrorBoundary";

import { Breadcrumb } from "antd";

const { Title } = Typography;
const { SubMenu } = Menu;

function DwmApplication({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <ErrorBoundary logout={logout} user={user}>
      <MainLayout logout={logout} user={user}>
        <main className="tvsit-dwm-container">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>DWM summary</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="dwm_title">DWM summary</h1>

          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="dashboard_header"
          />
          <div className="tvsit-dwm-wrapper">
            <DwmDasboard />
          </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default DwmApplication;
