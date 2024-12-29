const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    examples: [
      {
        _id: false, // Prevent _id generation for each example object
        word: { type: String },
        pronunciation: { type: String },
        example: { type: String },
      },
    ],
    notes: { type: [String] },
  },
  {
    versionKey: false, // Prevents the `__v` field from being added
  }
);

module.exports = mongoose.model("lessons", lessonSchema);
