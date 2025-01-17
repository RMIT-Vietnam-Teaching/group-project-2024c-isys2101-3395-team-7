const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    image_id: { type: [mongoose.Types.ObjectId], ref: "images" },
    audio_id: { type: [mongoose.Types.ObjectId], ref: "audios" },
    audio_ans_id: { type: [mongoose.Types.ObjectId], ref: "audios" },
    favorite: { type: Boolean, required: true },
    time: { type: Date, default: Date.now },
    answer: { type: String },
    comment: [
      {
        mistake: { type: String }, // Who made the comment
        correction: { type: String }, // The comment text
        description: { type: String }, // When the comment was made
      },
    ],
  },
  {
    versionKey: false, // Prevents the `__v` field from being added
  }
);

module.exports = mongoose.model("records", recordSchema);
