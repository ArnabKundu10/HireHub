const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company.js");
const { sendVerificationEmail } = require("../utils/mailer.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res.status(400).json({ message: "Company already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = await Company.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newCompany);
    const token = jwt.sign({ id: newCompany._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    sendVerificationEmail(newCompany.email, token);
    res
      .status(201)
      .json({ message: "Company registered, please verify your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company)
      return res.status(400).json({ message: "Invalid credentials" });
    if (!company.isVerified)
      return res.status(403).json({ message: "Please verify your email" });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Company.findByIdAndUpdate(decoded.id, { isVerified: true });
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyEmail, login, register };
