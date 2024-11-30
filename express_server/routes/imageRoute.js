const express = require("express");
const multer = require("multer");
const heicConvert = require("heic-convert");
const Image = require("../models/image");
const Record = require("../models/record");
const { default: mongoose } = require("mongoose");
const image = require("../models/image");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get image
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", image.data.contentType);
    res.send(image.data.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function convertHEIC(heicBuffer) {
  const outputBuffer = await heicConvert({
    buffer: heicBuffer,
    format: "JPEG",
  });
  return outputBuffer;
}

// Upload image
router.post("/upload", upload.single("hw-image"), async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({ message: "No image found to upload" });
  }
  let imageBuffer = req.file.buffer;
  let contentType = req.file.mimetype;

  // Check if the image is in HEIC format
  if (req.file.mimetype === "image/heic") {
    imageBuffer = await convertHEIC(imageBuffer);
    contentType = "image/jpeg";
  }

  const newImage = new Image({
    name: req.file.originalname + "-" + Date.now(),
    data: {
      data: imageBuffer,
      contentType: contentType,
    },
  });

  try {
    await newImage.save();
    res
      .status(200)
      .json({ message: "Upload image successfully", imageUrl: newImage.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
