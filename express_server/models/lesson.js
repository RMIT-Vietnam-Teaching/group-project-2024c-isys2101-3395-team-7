const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    example: { type: String, required: true },
  },
  {
    versionKey: false, // Prevents the `__v` field from being added
  }
);

module.exports = mongoose.model("lessons", lessonSchema);
