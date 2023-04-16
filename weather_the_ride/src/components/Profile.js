import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button  from "@mui/material/Button";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Profile = (props) => {
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const { accessToken, setPref, pref } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
     
      const decode = jwt_decode(accessToken.accessToken);
      setUsername(decode.username);

      getUser(decode.username);
    } catch (e) {
      console.log("nope");
      
    }
  }, []);

  const getUser = async (username) => {
    try {
      let response = await axios.post("/profile", {
        username,
      });
      setUser(response.data);
      setPref(response.data.pref)
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };
const remove = async() =>{
  console.log(username);
  alert(` the account of ${username} will be removed`)
  try {
    let response = await axios.delete(`/del/${username}`,{
      username
    })
    alert(response.data.msg)
  } catch (e) {
    alert(e.response.data.msg)
  }
}
  return (
    <>
      <Box sx={{ m: 10}}>
        <Container style={{border:'10px double red', borderRadius:'50px', backgroundColor: 'rgba(200, 200, 200, 0.9)', paddingBottom: '10px'}} maxWidth="sm">
          <Stack
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <h1>{username.toUpperCase()}'S PROFILE</h1>
            <div style={{fontSize: '1.2rem'}}>
            <p>
              Name: {user.fname} {user.lname}
            </p>
            <p>Email: {user.email}</p>
            <p>Riding preferance: {user.pref}</p>
            <p>Bike of choice: {user.bike}</p>
            </div>
            <Button sx={{ m: 2}} style={{backgroundColor: "white"}} variant="outlined" onClick={() => remove()} >Delete Account</Button>
           
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
