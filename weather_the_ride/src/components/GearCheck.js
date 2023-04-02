import { AppContext } from "../App";
import { useState, useEffect, useContext } from "react";

const GearCheck = (props) => {
  const { pref } = useContext(AppContext);
  const [gear, setGear] = useState("");

  useEffect(() => {
    if (pref == "cold") {
      if (props.temp < 15) {
        setGear("winter gear");
      } else if (props.temp > 15 && props.temp < 20) {
        setGear("mild gear");
      } else {
        setGear("summer gear");
      }
    } else if (pref == "mild") {
      if (props.temp < 18) {
        setGear("winter gear");
      } else if (props.temp > 18 && props.temp < 23) {
        setGear("mild gear");
      } else {
        setGear("summer gear");
      }
    } else if (pref == "hot") {
      if (props.temp < 21) {
        setGear("winter gear");
      } else if (props.temp > 21 && props.temp < 26) {
        setGear("mild gear");
      } else {
        setGear("summer gear");
      }
    }
  }, [props.temp]);

  return <>{gear}</>;
};

export default GearCheck;
