import { Resend } from "resend";
import { otpHTML } from "../htmlStructure/otpFormatGmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (email, otp) => {
  try {
    await resend.emails.send({
      from: "Experience Tracker <sharmashekhar20050@gmail.com>",
      to: email,
      subject: "Reset your password 🔐",
      html: otpHTML(otp),
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Resend email failed:", error);
  }
};
