require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const JWT_SECRET = process.env.JWT_SECRET;

// Sign up
router.post("/signup", upload.none(), async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Required" });
  }

  try {
    // Check if the user already exists{}
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (typeof password !== "string") {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "Register user succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", upload.none(), async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    console.log("username: ", username);
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ user: user._id, message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update user
router.patch("/:id", upload.none(), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { name, email, password } = req.body;

    if (name != null) {
      user.name = name;
    }

    if (email != null) {
      user.email = email;
    }

    if (password != null) {
      user.password = password;
    }

    await user.save();
    res.json({ message: "Update user successfully", user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Delete user successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
