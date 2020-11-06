import React from 'react'
import MainLayout from "containers/common/MainLayout";
import ErrorBoundary from "components/ErrorBoundary";
import { Breadcrumb } from "antd";
import styles from "./bidmanagement.module.scss"
import { Tabs } from 'antd';
import { Button } from 'antd';
import BDrecuirement from "../../components/BidManagement/BDrecuirement"
import BidTeam from '../../components/BidManagement/BiDTeam';
const { TabPane } = Tabs;
function BidManagement({ logout, user }) {

    function callback(key) {
        console.log(key);
      }
    return (
        <ErrorBoundary logout={logout} user={user}>
      <MainLayout logout={logout} user={user}>
      <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Bid Management</Breadcrumb.Item>
          </Breadcrumb>
        <main className={styles.container}>
            <h1>Bid Management</h1>
            <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="BD-Requirement Screen" key="1">
      <BDrecuirement />
    </TabPane>
    <TabPane tab="BiD Team" key="2">
      <BidTeam />
    </TabPane>
    
  </Tabs>
  <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
  <Button type="primary">Submit</Button>
  </div>
        </main>
        </MainLayout>
    </ErrorBoundary>
    )
}

export default BidManagement
