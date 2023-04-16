import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import axios from "axios";

const Register = (props) => {
  const [bike, setBike] = useState ('')
  const [username, setUsername] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pref, setPref] = useState('mild')
  const navigate = useNavigate()
  const register = async () =>{
    try {
      let response = await axios.post('/register',{
        username, email, fname, lname, pref, password,bike
      });
      alert(response.data.msg)
      navigate('/')
    } catch (e) {
      alert(e.response.data.msg)
    }
  }
  
  return (
    <>

      <Box component="form" sx={{ m: 2 }} style={{textAlign:'center'}} >
      <Container style={{border:'10px double red', borderRadius:'50px', backgroundColor: 'rgba(200, 200, 200, 0.9)', paddingBottom: '10px'}} maxWidth="sm">
      <h1>Join The Ride</h1>
        <TextField  style={{backgroundColor: "white"}} onChange={(e) => setEmail(e.target.value)} sx={{ m: 1 }} label="Email" type="email" />
        <br/>
        <TextField  style={{backgroundColor: "white"}} onChange={(e) => setFname(e.target.value)} sx={{ m: 1 }} label="First Name" />
        <br/>
        <TextField  style={{backgroundColor: "white"}} onChange={(e) => setLname(e.target.value)} sx={{ m: 1 }} label="Last Name" />
        <br/>
        <TextField  style={{backgroundColor: "white"}} onChange={(e) => setUsername(e.target.value)} sx={{ m: 1 }} label="Username" />
        <br/>
        <TextField  style={{backgroundColor: "white"}} onChange={(e) => setBike(e.target.value)} sx={{ m: 1 }} label="Motorcycle" /> 
        <br/>
        <TextField  style={{backgroundColor: "white"}} type="password" onChange={(e) => setPassword(e.target.value)} sx={{ m: 1 }} label="password" />
        <br/>
        <h3>I Prefer To Be</h3>
        <RadioGroup  style={{marginLeft: '30%'}} onChange={(e) => setPref(e.target.value)} sx={{ m: 1}} defaultValue="mild" row name="Preferance">
          <Radio  value="hot" />
          Hot
          <Radio value="mild" />
          Mild
          <Radio value="cold" />
          Cold
        </RadioGroup>
      <Button onClick={() => register()} style={{backgroundColor: "white"}} variant="outlined">Register</Button>
      </Container>
      </Box>
    </>
  );
};

export default Register;
