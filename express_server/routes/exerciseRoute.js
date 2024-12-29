const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");
const { default: mongoose } = require("mongoose");

// Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    if (exercises.length === 0) {
      res.status(404).json({ message: "No exercises found" });
    } else {
      res.json(exercises);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get exercise by id
router.get("/:id", getExerciseById, async (req, res) => {
  res.send(res.exercise);
});

// Create exercise
router.post("/", async (req, res) => {
  const { question, ref_answer, type } = req.body;

  try {
    const exercise = new Exercise({
      question: question,
      ref_answer: ref_answer,
      type: type,
    });

    const newExercise = await exercise.save();
    return res
      .status(201)
      .json({ message: "Create exercise succesfully", newExercise });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update one
router.patch("/:id", getExerciseById, async (req, res) => {
  const { question, ref_answer, type } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  if (question != null) {
    res.exercise.question = question;
  }

  if (ref_answer != null) {
    res.exercise.ref_answer = ref_answer;
  }

  if (type != null) {
    res.exercise.type = type;
  }

  try {
    const updatedExercise = await res.exercise.save();
    res.json({ message: "Update exercise succesfully", updatedExercise });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getExerciseById(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.exercise = exercise;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
