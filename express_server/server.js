require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recordRouter = require("./routes/recordRoute");
const imageRouter = require("./routes/imageRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to database"));

app.use("/record", recordRouter);

app.use("/image", imageRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
