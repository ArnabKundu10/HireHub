// backend/controllers/jobController.js
const Job = require("../models/Job.js");
const { sendJobAlertEmail } = require("../utils/mailer.js");

const createJob = async (req, res) => {
  try {
    const { title, description, experienceLevel, candidates, endDate } =
      req.body;
    const newJob = new Job({
      title,
      description,
      experienceLevel,
      company: req.user.id,
      candidates,
      endDate,
    });

    await newJob.save();

    // Send email alerts to candidates
    candidates.forEach(async (candidateEmail) => {
      await sendJobAlertEmail(candidateEmail, newJob);
    });
    console.log(newJob);
    res.status(201).json(newJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", "name");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (!job.candidates.includes(req.user.email)) {
      job.candidates.push(req.user.email);
      await job.save();
      res.status(200).json({ message: "Applied successfully" });
    } else {
      res.status(400).json({ message: "Already applied" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { applyJob, getJobs, createJob };
