import express from "express";
const router = express.Router();
import User from "../models/User.js";
import crypto from "crypto-js";
import jwt from 'jsonwebtoken'

// REGISTER
router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const { username, email, password } = req.body;
  if (!user) {
    const newUser = new User({
      username,
      email,
      password: crypto.AES.encrypt(password, process.env.SECRET_KEY).toString(),
    });
    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  res.json(user);
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong email!");

    const bytes = crypto.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(crypto.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password!");

    const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: "5d"})

    const { password, ...info } = user._doc;

    res.status(200).json({...info, accessToken});
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
