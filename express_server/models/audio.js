const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
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

module.exports = mongoose.model("audios", audioSchema);
