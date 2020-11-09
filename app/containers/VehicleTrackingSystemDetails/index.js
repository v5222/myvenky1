import React, { useState, useEffect } from "react";
import {  TileLayer, MapContainer, GeoJSON, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MainLayout from "../common/MainLayout/index.js";
import Menu from "antd/lib/menu";
import { Typography, Layout, Breadcrumb, Row, Col } from "antd";
import { Pagination } from "antd";
import ErrorBoundary from "components/ErrorBoundary";
import axios from "axios";
import {TrackMarkerIcon, CarMarkerIcon} from "../../components/TrackMarkerIcon/TrackMarkerIcon";

const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

function VehicleTrackingSystemDetails({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const [origLatLong, setOrgLatLong] = useState();
  const [mapDetails, setMapDetails] = useState([]);
  const [startIcon, setStartIcon] = useState("false");
  const [routeOne, setRouteOne] = useState([])
  const [routeTwo, setRouteTwo] = useState([])
  const [routeThree, setRouteThree] = useState([])
  const [routeFour, setRouteFour] = useState([])
  const [tripDet, setTripDet] =useState();
  const [geoJsonFlag, setGeoJsonFlag] = useState("False");
  const [position, setPosition] = useState(null)
  const [startLatLong, setStLatLong] = useState()
  const [endtLatLong, setEndLatLong] = useState()
  const [currLoc, setCurrLoc] = useState([])
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  function handleMapDetailsdata(mapData){
    let mapReqObj = {
      "body": {
        "type": "MAP",
        "email": "muneesh",
        "tripkey": mapData
      }
  }
    axios.post("https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts", mapReqObj)
    .then(res => {
      if(res.data.body.statuscode == 200){
        handleMapDetailsdata(res.data.body.bodymsg)
      }
      else{
        console.log("Err")
      }
    })
    setMapDetails(mapData.tripdetails)
    setOrgLatLong(mapData)
  }

  useEffect(() => {
    if(origLatLong || origLatLong !== undefined ){
      setRouteOne(origLatLong.route1)
      setRouteTwo(origLatLong.route2)
      setRouteThree(origLatLong.route3)
      setRouteFour(origLatLong.route4)
      setGeoJsonFlag("True")
    }
    else{
      console.log("Err")
    }

  },[origLatLong])

  function timer() {
    var getCurrLoc = navigator.geolocation.getCurrentPosition(showPosition)
   }

   function showPosition(position) {
    let pos = [position.coords.latitude, position.coords.longitude];
    setCurrLoc(pos)
}

  useEffect(() => {
    
      setInterval(timer, 1000)

      if (window.location.pathname !== undefined || window.location.pathname === "/vehicletrackingsystem/:id") {
      let datastring = window.location.pathname
      let myArray = datastring.split(/([0-9]+)/)
      handleMapDetailsdata(myArray[1])
      }
      else{
        console.log("Err")
      }
  }, []);

  function handleMapDetailsdata(data){
    let mapReqObj = {
      "body": {
        "type": "MAP",
        "email": "muneesh",
        "tripkey": 5
      }
  }

  axios.post("https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts", mapReqObj)
    .then(res => {
      if(res.data.body.statuscode == 200){
        setTripDet(res.data.body.bodymsg.tripdetails[0])
        setStLatLong(res.data.body.bodymsg.tripdetails[0].originpoint)
        // handleMapDetailsdata(res.data.body.bodymsg)
        setRouteOne(res.data.body.bodymsg.route1)
        setRouteTwo(res.data.body.bodymsg.route2)
        setRouteThree(res.data.body.bodymsg.route3)
        setRouteFour(res.data.body.bodymsg.route4)
        setGeoJsonFlag("True")
        setStartIcon("true");
      }
      else{
        console.log("Err")
      }
    })
      
  }

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
                  <div className="tvsit-vts-container">
                    <div className='d-flex'>
                      <div style={{marginRight:'30px',fontSize:'11px',color:'grey',lineHeight:"18px"}}>
                          <p style={{fontWeight:'700'}}>TDO <span style={{color:'#008DC5'}}>E15TDO0000035</span></p>
                          <p style={{fontWeight:'700'}}>ID <span style={{color:'#008DC5'}}>{(tripDet && tripDet.tripno) ? tripDet.tripno : "--"}</span></p>
                          <p style={{fontWeight:'600',color:"#123F74"}}>{(tripDet && tripDet.originlocation) ? tripDet.originlocation : "--"}</p>
                          <p style={{fontWeight:'600',color:"#123F74"}}>{(tripDet && tripDet.destinationlocation) ? tripDet.destinationlocation : "--"}</p>
                      </div>
                      <div style={{marginRight:'10px',fontSize:'11px',color:'#123F74',lineHeight:"18px"}}>
                          <p>TS7GHSJI45678</p>
                          <button style={{background:"#33cc33"}}>complete</button>
                          <p style={{color:"rgba(18, 63, 116, 0.7)"}} >Total Distance</p>
                          <p>695.00</p>
                      </div>
                    </div>
                    <div class="vl"></div>
                    <div className='d-flex'>
                          <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"18px",fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Remaining distance</p>
                            <p style={{color:'#123F74'}}>{(tripDet && tripDet.remainingkm) ? tripDet.remainingkm : "--"}</p>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>ETA</p>
                            <p style={{color:'#123F74'}}>{(tripDet && tripDet.plannedeta) ? tripDet.plannedeta : "--"}</p>
                          </div>
                          <div style={{marginRight:'30px',fontSize:'11px',lineHeight:"14px",fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}> Started Date</p>
                            <p style={{color:'#123F74'}}>{(tripDet && tripDet.plannedeta) ? tripDet.plannedeta : "--"}</p>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Destination Date</p>
                            <p style={{color:'#123F74'}}>{(tripDet && tripDet.plannedeta) ? tripDet.plannedeta : "--"}</p>
                          </div>
                    </div>
                    <div class="vl"></div>
                          <div style={{marginRight:'30px',fontSize:'11px',fontWeight:'600'}}>
                            <p style={{color:'rgba(18, 63, 116, 0.7)'}}>Drive Name And Number</p>
                            <p style={{color:'#123F74'}}>{(tripDet && tripDet.drivername) ? tripDet.drivername : "--"}</p>
                            <p style={{color:'#123F74'}}>{(tripDet && tripDet.driverphonenumber) ? tripDet.driverphonenumber : "--"}</p>
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
                  center={[13.087426,80.184769]} 
                  zoom={8}
                  scrollWheelZoom={true}
                  >
                   <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[13.087426,80.184769]} icon={TrackMarkerIcon}></Marker>
                    <Marker position={[12.634908, 77.721673]} icon={TrackMarkerIcon}></Marker>
                    <Marker position={[12.634908, 77.721673]} icon={CarMarkerIcon}></Marker>
                    {/* {startIcon === "true" ? 
                    <Marker position={[startLatLong]} icon={TrackMarkerIcon}></Marker> : ""
                    } */}
                    {
                             geoJsonFlag === "True" ?
                             <GeoJSON  
                              data={[
                                {
                               "type": "Feature",
                               "properties": {"route": "Route1"},
                               "geometry": {
                                 "type": "LineString",
                                 "coordinates": routeTwo
                               }
                             }
                             , {
                               "type": "Feature",
                               "properties": {"route": "Route2"},
                               "geometry": {
                                 "type": "LineString",
                                 "coordinates": routeTwo
                               }
                             },
                             {
                               "type": "Feature",
                               "properties": {"route": "Route3"},
                               "geometry": {
                                 "type": "LineString",
                                 "coordinates": routeThree
                               }
                             },
                             {
                              "type": "Feature",
                              "properties": {"route": "Route4"},
                              "geometry": {
                                "type": "LineString",
                                "coordinates": routeFour
                              }
                            }
                             ]} style={
                              function(feature) {
                                  switch (feature.properties.route) {
                                    case 'Route1': return {color: "#000000"};
                                    case 'Route2': return {color: "#cc0000"};
                                    case 'Route3': return {color: "#0033cc"};
                                    case 'Route4': return {color: "#000000"};
                                    }
                                  }
                              } /> : "" 
                           } 
                  </MapContainer>
            </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default VehicleTrackingSystemDetails;





