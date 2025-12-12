import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    pwd: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      default: "",
    },
    otpExpiresAt: {
      type: Date,
      default: "",
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function () {
  if (!this.isModified("pwd")) return;
  const salt = await bcrypt.genSalt(10);
  this.pwd = await bcrypt.hash(this.pwd, salt);
});
UserSchema.methods.comparePwd = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.pwd);
  return isMatch;
};
UserSchema.methods.genTokens = function () {
  const id = this._id;
  return jwt.sign(
    { userID: id, userName: this.name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};
export const userModel = mongoose.model("user_details", UserSchema);
