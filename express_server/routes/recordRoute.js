const express = require("express");
const { model, default: mongoose } = require("mongoose");
const router = express.Router();
const Record = require("../models/record");
const db = mongoose.connection;
const multer = require("multer");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../middleware/auth");
console.log("verifyToken:", verifyToken);

// Set up multer for file uploads (ensure formdata post is not empty)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // File naming convention
  },
});

const upload = multer({ storage: storage });

// Get all records
router.get("/", verifyToken, async (req, res) => {
  try {
    const records = await Record.find();
    if (records.length === 0) {
      res.status(404).send("No records found");
    } else {
      res.json(records);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get one
router.get("/:id", verifyToken, getRecord, (req, res) => {
  res.send(res.record);
});

router.get("/user/:username", verifyToken, getRecordByUsername, (req, res) => {
  res.send(res.record);
});

// Create one
router.post("/", verifyToken, upload.none(), async (req, res) => {
  const record = new Record({
    username: req.body.username,
    type: req.body.type,
    image_id: req.body.imageId,
    audio_id: req.body.audioId,
    favorite: req.body.favorite,
    time: req.body.time || Date.now(),
    answer: req.body.answer,
  });

  try {
    const newRecord = await record.save();
    res.status(201).json({ message: "Create record successfully", newRecord });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update one
router.patch(
  "/:id",
  verifyToken,
  upload.none(),
  getRecord,
  async (req, res) => {
    const { username, type, favorite, answer } = req.body;

    if (username != null) {
      res.record.username = username;
    }

    if (type != null) {
      res.record.type = type;
    }

    if (favorite != null) {
      res.record.favorite = favorite == "true" ? true : false;
    }

    if (answer != null) {
      res.record.answer = answer;
    }

    try {
      const updatedRecord = await res.record.save();
      res.json({ message: "Update record succesfully", updatedRecord });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete one
router.delete("/:id", verifyToken, getRecord, async (req, res) => {
  try {
    await res.record.deleteOne();
    res.json({ message: "Delete record successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRecord(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.record = record;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getRecordByUsername(req, res, next) {
  const { username } = req.params;

  try {
    const record = await Record.find({
      username: username,
    });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.record = record;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
