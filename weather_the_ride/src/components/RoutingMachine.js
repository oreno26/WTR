import L from "leaflet";
import { useState, useContext } from "react";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { AppContext } from "../App";

const CreateRoutingMacineLayer = (props) => {
  const { lat, lng, navLat, navLng } = useContext(AppContext);
  console.log(lat, lng, navLat, navLng);

  const instance = L.Routing.control({
    waypoints: [L.latLng(lat, lng), L.latLng(navLat, navLng)],
    router: L.Routing.mapbox(
      "pk.eyJ1Ijoib3Jlbm92YWRpYSIsImEiOiJjbGZ0ZXlkdDUwMGFhM2ZtbXZvbzdibGFiIn0.eyOfUzi1vlEji9x6W-AFyA"
    ),
    lineOptions: {
      styles: [{ color: "blue", weight: 5 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });
  return instance;
};
const RoutingMachine = createControlComponent(CreateRoutingMacineLayer);

export default RoutingMachine;
