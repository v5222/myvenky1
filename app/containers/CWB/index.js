import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";

import ErrorBoundary from "components/ErrorBoundary";
import { Card } from "antd";
import { Breadcrumb } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PrintDoc from "./PrintDoc";
import ReactToPrint from "react-to-print";
import PrinterOutlined from "@ant-design/icons/PrinterOutlined";

class CWB extends React.Component {
  render() {
    const { logout, user } = this.props;
    return (
      <ErrorBoundary logout={logout} user={user}>
        <MainLayout logout={logout} user={user}>
          <main className="tvsit-dwm-container">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>CWB</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className="dwm_title">CWB</h1>
            <Card
              style={{ padding: "20px", margin: "10px", borderRadius: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  margin: "0 auto",
                }}
              >
                <Input
                  placeholder="Enter Ivoice Number"
                  style={{ width: "70%", marginRight: "10px" }}
                />
                <Button type="primary" icon={<SearchOutlined />}>
                  Search
                </Button>
                <ReactToPrint
                  trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <Button icon={<PrinterOutlined />}>Print</Button>;
                  }}
                  content={() => this.invoiceRef}
                />
              </div>
              <div style={{ marginTop: "20px" }} />
            </Card>
            <PrintDoc ref={(el) => (this.invoiceRef = el)} />
          </main>
        </MainLayout>
      </ErrorBoundary>
    );
  }
}

export default CWB;
