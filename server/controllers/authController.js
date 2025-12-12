import { userModel } from "../models/model.js";
import { genOTP } from "../utils/generateOTP.js";
import { sendOTP } from "../utils/otpSender.js";
//register controller
export const register = async (req, res) => {
  const { userName, email, pwd, confirm } = req.body;
  if (!userName || !email || !pwd)
    return res.json({ message: "All fields are required", success: false });
  if (pwd != confirm)
    return res.json({ message: "Password mismatched", success: false });
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.json({ message: "User exists", success: false });
    const user = new userModel({ name: userName, email, pwd });

    await user.save();

    const token = await user.genTokens();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Registered", success: true });
  } catch (error) {
    res.json({ message: error.message, error: error });
  }
};
//login controller---------------------------------------
export const login = async (req, res) => {
  const { email, pwd, rememberMe } = req.body;
  if (!email || !pwd)
    return res.json({ message: "All fields are required", success: false });

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .json({ message: "User doesn't exist", success: false });
    if (!(await existingUser.comparePwd(pwd)))
      return res
        .status(401)
        .json({ message: "Incorrect password", success: false });

    const token = await existingUser.genTokens();
    const maxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge,
    });
    return res.status(200).json({ message: "LoggedIn", success: true });
  } catch (error) {
    res.json({ message: error.message, error: error });
  }
};
//---------------------------forget controller---------------------------------
export const forgetController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email)
      return res.json({ success: false, message: "Please enter the email" });
    const userExist = await userModel.findOne({ email });
    if (!userExist)
      return res.status(401).json({
        success: false,
        message: "User doesnot exist with this email",
      });
    const otp = genOTP();
    userExist.otp = otp;
    userExist.otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);
    await userExist.save();
    sendOTP(email, otp);
    return res.json({ success: true, message: "Otp sent sucessfully" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while sending the verification code",
    });
  }
};
//---------------------------------Verify otp controller-----------------------------------------
export const verifyOTPController = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (Date.now() > new Date(user.otpExpiresAt).getTime()) {
      res.status(401).json({ success: false, message: "Otp Expires" });
    }
    if (otp !== user.otp)
      return res.json({ success: false, message: "Invalid otp" });
    return res.json({ success: true, message: "Otp verified" });
  } catch (error) {
    return res.json({ error: error, success: false });
  }
};
