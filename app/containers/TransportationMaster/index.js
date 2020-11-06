import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";
import TransportationMasterDashboard from "../../components/TransportationMasterDashboard";
import Menu from "antd/lib/menu";
import { Typography } from "antd";
import ErrorBoundary from "components/ErrorBoundary";

import { Breadcrumb } from "antd";


function TransportationMasterApplication({ logout, user }) {
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
            <Breadcrumb.Item>Transportation Master</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="dwm_title">Transportation Master</h1>

          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="dashboard_header"
          />
          <div className="tvsit-dwm-wrapper">
            <TransportationMasterDashboard />
          </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default TransportationMasterApplication;
