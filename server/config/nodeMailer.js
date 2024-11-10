import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let config = {
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
};
let transporter = nodemailer.createTransport(config);
export default transporter;