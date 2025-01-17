const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: { type: String },
    data: {
      data: { type: Buffer },
      contentType: { type: String },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("images", imageSchema);
