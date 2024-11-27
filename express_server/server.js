require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to database"));

const recordRouter = require("./routes/recordRoute");
app.use("/record", recordRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
