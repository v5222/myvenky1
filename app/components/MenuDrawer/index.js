import React, { useState } from "react";
import Drawer from "antd/lib/drawer";
import Button from "antd/lib/button";
import Menu from "antd/lib/menu";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
const MenuDrawer = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <MenuFoldOutlined onClick={showDrawer} className="tvsit-header_menu-sm" />
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          backgroundColor: "#1890ff",
        }}
      >
        <div
          style={{
            margin: "10px 0px",
            width: "100%",
            height: "80px",
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
              fontWeight: 500,
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
      </Drawer>
    </>
  );
};

export default MenuDrawer;
