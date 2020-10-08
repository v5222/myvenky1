import React from "react";
import MainLayout from "../common/MainLayout/index.js";
import TransportationBilling from "../../components/TransportationBilling";
import Menu from "antd/lib/menu";
import { Typography } from "antd";
import { Breadcrumb } from "antd";



function TransportationBillingContainer({ logout, user }) {
 
  return (
    <MainLayout logout={logout} user={user}>
      <main className="tvsit-dwm-container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Tranporation</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="dwm_title">TransportationBilling</h1>

        <Menu
         
          mode="horizontal"
          className="dashboard_header"
        />
        <div className="tvsit-dwm-wrapper">
       <TransportationBilling />
        </div>
      </main>
    </MainLayout>
  );
}

export default TransportationBillingContainer;
