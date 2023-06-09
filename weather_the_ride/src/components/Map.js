import { useState, useEffect, useRef, useContext } from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { AppContext } from "../App";
import NavSearch from "./NavSearch";
import Button from "@mui/material/Button";
import RoutingMachine from "./RoutingMachine";
import L from "leaflet";  

const Map = (props) => {
  const [map, setMap] = useState(null);
  const routingMachineRef = useRef();
  const pluginRef = useRef();

  const {
    youLat,
    setYouLat,
    youLng,
    setYouLng,
    setLat,
    setLng,
    setNavLat,
    setNavLng,
    navLat,
    navLatLng,
    setNavLatLng
  } = useContext(AppContext);
  let lat;
  let lng;
  let latNav;
  let lngNav;

  let redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
  
  });

  useEffect(() => {
    if (!map) return;
    const controlContainer = routingMachineRef.current.onAdd(map);
    pluginRef.current.appendChild(controlContainer);
  }, [map]);

  return (
    <div>
      <NavSearch />
      <MapContainer
        style={{ width: "100vw", height: "83vh" }}
        center={[youLat, youLng]}
        zoom={10}
        scrollWheelZoom={true}
        whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine navLatLng={navLatLng} />
      <Marker icon={redIcon} position={[youLat, youLng]}>
          <Popup>you are here.
          <Button
              onClick={() => {
                setLat(youLat);
                setLng(youLng);
              }}>
              Navigate from here
            </Button>
            </Popup>
        </Marker> 

        <Marker position={[31.271202, 34.728679]}>
          <Popup>
            Motorcity Raceway
            <Button
              onClick={() => {
                setNavLat(31.271202);
                setNavLng(34.728679);
              }}>
              Navigate here
            </Button>
          </Popup>
        </Marker> 

         <Marker position={[33.043192, 35.345253]}>
          <Popup>
            Elkosh
            <Button
              onClick={() => {
                setNavLat(33.043192);
                setNavLng(35.345253);
              }}>
              Navigate here
            </Button>
          </Popup>
        </Marker> 

         <Marker position={[32.053508, 35.453102]}>
          <Popup>
            Petza'el Raceway.
            <Button
              onClick={() => {
                setNavLat(32.053508);
                setNavLng(35.453102);
              }}>
              Navigate here
            </Button>
          </Popup>
        </Marker> 

        <Marker position={[31.734652, 35.071847]}>
          <Popup>
            Bar-bahar.
            <Button
              onClick={() => {
                setNavLat(31.734652);
                setNavLng(35.071847);
              }}>
              Navigate here
            </Button>
          </Popup>
        </Marker> 

        <Marker position={[32.01153, 34.817086]}>
          <Popup>
            Route 44.
            <Button
              onClick={() => {
                setNavLat(32.01153);
                setNavLng(34.817086);
              }}>
              Navigate here
            </Button>
          </Popup>
        </Marker>
      </MapContainer>
      <div style={{ border: "1px solid red" }} ref={pluginRef} />
    </div>
  );
};

export default Map;
