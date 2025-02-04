const express = require("express");
const {
  register,
  login,
  verifyEmail,
  authCheck,
  logout,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/", authCheck);
router.post("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);

module.exports = router;
