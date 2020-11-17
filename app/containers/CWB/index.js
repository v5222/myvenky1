import React, { useState, useEffect } from "react";
import MainLayout from "../common/MainLayout/index.js";

import ErrorBoundary from "components/ErrorBoundary";
import { Card } from "antd";
import { Breadcrumb } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PrintDoc from "./PrintDoc";
import Label from "./Label";
import ReactToPrint from "react-to-print";
import PrinterOutlined from "@ant-design/icons/PrinterOutlined";

const apiUrl =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/dwm";

class CWB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      dataItems: null,
    };
  }

  handleSearch = () => {
    this.setState({ isActive: true });
  };

  componentDidMount() {
    let configure = {
      method: "post",
      body: JSON.stringify({
        body: {
          type: "CWBPRINT",
          email: "057725",
          orderno: "",
        },
      }),
    };

    fetch(apiUrl, configure)
      .then((res) => res.json())
      .then((data) => {
        console.log("response data", data);

        if (data.body.statuscode === 200) {
          this.setState({
            dataItems: data.body.bodymsg,
          });
          console.log(this.state.dataItems);
          console.log(this.state.dataItems[0].barcode);
        } else {
          alert(data.body.bodymsg);
        }
      });
  }

  render() {
    const { logout, user } = this.props;
    const { dataItems } = this.state;

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
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
                {this.state.isActive && (
                  <ReactToPrint
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return <Button icon={<PrinterOutlined />}>Print</Button>;
                    }}
                    content={() => this.invoiceRef}
                  />
                )}
                {this.state.isActive && (
                  <ReactToPrint
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return (
                        <Button icon={<PrinterOutlined />}>Print Label</Button>
                      );
                    }}
                    content={() => this.labelRef}
                  />
                )}
              </div>
              <div style={{ marginTop: "20px" }} />
            </Card>
            {this.state.isActive && (
              <Label ref={(el) => (this.labelRef = el)} data={dataItems} />
            )}

            {this.state.isActive && (
              <PrintDoc ref={(el) => (this.invoiceRef = el)} />
            )}
          </main>
        </MainLayout>
      </ErrorBoundary>
    );
  }
}

export default CWB;
