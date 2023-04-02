import { AppContext } from "../App";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box"
import TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button"

const NavSearch = (props) =>{
    const [orig, setOrig] = useState("")
    const [dest, setDest] = useState("")
    const {lat, lng ,youLat,youLng, setLat, setLng,navLat, navLng, setNavLat, setNavLng, APIkey} = useContext(AppContext)
    const origin = async() =>{ 
        if (orig == "") 
    { setLat(youLat)
      setLng(youLng)
    }else{
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${orig.replace(" ", "+")}&limit=5&appid=${APIkey}`)
        .then((res)=>res.json()).then((data)=>{setLat(data[0].lat); setLng(data[0].lon)})}
        destination()
    }
    const destination = async() =>{

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${dest.replace(" ", "+")}&limit=5&appid=${APIkey}`)
        .then((res)=>res.json()).then((data)=>{setNavLat(data[0].lat); setNavLng(data[0].lon)})
    }


return(
    <>
    <Box component="form"  noValidate>
        <TextField sx={{ m: 1}}
        id="One" 
        label="Origin"
        onChange={(e)=> setOrig(e.target.value)}/>
        <TextField sx={{m:1}}
        id="Two"
        label="Destination"
        onChange={(e) =>{setDest(e.target.value)}}
        />
        <Button sx={{ m: 1}} variant="outlined" onClick={()=> origin()}>Search</Button>
    </Box>
    </>
)


}

export default NavSearch