import React from "react";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import message from "antd/lib/message";
import Dropdown from "antd/lib/dropdown";
import Avatar from "antd/lib/avatar";
import MenuDrawer from "components/MenuDrawer";
import SupplyChainSVG from "../../../images/SVG/360svg.svg";
import UserOutlined from "@ant-design/icons/UserOutlined";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import DashboardOutlined from "@ant-design/icons/DashboardOutlined";
import { SET_LOGIN } from "containers/App/constants";
import clsx from "clsx";
import Logo from "../../../images/TVS-SCS-Logo.png";
import Logo2 from "../../../images/TVS-SCS-Tagline-Color.png";
const { Header, Content, Footer, Sider } = Layout;
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "utils/history";
class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selected: history.location.pathname,
    };
  }
  componentDidUpdate() {
    if (this.state.selected !== history.location.pathname) {
      this.setState({ selected: history.location.pathname }, () => {
        console.log(this.state.selected);
      });
    }
  }

  onCollapse = (collapsed) => {
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
          localStorage.setItem("loggedIn", false);
          history.push("/");
          window.location.reload();
        }}
      >
        Logout <LogoutOutlined />
      </Menu.Item>
    </Menu>
  );
  handleSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    this.setState({
      selected: key,
    });
  };
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          // collapsible
          // collapsed={this.state.collapsed}
          // onCollapse={this.onCollapse}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            backgroundColor: "#1890ff",
          }}
        >
          <div>
            <img src={Logo} className="tvsit_main-logo" />
            <img src={Logo2} className="tvsit_main-logo2" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.selected]}
            style={{ background: "#1890ff" }}
            onSelect={this.handleSelect}
          >
            <Menu.Item
              key="/podDashboard"
              icon={<BarChartOutlined />}
              className={
                this.state.selected === "/podDashboard"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
              onClick={() => history.push("/podDashboard")}
            >
              POD Dashboard
            </Menu.Item>
            {/* <Menu.Item
              key="/courierManagement"
              icon={<DashboardOutlined />}
              className={
                this.state.selected === "/courierManagement"
                  ? "tvsit-main-menu-selected"
                  : "tvsit-main-menu"
              }
              // className="tvsit-main-menu-selected"
              onClick={() => history.push("/courierManagement")}
            >
              Courier Management
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout
          className={clsx({
            "tvsit_main-layoutFold": this.state.collapsed === true,
            "tvsit_main-layoutUnFold": this.state.collapsed === false,
          })}
        >
          <Header className="tvsit-header-lg">
            <div style={{ display: "flex", alignItems: "center" }}>
              <MenuDrawer style={{ marginRight: "10px" }} />
              <div className="tvsit-main-layout-title">
                {this.state.selected === "/podDashboard"
                  ? "POD Compliance"
                  : "Courier Management"}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="tvsit_main-layout-avatar">
                <Dropdown overlay={this.menu} trigger={["click"]}>
                  <Avatar
                    size={48}
                    icon={<UserOutlined />}
                    onClick={(e) => e.preventDefault()}
                  />
                </Dropdown>
              </div>
              {/* <img
                src={Logo}
                style={{ width: "55px", height: "60px", marginLeft: "10px" }}
              /> */}
            </div>
          </Header>
          <Content>{this.props.children}</Content>
          <Footer style={{ textAlign: "center" }}>TVS Logistics Pvt Ltd</Footer>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: SET_LOGIN, loggedIn: false });
    },
  };
};
export default connect(
  null,
  mapDispatchtoProps
)(MainLayout);
