import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import axios from "axios";

const Register = (props) => {
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
        username, email, fname, lname, pref, password
      });
      alert(response.data.msg)
      navigate('/')
    } catch (e) {
      console.log(e.response.data)
      alert(e.response.data.msg)
    }
  }
  
  return (
    <>
      <h1>Join The Ride</h1>

      <Box component="form" sx={{ m: 1 }} style={{textAlign:'center'}} >
        <TextField onChange={(e) => setEmail(e.target.value)} sx={{ m: 1 }} label="email" type="email" />
        <br/>
        <TextField onChange={(e) => setFname(e.target.value)} sx={{ m: 1 }} label="first name" />
        <br/>
        <TextField onChange={(e) => setLname(e.target.value)} sx={{ m: 1 }} label="last name" />
        <br/>
        <TextField onChange={(e) => setUsername(e.target.value)} sx={{ m: 1 }} label="username" />
        <br/>
        <TextField onChange={(e) => setPassword(e.target.value)} sx={{ m: 1 }} label="password" />
        <br/>
        <h3>I Prefer To Be</h3>
        <RadioGroup  onChange={(e) => setPref(e.target.value)} sx={{ m: 1}} defaultValue="mild" row name="Preferance">
          <Radio  value="hot" />
          hot
          <Radio value="mild" />
          mild
          <Radio value="cold" />
          cold
        </RadioGroup>
      </Box>
      <Button onClick={() => register()} variant="outlined">Register</Button>
    </>
  );
};

export default Register;
