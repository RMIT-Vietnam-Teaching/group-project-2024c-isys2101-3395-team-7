const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    ref_answer: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    versionKey: false, // Prevents the `__v` field from being added
  }
);

module.exports = mongoose.model("exercises", exerciseSchema);
