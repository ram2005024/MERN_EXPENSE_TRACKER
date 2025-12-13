import express from "express";
import {
  forgetController,
  login,
  register,
  verifyOTPController,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
export const authRoutes = express.Router();
authRoutes.post("/register", register);
authRoutes.get("/", authMiddleware, (req, res) => {
  res.json({
    userName: req.user.userName,
    userID: req.user.userID,
  });
});
authRoutes.post("/login", login);
authRoutes.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ success: true, message: "Logout successfull" });
});
authRoutes.post("/forget", forgetController);
authRoutes.post("/verifyOTP", verifyOTPController);
