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
      console.log(accessToken);
      const decode = jwt_decode(accessToken.accessToken);
      setUsername(decode.username);
      console.log(decode.username);
      getUser(decode.username);
    } catch (e) {
      console.log("nope");
      // navigate("/");
    }
  }, []);

  const getUser = async (username) => {
    console.log(username);
    try {
      let response = await axios.post("/profile", {
        username,
      });
      setUser(response.data);
      setPref(response.data.pref)
      console.log(response.data);
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
      <Box sx={{ m: 2 }}>
        <Container sx={{ border: 3 }} maxWidth="sm">
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <h1>{username.toUpperCase()}'S PROFILE</h1>
            <p>
              NAME: {user.fname} {user.lname}
            </p>
            <p>EMAIL: {user.email}</p>
            <p>RIDDING PREFERANCE: {user.pref}</p>
            <Button sx={{ m: 1}} variant="outlined" onClick={() => remove()} >Delete Account</Button>
           
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
