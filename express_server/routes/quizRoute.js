const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const { default: mongoose } = require("mongoose");

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    if (quizzes.length === 0) {
      res.status(404).json({ message: "No quizzes found" });
    } else {
      res.json(quizzes);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get quiz by id
router.get("/:id", getQuizById, async (req, res) => {
  res.send(res.quiz);
});

// Create quiz
router.post("/", async (req, res) => {
  const { title, questions, lessonId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    return res.status(400).json({ message: "Invalid lesson ID format" });
  }

  try {
    const quiz = new Quiz({
      title: title,
      questions: questions,
      lesson_id: lessonId,
    });

    const newQuiz = await quiz.save();
    return res
      .status(201)
      .json({ message: "Create quiz succesfully", newQuiz });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update one
router.patch("/:id", getQuizById, async (req, res) => {
  const { title, questions, lessonId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    return res.status(400).json({ message: "Invalid lesson ID format" });
  }

  if (title != null) {
    res.quiz.title = title;
  }

  if (questions != null) {
    res.quiz.questions = questions;
  }

  if (lessonId != null) {
    res.quiz.lesson_id = lessonId;
  }

  try {
    const updatedQuiz = await res.quiz.save();
    res.json({ message: "Update quiz succesfully", updatedQuiz });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getQuizById(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.quiz = quiz;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
