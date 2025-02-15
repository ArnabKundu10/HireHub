// backend/config/mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const URL = process.env.SERVER_URL || "http://localhost:5000";
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${URL}/api/auth/verify/${token}`;
  // console.log("token:-", token);
  console.log("verifyurl:-", verificationUrl);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Please verify your email by clicking on the link: ${verificationUrl}`,
  };
  // console.log(mailOptions, process.env.EMAIL_PASS);
  try {
    const result=await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendJobAlertEmail = async (email, jobDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `New Job Post: ${jobDetails.title}`,
    text: `Job Title: ${jobDetails.title}\nDescription: ${jobDetails.description}\nExperience Level: ${jobDetails.experienceLevel}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending job alert email:", error);
  }
};
module.exports = { sendVerificationEmail, sendJobAlertEmail };
