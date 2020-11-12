import L from "leaflet";

export const TrackMarkerIcon = L.icon({
  iconUrl: require("../../images/SVG/venue_location_icon.svg"),
  iconRetinaUrl: require("../../images/SVG/venue_location_icon.svg"),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});

export const TrackMarkerDestIcon = L.icon({
  iconUrl: require("../../images/SVG/DestIcon.svg"),
  iconRetinaUrl: require("../../images/SVG/DestIcon.svg"),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [30, 30],
  className: "leaflet-venue-icon",
});

export const CarMarkerIcon = L.icon({
  iconUrl: require("../../images/SVG/car_topview.svg"),
  iconRetinaUrl: require("../../images/SVG/car_topview.svg"),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [25, 25],
  className: "leaflet-venue-icon",
});

export const BlinkIcon = L.icon({
  iconUrl: require("../../images/SVG/blink.svg"),
  iconRetinaUrl: require("../../images/SVG/blink.svg"),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [25, 25],
  className: "leaflet-venue-icon",
});
