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
import ReactToPrint from "react-to-print";
import PrinterOutlined from "@ant-design/icons/PrinterOutlined";
const URL = "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/dwm";
class CWB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: "Burns Bay Road" },
        { value: "Downing Street" },
        { value: "Wall Street" },
      ],
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
    fetch(URL, bodyoptions)
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
    fetch(URL, bodyOptions)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ printValue: data.body.bodymsg, isSelected: true });
      });
  };

  render() {
    const { logout, user } = this.props;
    const { cwbNo, printValue, isSelected } = this.state;
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
            {isSelected && (
              <PrintDoc
                ref={(el) => (this.invoiceRef = el)}
                data={printValue}
              />
            )}
          </main>
        </MainLayout>
      </ErrorBoundary>
    );
  }
}

export default CWB;
