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
  const { last_name, first_name, username, password, confirmedPassword, dob } =
    req.body;

  if (!last_name || !first_name || !username || !password || !dob) {
    return res.status(400).json({ message: "Required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      last_name: last_name,
      first_name: first_name,
      username: username,
      password: hashedPassword,
      dob: dob,
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
    const user = await User.findOne({ username: username });

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
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
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

// Update user
router.patch("/:id", upload.none(), getUser, async (req, res) => {
  const user = res.user;
  const { last_name, first_name, username, oldPassword, newPassword, dob } =
    req.body;

  try {
    if (last_name) {
      user.last_name = last_name;
    }

    if (first_name) {
      user.first_name = first_name;
    }

    if (username) {
      user.username = username;
    }

    if (dob) {
      user.dob = dob;
    }

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({ message: "Update user successfully", updatedUser });
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

async function getUser(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.user = user;
    next();
  } catch (error) {}
}

module.exports = router;
