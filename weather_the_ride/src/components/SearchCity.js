import { AppContext } from "../App";
import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField";
import Button  from "@mui/material/Button";

const SearchCity = (props) =>{
    const [city, setCity] = useState('')
    const { scdLng, setScdLng,scdLat, setScdLat,APIkey } = useContext(AppContext);

    const getLatLng = async() =>{

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.replace(" ", "+")}&limit=5&appid=${APIkey}`)
        .then((res)=>res.json()).then((data)=>{setScdLat(data[0].lat); setScdLng(data[0].lon)})
    }


    return(
        <>
        <Box component="form"  style={{backgroundColor: 'darkgray'}} noValidate autoComplete="on">
         <TextField sx={{ m: 1}}
         id="city"
         label="CITY"
         onChange={(e)=> setCity(e.target.value)}/>
<Button sx={{ m: 1}} variant="outlined" onClick={()=> getLatLng()}>Search</Button>
        </Box>
        </>
    )
}

export default SearchCity