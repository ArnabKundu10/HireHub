const express = require("express");
const {
  createJob,
  getJobs,
  applyJob,
} = require("../controllers/jobController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/create", createJob);
router.post("/myjobs",authMiddleware, getJobs);
router.post("/apply", authMiddleware, applyJob);

module.exports = router;
