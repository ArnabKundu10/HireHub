// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Company = require("../models/Company.js");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) return res.status(401).json({ message: "Not authorized" });

    req.user = company; // Attach the user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
