import { AppContext } from "../App";
import { useState, useEffect, useContext } from "react";
import SearchCity from "./SearchCity";
import GearCheck from "./GearCheck";
// add weather pref
const Weather = (props) => {
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
  } = useContext(AppContext);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("");
  const [gear, setGear] = useState("");
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
  }, [scdLat]);
  


  return (
    <>
      <h1>Weather in {city}</h1>
      <SearchCity />

      <div
        style={{
          // border: "0.5rem double crimson",
          paddingTop: "10px",
          width: "90vw",
          height: "60vh",
          display: "inline-block",
          margin: "10px",
          borderRadius: "20px",
        }}
      >
        {weather.map((elem) => {
          let day = new Date(elem.dt_txt);
          let temp = elem.main.temp;
          if (day.getHours() == 21 || day.getHours() == 9) {
            return (
              <div
                style={{
                  padding: "15px",
                  display: "inline-block",
                  border: "10px double red",
                  margin: "10px",
                  width: "120px",
                  borderRadius: "50px",
                  backgroundColor: "darkgrey",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold" }}>
                    {dayArr[day.getDay()]}{" "}
                    {day.getHours() == 21 ? "Night" : "Day"}{" "}
                  </p>
                  <GearCheck temp={temp}/>
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
