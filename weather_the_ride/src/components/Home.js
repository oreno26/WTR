import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
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
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
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

      <Box component="form" sx={{ m: 10 }} style={{}} noValidate autoComplete="off">
      <Container style={{border:'10px double red', borderRadius:'50px', backgroundColor: 'rgba(200, 200, 200, 0.9)'}} maxWidth="sm">
      <h1 >WELCOME RIDER</h1>
      <p style={{ fontSize: '1.2rem'}}> Welcome to <b>Weather the Ride</b>, your one stop shop to plan your next ride. <br/> So sign up, gear up and <b>ride safe!</b></p>
        <TextField
          sx={{ m: 1 }}
          // style={{backgroundColor: "white"}}
          id="username"
          label="RIDER"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          label="PASSWORD"
          // style={{backgroundColor: "white"}}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      <Button sx={{ m: 1}} style={{backgroundColor: "white"}} variant="outlined" onClick={()=> login()}>LogIn</Button>
      <Button sx={{ m: 1}} style={{backgroundColor: "white"}} variant="outlined" component={Link} to='/register'>Sign Up</Button>
      </Container>
      </Box>
    </>
  );
};

export default Home;
