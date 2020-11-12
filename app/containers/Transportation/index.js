import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import TransportationDashboard from "../../components/TransportationDashboard";
import Menu from "antd/lib/menu";
import { Typography } from "antd";
import ErrorBoundary from "components/ErrorBoundary";

import { Breadcrumb } from "antd";

function TransportationApplication({ logout, user }) {
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
            <Breadcrumb.Item>Transportation</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="dwm_title">Transportation</h1>

          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="dashboard_header"
          />
          <div className="tvsit-dwm-wrapper">
            <TransportationDashboard />
          </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default TransportationApplication;
