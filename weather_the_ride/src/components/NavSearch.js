import { AppContext } from "../App";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const NavSearch = (props) => {
  const [orig, setOrig] = useState("");
  const [dest, setDest] = useState("");
  const {
    lat,
    lng,
    youLat,
    youLng,
    setLat,
    setLng,
    navLat,
    navLng, setScdLng,
    
    setScdLat,
    setNavLat,
    setNavLng,
    APIkey,
    setNavLatLng,
  } = useContext(AppContext);

  const origin = async () => {
    let lat;
    let lng;

    if (orig == "") {
      lat = youLat;
      lng = youLng;
      setLat(youLat)
      setLng(youLng)
    } else {
      let res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${orig.replace(
          " ",
          "+"
        )}&limit=5&appid=${APIkey}`
      );
      const data = await res.json();
      console.log("data=====>", data);
      lat = data[0].lat;
      lng = data[0].lon;
      setLat(lat)
      setLng(lng)
      setScdLng(lng)
      setScdLat(lat)
    }
    const resNav = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${dest.replace(
        " ",
        "+"
      )}&limit=5&appid=${APIkey}`
    );
    const dataNav = await resNav.json();
    console.log("dataNav=====>", dataNav);
    const latNav = dataNav[0].lat;
    const lngNav = dataNav[0].lon;
    setNavLat(latNav)
    setNavLng(lngNav)

    setNavLatLng({ lat, lng, latNav, lngNav });

  };
  // const destination = async () => {
  //   fetch(
  //     `http://api.openweathermap.org/geo/1.0/direct?q=${dest.replace(
  //       " ",
  //       "+"
  //     )}&limit=5&appid=${APIkey}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setNavLat(data[0].lat);
  //       setNavLng(data[0].lon);
  //       console.log(data);
  //     });
  // };

  return (
    <>
      <Box component="form" noValidate>
        <TextField
          sx={{ m: 1 }}
          id="One"
          label="Origin"
          onChange={(e) => setOrig(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="Two"
          label="Destination"
          onChange={(e) => {
            setDest(e.target.value);
          }}
        />
        <Button sx={{ m: 1 }} variant="outlined" onClick={() => origin()}>
          Search
        </Button>
      </Box>
    </>
  );
};

export default NavSearch;
