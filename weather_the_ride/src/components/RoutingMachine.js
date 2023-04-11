import { useEffect, useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

import { AppContext } from "../App";
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function RoutingMachine(props) {
  const map = useMap();
  const { lat, lng, navLat, navLng, navLatLng } = useContext(AppContext);
  console.log("states=>", lat, lng, navLat, navLng,);

  useEffect(() => {
    console.log("RoutingMachine map =>>>>>>", map);
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [ 
        L.latLng(lat, lng),
        L.latLng(navLat, navLng),
      ],
      router: L.Routing.mapbox(
        "pk.eyJ1Ijoib3Jlbm92YWRpYSIsImEiOiJjbGZ0ZXlkdDUwMGFhM2ZtbXZvbzdibGFiIn0.eyOfUzi1vlEji9x6W-AFyA"
      ),
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      autoRoute: true,
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  },[lat, navLat]);

  return null;
}

//     autoRoute: true,
//     addWaypoints: false,
//     routeWhileDragging: false,
//     draggableWaypoints: true,
//     fitSelectedRoutes: true,
//     showAlternatives: false,
