import express from "express";
const router = express.Router();
import Movie from "../models/Movie.js";
import verify from "../verifyToken.js";

// CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = await new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
// UPDATAE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMovie);
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
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted..");
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
// GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (e) {
    res.status(500).json(e);
  }
});
// GET RANDOM MOVIE
router.get("/random", async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: true },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    } else {
        movie = await Movie.aggregate([
            {
              $match: { isSeries: false },
            },
            {
              $sample: { size: 1 },
            },
          ]);
    }
    res.status(200).json(movie);
  } catch (e) {
    res.status(500).json(e);
  }
});
// GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const movies = query
        ? await Movie.find().sort({ _id: -1 }).limit(10)
        : await Movie.find().sort({_id: -1});
      res.status(200).json(movies);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You are not allowed to see all movies!");
  }
});

export default router;
