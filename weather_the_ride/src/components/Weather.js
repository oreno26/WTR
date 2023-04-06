import { AppContext } from "../App";
import { useState, useEffect, useContext } from "react";
import SearchCity from "./SearchCity";
import GearCheck from "./GearCheck";

const Weather = (props) => {
  const [weather, setWeather] = useState([]);
  const [destWeather, setDestWeather] = useState([]);
  const [city, setCity] = useState("");
  const [destCity, setDestCity] = useState("");
  const [gear, setGear] = useState("");
  const {
    lat,
    setLat,
    lng,
    setLng,
    scdLng,
    setScdLng,
    scdLat,
    setScdLat,
    APIkey,
    pref,
    navLat,
    navLng,
  } = useContext(AppContext);
  const dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${scdLat.toFixed(
        2
      )}&lon=${scdLng.toFixed(2)}&appid=${APIkey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city.name);
        setWeather(data.list);
      });

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${navLat.toFixed(
        2
      )}&lon=${navLng.toFixed(2)}&appid=${APIkey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setDestCity(data.city.name);
        setDestWeather(data.list);
      });
  }, [scdLat, navLat]);

  return (
    <>
      <SearchCity />

      <div
        style={{
          border: "0.5rem double crimson",
          paddingTop: "10px",
          width: "90vw",
          // height: "45vh",
          display: "inline-block",
          margin: "10px",
          borderRadius: "20px",
        }}
        >
        <h1>Weather in {city}</h1>
        {weather.map((elem, i) => {
          let day = new Date(elem.dt_txt);
          let temp = elem.main.temp;
          if (day.getHours() == 21 || day.getHours() == 9) {
            return (
              <div
                key={i}
                style={{
                  padding: "15px",
                  display: "inline-block",
                  border: "10px double red",
                  margin: "5px",
                  width: "110px",
                  borderRadius: "50px",
                  backgroundColor: "darkgrey",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold" }}>
                    {dayArr[day.getDay()]}{" "}
                    {day.getHours() == 21 ? "Night" : "Day"}{" "}
                  </p>
                  <GearCheck temp={temp} />
                  <p>{temp} C</p>
                  <p>{elem.weather[0].description}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}
                  />
                </div>
              </div>
            );
          }
        })}
        <h2>Weather in {destCity}</h2>
        {destWeather.map((elem, i) => {
          let day = new Date(elem.dt_txt);
          let temp = elem.main.temp;
          if (day.getHours() == 21 || day.getHours() == 9) {
            return (
              <div
                key={i}
                style={{
                  padding: "15px",
                  display: "inline-block",
                  border: "10px double red",
                  margin: "5px",
                  width: "110px",
                  borderRadius: "50px",
                  backgroundColor: "darkgrey",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold" }}>
                    {dayArr[day.getDay()]}{" "}
                    {day.getHours() == 21 ? "Night" : "Day"}{" "}
                  </p>
                  <GearCheck temp={temp} />
                  <p>{temp} C</p>
                  <p>{elem.weather[0].description}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Weather;
