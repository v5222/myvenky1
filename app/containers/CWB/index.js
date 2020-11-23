import React from "react";
import MainLayout from "../common/MainLayout/index.js";
import { AutoComplete } from "antd";
import ErrorBoundary from "components/ErrorBoundary";
import { Card } from "antd";
import { Breadcrumb } from "antd";
import { Select } from "antd";
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
      dataItems: [],
      cwbNo: [],
      selected: "",
      isSelected: false,
      printValue: [],
    };
  }

  handlefetch = () => {
    let bodyoptions = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "CWBDDLORDERNO",
          email: "muneesh",
        },
      }),
    };
    fetch(apiUrl, bodyoptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ cwbNo: data.body.bodymsg });
      });
  };
  componentDidMount() {
    this.handlefetch();
  }
  onChange = (value) => {
    this.setState({ selected: value });
  };
  handleSearch = () => {
    let body = {
      body: {
        type: "CWBPRINT",
        email: "057725",
        orderno: this.state.selected,
      },
    };
    let bodyOptions = {
      method: "POST",
      body: JSON.stringify(body),
    };

    let configure = {
      method: "POST",
      body: JSON.stringify({
        body: {
          type: "CWBPRINT",
          email: "057725",
          orderno: this.state.selected,
        },
      }),
    };

    // fetch(apiUrl, configure)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("response data", data);
    //     if (data.body.statuscode === 200) {
    //       this.setState({
    //         dataItems: data.body.bodymsg,
    //       });
    //     } else {
    //       alert(data.body.bodymsg);
    //     }
    //   });

    // fetch(apiUrl, bodyOptions)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({ printValue: data.body.bodymsg, isActive: true });
    //   });
    fetch(apiUrl, configure)
      .then((res) => res.json())
      .then((data) => {
        return fetch(apiUrl, bodyOptions)
          .then((res) => res.json())
          .then((i) => {
            this.setState({
              printValue: i.body.bodymsg,
              isActive: true,
              dataItems: data.body.bodymsg,
            });
          });
      });

    // fetch(apiUrl, bodyOptions)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({ printValue: data.body.bodymsg, isActive: true });
    //   });
  };

  render() {
    const { logout, user } = this.props;
    const { cwbNo, printValue, isActive, dataItems } = this.state;

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
                <Select
                  showSearch
                  placeholder="Enter CWB Number"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  style={{ width: "100%" }}
                >
                  {cwbNo.map((i, index) => {
                    return (
                      <Option value={i} key={index}>
                        {i}
                      </Option>
                    );
                  })}
                </Select>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
                {isActive && (
                  <ReactToPrint
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return (
                        <Button icon={<PrinterOutlined />}>
                          Print Invoice
                        </Button>
                      );
                    }}
                    content={() => this.invoiceRef}
                  />
                )}
                {isActive && (
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

            {isActive && (
              <PrintDoc
                ref={(el) => (this.invoiceRef = el)}
                data={printValue}
              />
            )}
            {isActive && (
              <Label ref={(el) => (this.labelRef = el)} data={dataItems} />
            )}
          </main>
        </MainLayout>
      </ErrorBoundary>
    );
  }
}

export default CWB;
