import { useState, useEffect, useRef,useContext } from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { AppContext } from "../App";
import NavSearch from "./NavSearch";
import Button from "@mui/material/Button";
import RoutingMachine from "./RoutingMachine";


const Map = (props) => {
  const { youLat,
    setYouLat,
    youLng,
    setYouLng, setLat,  setLng} = useContext(AppContext)
  
  const [map, setMap] = useState(null);
  const routingMachineRef = useRef();
  const pluginRef = useRef();

  const mapp = useMap()
  
  
  
  useEffect(() => {
    if (!map) return;
    const controlContainer = routingMachineRef.current.onAdd(map);
    pluginRef.current.appendChild(controlContainer);
  }, [map]);
  
  return (
    <div>
      <NavSearch />
      <MapContainer
        style={{ width: "99vw", height: "85vh"}}
        center={[31.734652, 35.071847]}
        zoom={10}
        scrollWheelZoom={true}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker  position={[31.734652, 35.071847]}>
          <Popup>bar-bahar.</Popup>
        </Marker>
        <Marker position={[youLat, youLng]}>
          <Popup>you are here.</Popup>
        </Marker>
        <RoutingMachine ref={routingMachineRef} />
      </MapContainer>
      <div style={{ border: "1px solid red" }} ref={pluginRef} />
    </div>
  );
};

export default Map;
