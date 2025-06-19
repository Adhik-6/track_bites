import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { login, logout, signup, forgetPassword, resetPassword, bookOrder, sendSms, verifyToken } from "./controllers.js";


const app = express();
dotenv.config();

const frontendUrl = process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_DEV;

app.use(express.json());
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    methods: "GET, POST, PATCH",
  })
);

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

app.post("/api/auth/login", login);
app.post("/api/auth/logout", verifyToken, logout);
app.post("/api/auth/signup", signup);
app.post("/api/auth/forgot-password", forgetPassword);
app.post("/api/auth/reset-password", resetPassword);
app.post("/api/payment/book", verifyToken, bookOrder);
app.post("/api/payment/send-sms", verifyToken, sendSms);

const startBackend = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(8000, () => {
      console.log(
        `Server running on http://localhost:8000`
      );
    });
  } catch (err) {
    console.log("Error while connecting to Backend", err.message);
  }
};

startBackend();
