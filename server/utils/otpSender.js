import nodemailer from "nodemailer";
import { otpHTML } from "../htmlStructure/otpFormatGmail.js";
export const sendOTP = (email, otp) => {
  //creating transport
  const transport = nodemailer.createTransport({
   service:"gmail",
    auth: {
      user: "sharmashekhar20050@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });
  //creating mail options
  const mailOptions = {
    from: "sharmashekhar20050@gmail.com",
    to: email,
    subject: "Forget your password 🔑",
    html: `${otpHTML(otp)}`,
  };
  //sending mail using smtp protocol
  transport.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    console.log(info.response);
  });
};
