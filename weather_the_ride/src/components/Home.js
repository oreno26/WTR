import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { AppContext } from "../App";

const Home = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAccessToken, accessToken,lat, setLat,lng, setLng,scdLng, setScdLng,scdLat, setScdLat, setYouLat,setYouLng } = useContext(AppContext);
 
  useEffect(() => {
    const error = (err) => {
      console.log(err);
    };
    const success = (position) => {
      setYouLat(position.coords.latitude);
      setYouLng(position.coords.longitude);
      setScdLat(position.coords.latitude);
      setScdLng(position.coords.longitude);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

const login = async() =>{
    console.log(username , password);
    try {
        let response = await axios.post('/login',{
            username,password
        });
        setAccessToken(response.data.accessToken);
        console.log(response.data.accessToken);
        alert(response.data.msg)
        navigate('/profile')
    } catch (e) {
        alert(e.response.data.msg);
    }
}


  return (
    <>
      <h1>WELECOME RIDER</h1>

      <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
        <TextField
          sx={{ m: 1 }}
          id="username"
          label="RIDER"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          label="PASSWORD"
        //   type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button sx={{ m: 1}} variant="outlined" onClick={()=> login()}>LogIn</Button>
      <Button sx={{ m: 1}} variant="outlined" component={Link} to='/register'>Sign Up</Button>
    </>
  );
};

export default Home;
