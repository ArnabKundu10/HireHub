const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: {
    type: String,
    enum: ["BEGINNER", "INTERMEDIATE", "EXPERT"],
    required: true,
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  candidates: [{ type: String }],
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("job", jobSchema);
