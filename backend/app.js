require("dotenv").config;

import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";

const allowedOrigins = [
  "http://localhost:5173", // local dev
  process.env.FRONTEND_URL, // production frontend (Vercel)
];

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("COnnected to DB");
  app.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
  });
  app.get("/api/", (req, res) => {
    res.send("Backend is Running");
  });
});
