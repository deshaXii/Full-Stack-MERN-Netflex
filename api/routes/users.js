import express from "express";
const router = express.Router();
import User from "../models/User.js";
import crypto from "crypto-js";
import verify from "../verifyToken.js";

// UPDATAE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = crypto.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});
// DELETE
// GET
// GET ALL
// GET USER STATS

export default router;
