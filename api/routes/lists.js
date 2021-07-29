import express from "express";
const router = express.Router();
import List from "../models/List.js";
import verify from "../verifyToken.js";

// CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = await new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("list has been deleted...");
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
// GET
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list;
  try {
    if (typeQuery) {
        if (genreQuery) {
            list = await List.aggregate([
                {$sample: {size: 10}},
                {$match: {type: typeQuery, genre: genreQuery}}
            ])
        } else {
            list = await List.aggregate([
                {$sample: {size: 10}},
                {$match: {type: typeQuery}}
            ])
        }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
