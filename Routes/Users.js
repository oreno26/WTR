import express  from "express";
import jwt from "jsonwebtoken"
import { register, login,remove, profile } from "../Controllers/Users.js";
import { VerifyToken } from "../Middlewears/VerifyToken.js";
const router = express.Router()

router.delete("/del/:username", remove)
router.post("/login", login)
router.post("/register",register)
router.post("/profile", profile)
router.get("/token", VerifyToken, (req, res) => {

    const username = req.username;
    const userid = req.userid;
  
    const accessToken = jwt.sign(
      { userid, username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );
  
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
    });
  
    res.status(200).json({ msg: "verified" , accessToken});
  });


export default router