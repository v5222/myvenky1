import React, { useState, useEffect } from "react";
import {
  TileLayer,
  MapContainer,
  GeoJSON,
  Marker,
  useMapEvents,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MainLayout from "../common/MainLayout/index.js";
import Menu from "antd/lib/menu";
import { Typography, Layout, Breadcrumb, Row, Col } from "antd";
import { Pagination } from "antd";
import ErrorBoundary from "components/ErrorBoundary";
import L from "leaflet";
import axios from "axios";
import {
  TrackMarkerIcon,
  CarMarkerIcon,
  BlinkIcon,
} from "../../components/TrackMarkerIcon/TrackMarkerIcon";
import { map } from "jquery";

const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

function VehicleTrackingSystemDetails({ logout, user }) {
  const [current, setCurrent] = useState("dashboard");
  const [routeOne, setRouteOne] = useState([]);
  const [routeTwo, setRouteTwo] = useState([]);
  const [routeThree, setRouteThree] = useState([]);
  const [routeFour, setRouteFour] = useState([]);
  const [tripDet, setTripDet] = useState();
  const [geoJsonFlag, setGeoJsonFlag] = useState("False");
  const [currLoc, setCurrLoc] = useState(0);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  function timer() {
    // getRandomInRange(-180, 180, 3)
    var getCurrLoc = navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    let pos = [position.coords.latitude, position.coords.longitude];
    // setCurrLoc(pos)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrLoc((currLoc) => currLoc + 1);
    }, 10000);

    setInterval(timer, 3000);
    if (
      window.location.pathname !== undefined ||
      window.location.pathname === "/vehicletrackingsystem/:id"
    ) {
      let datastring = window.location.pathname;
      let myArray = datastring.split(/([0-9]+)/);
      handleMapDetailsdata(myArray[1]);
    } else {
      console.log("Err");
    }
  }, []);

  // useEffect(() => {
  //   var map = L.map("mapcontainer");
  //   map.setView([routeOne[currLoc][1], routeOne[currLoc][0]],5)
  // }, [currLoc])

  function handleMapDetailsdata(data) {
    console.log("TripKey", data);
    let mapReqObj = {
      body: {
        type: "MAP",
        email: "muneesh",
        tripkey: data,
      },
    };

    console.log("ReqObj", mapReqObj);

    axios
      .post(
        "https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts",
        mapReqObj
      )
      .then((res) => {
        console.log("Respo", res.data);
        if (res.data.body.statuscode == 200) {
          setTripDet(res.data.body.bodymsg.tripdetails[0]);
          setRouteOne(res.data.body.bodymsg.route1);
          // setRouteTwo(res.data.body.bodymsg.route2)
          // setRouteThree(res.data.body.bodymsg.route3)
          // setRouteFour(res.data.body.bodymsg.route4)
          setGeoJsonFlag("True");
        } else {
          console.log("Err");
        }
      });
  }

  return (
    <ErrorBoundary logout={logout} user={user}>
      <MainLayout logout={logout} user={user}>
        <main className="tvsit-dwm-container">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              Customer - Vehicle Tracking System
            </Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="dwm_title">Customer - Vehicle Tracking System</h1>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="dashboard_header"
          />
          <div className="tvsit-vts-bgcontainer">
            <div className="bluecontainer">
              <div className="tvsit-vts-container">
                <div className="d-flex">
                  {console.log("Data", tripDet)}
                  <div
                    style={{
                      marginRight: "30px",
                      fontSize: "11px",
                      color: "grey",
                      lineHeight: "18px",
                    }}
                  >
                    <p style={{ fontWeight: "700" }}>
                      TDO{" "}
                      <span style={{ color: "#008DC5" }}>E15TDO0000035</span>
                    </p>
                    <p style={{ fontWeight: "700" }}>
                      ID{" "}
                      <span style={{ color: "#008DC5" }}>
                        {tripDet && tripDet.tripno ? tripDet.tripno : "--"}
                      </span>
                    </p>
                    <p style={{ fontWeight: "600", color: "#123F74" }}>
                      {tripDet && tripDet.originlocation
                        ? tripDet.originlocation
                        : "--"}
                    </p>
                    <p style={{ fontWeight: "600", color: "#123F74" }}>
                      {tripDet && tripDet.destinationlocation
                        ? tripDet.destinationlocation
                        : "--"}
                    </p>
                  </div>
                  <div
                    style={{
                      marginRight: "10px",
                      fontSize: "11px",
                      color: "#123F74",
                      lineHeight: "18px",
                    }}
                  >
                    <p>
                      {tripDet && tripDet.vehiclenumber
                        ? tripDet.vehiclenumber
                        : "--"}
                    </p>
                    <button style={{ background: "#33cc33" }}>complete</button>
                    <p style={{ color: "rgba(18, 63, 116, 0.7)" }}>
                      Total Distance
                    </p>
                    <p>
                      {tripDet && tripDet.plannedkm ? tripDet.plannedkm : "--"}
                    </p>
                  </div>
                </div>
                <div className="vl" />
                <div className="d-flex">
                  <div
                    style={{
                      marginRight: "30px",
                      fontSize: "11px",
                      lineHeight: "18px",
                      fontWeight: "600",
                    }}
                  >
                    <p style={{ color: "rgba(18, 63, 116, 0.7)" }}>
                      Remaining distance
                    </p>
                    <p style={{ color: "#123F74" }}>
                      {tripDet && tripDet.remainingkm
                        ? tripDet.remainingkm
                        : "--"}
                    </p>
                    <p style={{ color: "rgba(18, 63, 116, 0.7)" }}>ETA</p>
                    <p style={{ color: "#123F74" }}>
                      {tripDet && tripDet.plannedeta
                        ? tripDet.plannedeta
                        : "--"}
                    </p>
                  </div>
                  <div
                    style={{
                      marginRight: "30px",
                      fontSize: "11px",
                      lineHeight: "14px",
                      fontWeight: "600",
                    }}
                  >
                    <p style={{ color: "rgba(18, 63, 116, 0.7)" }}>
                      {" "}
                      Started Date
                    </p>
                    <p style={{ color: "#123F74" }}>
                      {tripDet && tripDet.plannedeta
                        ? tripDet.plannedeta
                        : "--"}
                    </p>
                    <p style={{ color: "rgba(18, 63, 116, 0.7)" }}>
                      Destination Date
                    </p>
                    <p style={{ color: "#123F74" }}>
                      {tripDet && tripDet.plannedeta
                        ? tripDet.plannedeta
                        : "--"}
                    </p>
                  </div>
                </div>
                <div className="vl" />
                <div
                  style={{
                    marginRight: "30px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  <p style={{ color: "rgba(18, 63, 116, 0.7)" }}>
                    Drive Name And Number
                  </p>
                  <p style={{ color: "#123F74" }}>
                    {tripDet && tripDet.drivername ? tripDet.drivername : "--"}
                  </p>
                  <p style={{ color: "#123F74" }}>
                    {tripDet && tripDet.driverphonenumber
                      ? tripDet.driverphonenumber
                      : "--"}
                  </p>
                </div>
                <div
                  style={{
                    marginRight: "30px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  <p style={{ color: "rgba(18, 63, 116, 0.7)" }}>
                    Last Known location
                  </p>
                  <p style={{ color: "#123F74" }}>
                    {tripDet && tripDet.currentlocation
                      ? tripDet.currentlocation
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            {geoJsonFlag === "True" ? (
              <MapContainer
                className="mapcontainer"
                center={
                  currLoc
                    ? [routeOne[currLoc][1], routeOne[currLoc][0]]
                    : [routeOne[0][1], routeOne[0][0]]
                }
                zoom={8}
                scrollWheelZoom={true}
                bounceAtZoomLimits={true}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[routeOne[0][1], routeOne[0][0]]}
                  icon={TrackMarkerIcon}
                />
                {/* {currLoc ? <CircleMarker 
                    className="circmark"
                    center={[routeOne[currLoc][1], routeOne[currLoc][0] ]} 
                    color="blue" 
                    radius={8}
                    ></CircleMarker> : ""} */}
                <Marker
                  position={[
                    routeOne[routeOne.length - 1][1],
                    routeOne[routeOne.length - 1][0],
                  ]}
                  icon={TrackMarkerIcon}
                />
                {currLoc ? (
                  <Marker
                    position={[routeOne[currLoc][1], routeOne[currLoc][0]]}
                    icon={BlinkIcon}
                  />
                ) : (
                  ""
                )}

                <GeoJSON
                  data={[
                    {
                      type: "Feature",
                      properties: { route: "Route1" },
                      geometry: {
                        type: "LineString",
                        coordinates: routeOne,
                      },
                    },
                    //  , {
                    //    "type": "Feature",
                    //    "properties": {"route": "Route2"},
                    //    "geometry": {
                    //      "type": "LineString",
                    //      "coordinates": routeTwo
                    //    }
                    //  },
                    //  {
                    //    "type": "Feature",
                    //    "properties": {"route": "Route3"},
                    //    "geometry": {
                    //      "type": "LineString",
                    //      "coordinates": routeThree
                    //    }
                    //  },
                    //  {
                    //   "type": "Feature",
                    //   "properties": {"route": "Route4"},
                    //   "geometry": {
                    //     "type": "LineString",
                    //     "coordinates": routeFour
                    //   }
                    // }
                  ]}
                  style={function(feature) {
                    switch (feature.properties.route) {
                      case "Route1":
                        return { color: "#000000" };
                      // case 'Route2': return {color: "#cc0000"};
                      // case 'Route3': return {color: "#0033cc"};
                      // case 'Route4': return {color: "#000000"};
                    }
                  }}
                />
              </MapContainer>
            ) : (
              ""
            )}
          </div>
        </main>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default VehicleTrackingSystemDetails;
