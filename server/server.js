import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { authRoutes } from "./routes/authRoutes.js";
import { transactionRoute } from "./routes/transactionRoutes.js";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 8000;
const app = express();

connectDB();
//using different middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://mern-expense-tracker-2-frontend.onrender.com",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", authRoutes);
//running the server
app.get("/", (req, res) => {
  res.send(`Hello from server`);
});
app.use("/transactions", transactionRoute);
//listening to the port
app.listen(port, () => {
  console.log(`App succesfully running on Port ${port}`);
});
