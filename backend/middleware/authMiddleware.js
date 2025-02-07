// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Company = require("../models/Company.js");

const authMiddleware = async (req, res, next) => {
  const tk = req.body;
  
// Retrieve the token
const token = Object.keys(tk)[0];
  if (!token) return res.status(401).json({ message: "Not authorized",status:false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) return res.status(401).json({ message: "Not authorized",status:false});
    console.log(company);
    req.user = company; // Attach the user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token",status:false  });
  }
};

module.exports = authMiddleware;
