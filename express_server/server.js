require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recordRouter = require("./routes/recordRoute");
const imageRouter = require("./routes/imageRoute");
const audioRouter = require("./routes/audioRoute");
const userRouter = require("./routes/userRoute");
const lessonRouter = require("./routes/lessonRoute");
const quizRouter = require("./routes/quizRoute");

const app = express();
const frontendUrl = process.env.FRONTEND_URL;
const allowedOrigins = [
  frontendUrl,
  "http://localhost:3000", // For local development
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins list or allow requests with no origin (like from Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
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

app.use("/audio", audioRouter);

app.use("/user", userRouter);

app.use("/lesson", lessonRouter);

app.use("/quiz", quizRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
