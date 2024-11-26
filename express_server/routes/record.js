const express = require("express");
const { model, default: mongoose } = require("mongoose");
const router = express.Router();
const Record = require("../controllers/record");
const db = mongoose.connection;
const multer = require("multer");
const bcrypt = require("bcrypt");

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
router.get("/", async (req, res) => {
  try {
    const users = await Record.find();
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// // Get one
router.get("/:id", getRecord, (req, res) => {
  res.send(res.record);
});

// Create one
router.post("/", upload.none(), async (req, res) => {
  const record = new Record({
    username: req.body.username,
    type: req.body.type,
    image_path: req.body.image_path,
    favorite: req.body.favorite,
    time: req.body.time || Date.now(),
    answer: req.body.answer,
  });

  try {
    const newRecord = await record.save();
    res.status(201).json({ message: "User saved successfully", newRecord });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update one
// router.patch("/:id", upload.none(), getUser, async (req, res) => {
// if (req.body.username != null) {
//     res.user.username = req.body.username;
//   }
//   try {
//     const updatedUser = await res.user.save();
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete one
router.delete("/:id", getRecord, async (req, res) => {
  try {
    await res.record.deleteOne();
    res.json({ message: "Deleted record" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRecord(req, res, next) {
  let record;
  try {
    record = await Record.findById(req.params.id);
    if (record == null) {
      return res.status(404).json({ message: "Cannot find record" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.record = record;
  next();
}

// Login user
// router.post("/login", upload.none(), async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const user = await Users.findOne({ name });

//     if (user && password == user.password) {
//       res.json({
//         _id: user._id,
//         message: "Login successful",
//       });
//     } else {
//       res.status(401).json({ message: "Incorrect username or password" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
