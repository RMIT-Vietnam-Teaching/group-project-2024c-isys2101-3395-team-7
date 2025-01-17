const express = require("express");
const multer = require("multer");
const Audio = require("../models/audio");
const Record = require("../models/record");
const { default: mongoose } = require("mongoose");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get audio
router.get("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const audio = await Audio.findById(id);
    if (!audio) {
      return res.status(404).json({ message: "Audio not found" });
    }

    res.set("Content-Type", audio.data.contentType);
    res.send(audio.data.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Upload audio
router.post(
  "/upload",
  verifyToken,
  upload.single("audio"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(404).json({ message: "No audio found to upload" });
    }

    const newAudio = new Audio({
      name: req.file.originalname + "-" + Date.now(),
      data: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    try {
      await newAudio.save();
      res
        .status(200)
        .json({ message: "Upload audio successfully", audioId: newAudio.id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
