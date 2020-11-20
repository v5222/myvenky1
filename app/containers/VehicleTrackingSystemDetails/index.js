import React, { useState, useEffect, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  GeoJSON,
  Marker,
  useMapEvent,
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
  TrackMarkerDestIcon,
} from "../../components/TrackMarkerIcon/TrackMarkerIcon";
import moment from "moment";
import { map } from "jquery";
import {
  SearchOutlined,
  ArrowDownOutlined,
  DownOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

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
  const animateRef = useRef(false);
  const outerBounds = [[50.505, -29.09], [52.505, 29.09]];
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
    }, 5000);

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

  function handleMapDetailsdata(data) {
    console.log("TripKey", data);
    let mapReqObj = {
      body: {
        type: "MAP",
        email: "muneesh",
        tripkey: data,
      },
    };

    axios
      .post(
        "https://ur06a1nev1.execute-api.ap-south-1.amazonaws.com/vehicle/vts",
        mapReqObj
      )
      .then((res) => {
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

  function LocationMarker() {
    // const [position, setPosition] = useState(null)
    // const map = useMapEvents({
    //   click() {
    //     map.locate()
    //   },
    //   locationfound(e) {
    //     console.log("e",e)
    //     map.flyTo(e.latlng, map.getZoom())
    //   },
    // })

    // return position === null ? null : (
    //   <Marker position={position} icon={TrackMarkerIcon}>
    //     <Popup>You are here</Popup>
    //   </Marker>
    // )
    // const map = useMapEvents({
    //   click: () => {
    //     map.locate()
    //     console.log("@@",L.LatLng)
    //   },
    //   locationfound: (location) => {
    //     console.log('location found:', location)
    //   },

    // })
    // const map = useMapEvent('click', () => {
    //   map.fitBounds(
    //     [40.712, -74.227],
    //     [40.774, -74.125]
    //     )
    //   // map.setCenter([50.5, 30.5])
    // })

    return null;
  }

  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      // console.log("lllll",e.latlng)
      map.setView([routeOne[currLoc][1], routeOne[currLoc][0]], map.getZoom(), {
        animate: animateRef || false,
      });
    });

    return null;
  }

  function LocationTracingFunc() {
    if (currLoc != routeOne[routeOne.length - 1] && currLoc) {
      return (
        <Marker
          position={[routeOne[currLoc][1], routeOne[currLoc][0]]}
          icon={BlinkIcon}
        />
      );
    } else {
      return <Marker position={[11.1085, 77.3411]} icon={BlinkIcon} />;
    }
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
            <div class="flex2-container2">
              <div class="flex2-item2-left2">
                <h3 class="title20">
                  ID{" "}
                  <span style={{ color: "#008DC5", fontWeight: "bold" }}>
                    {tripDet && tripDet.tripno ? tripDet.tripno : "--"}
                  </span>
                </h3>
                <h3
                  class="title21"
                  style={{
                    color: "rgba(18, 63, 116, 0.7)",
                    fontWeight: "600",
                  }}
                >
                  {tripDet && tripDet.vehiclenumber
                    ? tripDet.vehiclenumber
                    : "--"}
                </h3>
                <h3 class="title20">
                  <EnvironmentOutlined
                    style={{ color: "#2FCB16", fontWeight: "600" }}
                  />
                  {tripDet && tripDet.originlocation
                    ? tripDet.originlocation
                    : "--"}
                </h3>
                <h3 class="title20">
                  <EnvironmentOutlined
                    style={{ color: "#FF0000", fontWeight: "600" }}
                  />
                  {tripDet && tripDet.destinationlocation
                    ? tripDet.destinationlocation
                    : "--"}
                </h3>
                <h3
                  class="title21"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  Total Distance
                </h3>
                <h3 class="title21">
                  {tripDet && tripDet.plannedkm ? tripDet.plannedkm : "--"}
                </h3>
              </div>
              <div class="flex2-item2-center2">
                <h3
                  class="title20"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  Remaining Distance
                </h3>
                <h3 class="title20">
                  {tripDet && tripDet.remainingkm
                    ? tripDet.remainingkm + " km"
                    : "--"}
                </h3>
                <h3
                  class="title21"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  Started Date
                </h3>
                <h3 class="title21">
                  {tripDet && tripDet.tripstarttimestamp
                    ? moment(tripDet.tripstarttimestamp).format(
                        "MMM DD YYYY hh:mm A"
                      )
                    : "--"}
                </h3>
                <h3
                  class="title20"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  ETA
                </h3>
                <h3 class="title20">
                  {tripDet && tripDet.plannedeta
                    ? moment(tripDet.plannedeta).format(
                        "MMM DD YYYY hh:mm A"
                      )
                    : "--"}
                </h3>
                <h3
                  class="title21"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  Destination Date
                </h3>
                <h3 class="title21">
                  {tripDet && tripDet.destinationdate
                    ? moment(tripDet.destinationdate).format(
                        "MMM DD YYYY hh:mm A"
                      )
                    : "--"}
                </h3>
              </div>
              <div class="flex2-item2-right2">
                <h3
                  class="title20"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  Driver Name
                </h3>
                <h3 class="title20">
                  {tripDet && tripDet.drivername ? tripDet.drivername : "--"}
                </h3>
                <h3
                  class="title21"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  Last Known Location
                </h3>
                <h3 class="title21">
                  {tripDet && tripDet.currentlocation
                    ? tripDet.currentlocation
                    : "--"}
                </h3>
                <h3
                  class="title20"
                  style={{ color: "rgba(18, 63, 116, 0.7)", fontWeight: "600" }}
                >
                  Driver Phone Number
                </h3>
                <h3 class="title20">
                  {tripDet && tripDet.driverphonenumber
                    ? tripDet.driverphonenumber
                    : "--"}
                </h3>
              </div>
            </div>
            {geoJsonFlag === "True" ? (
              <MapContainer
                className="mapcontainer"
                // center={ [routeOne[currLoc][1], routeOne[currLoc][0] ] }
                // zoom={8}
                scrollWheelZoom={false}
                bounceAtZoomLimits={true}
                bounds={[
                  [routeOne[currLoc][1], routeOne[currLoc][0]],
                  [
                    routeOne[routeOne.length - 1][1],
                    routeOne[routeOne.length - 1][0],
                  ],
                ]}
                maxZoom={13}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[routeOne[0][1], routeOne[0][0]]}
                  icon={TrackMarkerIcon}
                />
                {/* <LocationMarker/> */}
                {currLoc ? <SetViewOnClick animateRef={animateRef} /> : ""}
                <Marker
                  position={[
                    routeOne[routeOne.length - 1][1],
                    routeOne[routeOne.length - 1][0],
                  ]}
                  icon={TrackMarkerDestIcon}
                />
                {/* { currLoc ? <Marker position={currLoc ? [routeOne[currLoc][1], routeOne[currLoc][0] ] : [routeOne[0][1], routeOne[0][0] ]} icon={BlinkIcon}></Marker> : ""} */}
                <LocationTracingFunc />
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
                  ]}
                  style={function(feature) {
                    switch (feature.properties.route) {
                      case "Route1":
                        return { color: "#000000" };
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
