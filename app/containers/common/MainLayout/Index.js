import React from "react";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import message from "antd/lib/message";
import Dropdown from "antd/lib/dropdown";
import Avatar from "antd/lib/avatar";
import { Pagination } from "antd";

import MenuDrawer from "components/MenuDrawer";
import Question from "../../../images/SVG/question.svg";
import UserOutlined from "@ant-design/icons/UserOutlined";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import {
  SmileOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";

import DashboardOutlined from "@ant-design/icons/DashboardOutlined";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { SET_LOGIN } from "containers/App/constants";
import clsx from "clsx";
import Logo from "../../../images/TVS-SCS-Logo.png";
import Logo2 from "../../../images/TVS-SCS-Tagline-White.png";
const { Header, Content, Footer, Sider } = Layout;
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "utils/history";
import { Typography } from "antd";

const { Text } = Typography;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selected: history.location.pathname,
      width: 200,
    };
  }
  componentDidUpdate() {
    console.log(history.location.pathname);
    if (this.state.selected !== history.location.pathname) {
      this.setState({ selected: history.location.pathname }, () => {
        console.log(this.state.selected, "selected");
      });
    }
  }

  //Event Handlers

  onClick = ({ key }) => {
    message.info("Logged Out successfully");
  };

  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="1">{this.props.user.displayName}</Menu.Item>
      <Menu.Item key="2">{this.props.user.email}</Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          this.props.logout();
          // localStorage.setItem("loggedIn", false);
          history.push("/");
          window.location.reload();
        }}
      >
        Test Name <SmileOutlined />
      </Menu.Item>
      <Menu.Item
        key="2"
        // onClick={() => {
        //   this.props.logout();
        //   localStorage.setItem("loggedIn", false);
        //   history.push("/");
        //   window.location.reload();
        // }}
      >
        dev.support9@tvslsl.com <MailOutlined />
      </Menu.Item>
      <Menu.Item
        key="2"
        // onClick={() => {
        //   this.props.logout();
        //   localStorage.setItem("loggedIn", false);
        //   history.push("/");
        //   window.location.reload();
        // }}
      >
        Logout <LogoutOutlined />
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout
          className={clsx({
            "tvsit_main-layoutFold": this.state.collapsed === true,
            "tvsit_main-layoutUnFold": this.state.collapsed === false,
          })}
        >
          <Header className="tvsit-header-lg">
            <div style={{ display: "flex", alignItems: "center" }}>
              <MenuDrawer
                style={{ marginRight: "10px" }}
                selected={this.state.selected}
              />
              <img src={Logo} className="tvsit_main-logo" />
            </div>

            {/*<div style={{ display: "flex", alignItems: "center" }}>
              <div className="tvsit-main-layout-title">
                {this.state.selected === "/podDashboard"
                  ? "POD Compliance"
                  : "Courier Management"}
        </div>
            </div> */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="tvsit_main-layout-avatar">
                <QuestionCircleOutlined className="qn_icon" />
                <BellOutlined className="bell_icon" />

                <Dropdown overlay={this.menu} trigger={["click"]}>
                  <Avatar
                    size={32}
                    icon={<UserOutlined />}
                    onClick={(e) => e.preventDefault()}
                    className="avatar"
                  />
                </Dropdown>
              </div>
              <Text className="tvsit_main-layout-name">R Shankar</Text>
              {/*  <DownOutlined  className='.tvsit_main-layout-dropdown'/> */}
            </div>
          </Header>

          <Content>{this.props.children}</Content>
          {/* // <Footer style={{ textAlign: "center" }}>
          //   Copyright &#169; 2020 TVS SCS All rights reservered
          // </Footer> */}
          {/*<Pagination
      defaultCurrent={3}
      total={500}
      className='cm_pagination'
           /> */}
          <Footer className="footer">
            Copyright © 2020 TVS SCS . All rights reserved{" "}
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    // logout: () => {
    //   dispatch({ type: SET_LOGIN, loggedIn: false });
    // },
  };
};
export default connect(
  null,
  mapDispatchtoProps
)(MainLayout);
