const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    image_id: { type: [mongoose.Types.ObjectId], ref: "images" },
    favorite: { type: Boolean, required: true },
    time: { type: Date, default: Date.now },
    answer: { type: String },
  },
  {
    versionKey: false, // Prevents the `__v` field from being added
  }
);

module.exports = mongoose.model("records", recordSchema);
