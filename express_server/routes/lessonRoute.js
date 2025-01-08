const express = require("express");
const router = express.Router();
const Lesson = require("../models/lesson");
const { default: mongoose } = require("mongoose");

// Get all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    if (lessons.length === 0) {
      res.status(404).json({ message: "No lessons found" });
    } else {
      res.json(lessons);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get lesson by id
router.get("/:id", getLessonById, async (req, res) => {
  res.send(res.lesson);
});

// Create lesson
router.post("/", async (req, res) => {
  const { title, content, example } = req.body;

  try {
    const lesson = new Lesson({
      title: title,
      content: content,
      example: example,
    });

    const newLesson = await lesson.save();
    return res
      .status(201)
      .json({ message: "Create lesson succesfully", newLesson });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update one
router.patch("/:id", getLessonById, async (req, res) => {
  const { title, content, example } = req.body;

  if (title != null) {
    res.lesson.title = title;
  }

  if (content != null) {
    res.lesson.content = content;
  }

  if (example != null) {
    res.lesson.example = example;
  }

  try {
    const updatedLesson = await res.lesson.save();
    res.json({ message: "Update lesson succesfully", updatedLesson });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete one
router.delete("/:id", getLessonById, async (req, res) => {
  try {
    await res.lesson.deleteOne();
    res.json({ message: "Delete lesson successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getLessonById(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.lesson = lesson;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
