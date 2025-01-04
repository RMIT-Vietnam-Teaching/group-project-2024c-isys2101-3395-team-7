const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  last_name: { type: String, required: true },
  first_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  currentExercises: [
    {
      question: { type: String, required: true },
      ref_answer: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
