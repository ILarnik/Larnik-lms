import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();  // MUST be before anything else




export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // must be a number
  secure: false, // false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
