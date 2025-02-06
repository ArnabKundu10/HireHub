const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company.js");
const { sendVerificationEmail } = require("../utils/mailer.js");

const register = async (req, res) => {
  try {
    // console.log(req.body);
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company)
      return res
        .status(201)
        .json({ message: "Invalid credentials", token: null });
    if (!company.isVerified)
      return res
        .status(201)
        .json({ message: "Please verify your email", token: null });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch)
      return res
        .status(201)
        .json({ message: "Invalid credentials", token: null });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Use only in HTTPS
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
      })
      .json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    console.log(req.params);
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Company.findByIdAndUpdate(decoded.id, { isVerified: true });
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
const authCheck = async (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "Not authorized", status: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company)
      return res.status(401).json({ message: "Not authorized", status: false });

    // req.user = company;
    // Attach the user info to the request
    res
      .status(201)
      .json({ message: "authorized", company: company, status: true });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", status: false });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true, // Use only in HTTPS
      sameSite: "None",
    });
    res.json({ message: "Logged out successfully", status: true });
  } catch (error) {
    res.json({ message: "Logged out successfully", status: false });
    console.log(error);
  }
};

module.exports = { verifyEmail, login, register, authCheck, logout };
