import jwt from "jsonwebtoken";
import Users from "../models/UsersModel.js";
import dotenv from "dotenv";

dotenv.config();

export const VerifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken)
    return res.status(401).json({ msg: "permission Not granted" });

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ msg: "token verifaction failed" });

       req.username = decoded.username
       req.userid = decoded.userid
       console.log(req);


      try {
        const user = await Users.findAll({
          where: {
            username: decoded.username,
          },
        });
        user.length === 0 ? res.status(403).json({ msg: "user not verifeid" })
          : next();
      } catch (e) {
        res.status(403).json({ msg: "user not found" });
      }
    }
  );
};
