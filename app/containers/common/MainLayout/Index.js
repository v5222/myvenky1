import React from "react";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import message from "antd/lib/message";
import Dropdown from "antd/lib/dropdown";
import Avatar from "antd/lib/avatar";
// Menu, message, Dropdown, Avatar }
import {
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  RightOutlined
} from "@ant-design/icons";
import { SET_LOGIN } from "containers/App/constants";
import clsx from "clsx";
import Logo from "../../../images/TVS-SCS-Logo.png";
const { Header, Content, Footer, Sider } = Layout;
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "utils/history";

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onClick = ({ key }) => {
    message.info("Logged Out successfully");
  };

  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item
        key="2"
        onClick={() => {
          this.props.logout();
           localStorage.setItem("loggedIn",false)
          history.push("/");
          window.location.reload();
        }}
      >
        Logout <LogoutOutlined />
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          // collapsible
          // collapsed={this.state.collapsed}
          // onCollapse={this.onCollapse}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            backgroundColor: "#1890ff"
          }}
        >
          <div
            style={{
              margin: "10px 0px",
              width: "100%",
              height: "80px"
            }}
          >
            {" "}
            {/* <img src={Logo} className="tvsit_main-logo" /> */}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ background: "#1890ff" }}
          >
            <Menu.Item
              key="1"
              icon={<BarChartOutlined />}
              className="tvsit-main-menu"
              style={{
                background: "#002776",
                borderRadius: "30px",
                width: "88%",
                // marginRight: "10px",
                marginLeft: "12px",
                fontSize: "12px",
                fontWeight: 500
              }}
            >
              POD Dashboard{" "}
              <RightOutlined
                style={{ fontSize: "12px", fontWeight: 500, marginLeft: "5px" }}
              />
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<CloudOutlined />}>
              User Management
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              Profiles
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout
          className={clsx({
            "tvsit_main-layoutFold": this.state.collapsed === true,
            "tvsit_main-layoutUnFold": this.state.collapsed === false
          })}
        >
          <Header
            style={{
              background: "#fff",
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
              position: "relative",
              padding: "0 22px"
            }}
          >
            <h1 className="tvsit-main-layout-title">POD compliance</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="tvsit_main-layout-avatar">
                <Dropdown overlay={this.menu} trigger={["click"]}>
                  <Avatar
                    size={48}
                    icon={<UserOutlined />}
                    onClick={e => e.preventDefault()}
                  />
                </Dropdown>
              </div>
              <img src={Logo} className="tvsit_main-logo" />
            </div>
          </Header>
          <Content>{this.props.children}</Content>
          <Footer style={{ textAlign: "center" }}>TVS Logistics Pvt Ltd</Footer>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    logout: () => {
      dispatch({ type: SET_LOGIN, loggedIn: false });
    }
  };
};
export default connect(
  null,
  mapDispatchtoProps
)(MainLayout);
