import nodemailer from "nodemailer";
import { otpHTML } from "../htmlStructure/otpFormatGmail.js";
export const sendOTP = (email, otp) => {
  //creating transport
  const transport = nodemailer.createTransport({
   host:'smtp-relay.brevo.com',
    port:587,
    secure:false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 20000,
  });
  //creating mail options
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
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
