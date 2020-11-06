import React, { useState, useEffect } from "react";
import {  TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MainLayout from "../common/MainLayout/index.js";
import Menu from "antd/lib/menu";
import { Typography, Layout, Breadcrumb, Row, Col } from "antd";
import { Pagination } from "antd";
import ErrorBoundary from "components/ErrorBoundary";


const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

function VehicleTrackingSystemDetails({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    
    <ErrorBoundary logout={logout} user={user}>
      <MainLayout logout={logout} user={user}>
        <main className="tvsit-dwm-container">
          <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Customer - Vehicle Tracking System</Breadcrumb.Item>
            </Breadcrumb>
            
            <h1 className="dwm_title">Customer - Vehicle Tracking System</h1>
            <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
                className="dashboard_header"
              ></Menu>
            <div className="tvsit-vts-bgcontainer">
                <div className="bluecontainer">
                  {console.log("Props",history.state.state)}
                  <div className="tvsit-vts-container">
                    <div className='d-flex'>
                      <div style={{marginRight:'30px',fontSize:'11px',color:'grey',lineHeight:"18px"}}>
                          <p style={{fontWeight:'700'}}>TDO <span style={{color:'#008DC5'}}>E15TDO0000035</span></p>
                          <p style={{fontWeight:'700'}}>ID <span style={{color:'#008DC5'}}>TDO0000035</span></p>
                          <p style={{fontWeight:'600',color:"#123F74"}}>* Mathura Road Faridabad, faridabad</p>
                          <p style={{fontWeight:'600',color:"#123F74"}}>* Kollur, Medak</p>
                      </div>
                      <div style={{marginRight:'10px',fontSize:'11px',color:'#123F74',lineHeight:"18px"}}>
                          <p>TS7GHSJI45678</p>
                          <button>complete</button>
                          <p style={{color:"rgba(18, 63, 116, 0.7)"}} >Total Distance</p>
                          <p>695.00</p>
                      </div>
                    </div>
                    <div class="vl"></div>
                    <div className='d-flex'>
                          <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"18px",fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Remaining distance</p>
                            <p style={{color:'#123F74'}}>331Km</p>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>ETA</p>
                            <p style={{color:'#123F74'}}>Oct 24 2020 11.27PM</p>
                          </div>
                          <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"14px",fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}> Started Date</p>
                            <p style={{color:'#123F74'}}>Oct 24 2020 11.27PM</p>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Destination Date</p>
                            <p style={{color:'#123F74'}}>Oct 24 2020 11.27PM</p>
                          </div>
                    </div>
                    <div class="vl"></div>
                          <div style={{marginRight:'30px',fontSize:'11px',fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Drive Name And Number</p>
                            <p style={{color:'#123F74'}}>Dasarath Kumar</p>
                            <p style={{color:'#123F74'}}>8056090314</p>
                          </div>
                          <div style={{marginRight:'30px',fontSize:'11px',fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Last Known location</p>
                            <p style={{color:'#123F74'}}>** Bentala Bus stop, NH 6, Rajsaba, West</p>
                            <p style={{color:'#123F74'}}>** Bengal 721513, India</p>
                          </div>
                    </div>
                </div>
                  <MapContainer
                  className="mapcontainer"
                  center={[11.1085, 77.3411]} 
                  zoom={13}
                  scrollWheelZoom={true}
                  >
                   <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </MapContainer>
            </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default VehicleTrackingSystemDetails;