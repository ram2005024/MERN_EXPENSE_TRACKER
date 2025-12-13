import { otpHTML } from "../htmlStructure/otpFormatGmail.js";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (email, otp) => {
  try {
    resend.emails.send({
      from: "sharmashekhar20050@gmail.com",
      to: email,
      subject: "Reset your password 🔐",
      html: otpHTML(otp),
    });
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Resend error:", error);
  }
};
