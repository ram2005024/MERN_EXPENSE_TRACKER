import { userModel } from "../models/model.js";
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
