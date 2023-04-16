import Users from "../Models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res) => {
  const { username, email, fname, lname,bike, pref, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      username: username,
      email: email,
      fname: fname,
      lname: lname,
      pref: pref,
      bike: bike,
      password: hashPassword,
    });
    res.json({ msg: `Welecome ${fname + " " + lname}! *FISTBUMP*` });
  } catch (e) {
    console.log(e);
    res.status(403).json({ msg: "register unsuccesful" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "username  or password not correct" });

    const userid = user[0].id;
    const username = user[0].username;
    const accessToken = jwt.sign(
      { userid, username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "300s",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 300 * 1000,
    });
    console.log(accessToken);
    res.json({ msg: `Welcome Back ${username}`, accessToken });
  } catch (e) {
    res.status(404).json({ msg: "username  or password not correct" });
  }
};

export const remove = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        username: req.params.username,
      },
    });
    console.log(user);
    await user[0].destroy();
    res.json({ msg: "user removed" });
  } catch (e) {
    res.status(404).json({ msg: "user not found" });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        username: req.body.username,
      },
    });
    console.log(user[0]);
    res.json(user[0]);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "unautorised" });
  }
};
