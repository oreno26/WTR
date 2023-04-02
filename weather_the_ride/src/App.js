import logo from "./logo.svg";
import "./App.css";
//components
import Nav from "./components/Nav";
import Weather from "./components/Weather";
import Profile from "./components/Profile";
import Map from "./components/Map";
import Home from "./components/Home";
import Register from "./components/Register";
import { Auth } from "./components/auth/Auth";
//npm
import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";

//Context
export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [scdLng, setScdLng] = useState(0);
  const [scdLat, setScdLat] = useState(0);
  const [navLat, setNavLat] = useState(31.734652);
  const [navLng, setNavLng] = useState(35.071847);
  const [youLat, setYouLat] = useState(0);
  const [youLng, setYouLng] = useState(0);
  const [pref, setPref] = useState("");
  const APIkey = "6df3745aef944431cf12362e153d4aad";
  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        youLat,
        setYouLat,
        youLng,
        setYouLng,
        lat,
        setLat,
        lng,
        setLng,
        scdLng,
        setScdLng,
        scdLat,
        setScdLat,
        navLat,
        setNavLat,
        navLng,
        setNavLng,
        pref,
        setPref,
        APIkey,
      }}
    >
      <div className="App">
        <header>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/map"
              element={
                <Auth>
                  <Map />
                </Auth>
              }
            />
            <Route
              path="/weather"
              element={
                <Auth>
                  <Weather />
                </Auth>
              }
            />
            <Route
              path="/profile"
              element={
                <Auth>
                  <Profile />
                </Auth>
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </header>
      </div>
    </AppContext.Provider>
  );
}

export default App;
