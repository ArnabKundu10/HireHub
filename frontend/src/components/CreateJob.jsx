// src/pages/CreateJob.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/api";
import FormInput from "./FormInput";
import { Tag, X, CalendarCheck, Briefcase } from "lucide-react";

export default function CreateJob() {
  const { postJobs, SetSideBtns, user } = useAuth();
  const [job, setJob] = useState({
    title: "",
    description: "",
    experienceLevel: "BEGINNER",
    candidates: [],
    endDate: "",
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    SetSideBtns(1);
  }, [SetSideBtns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const addEmail = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email");
    if (job.candidates.includes(email)) return alert("Email already added");
    setJob((prev) => ({ ...prev, candidates: [...prev.candidates, email] }));
    setEmail("");
  };

  const removeEmail = (idx) => {
    setJob((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jobs/create", { ...job, user });
      postJobs();
      setJob({
        title: "",
        description: "",
        experienceLevel: "BEGINNER",
        candidates: [],
        endDate: "",
      });
      alert("Job created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-indigo-600 flex items-center p-6 text-white">
        <Briefcase size={28} className="mr-4" />
        <h2 className="text-3xl font-bold">Create a New Job</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">
            Job Title
          </label>
          <FormInput
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder="Enter job title"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Describe the role..."
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={job.experienceLevel}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="EXPERT">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">
            Application Deadline
          </label>
          <div className="relative">
            <CalendarCheck
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />
            <FormInput
              type="date"
              name="endDate"
              //   value={job.endDate}
              onChange={handleChange}
              className="w-full pl-200 p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-800 text-lg font-semibold mb-2">
            Email Alerts
          </label>
          <div className="flex items-center space-x-2">
            <FormInput
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="candidate@example.com"
              className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <button
              onClick={addEmail}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.candidates.map((cand, idx) => (
              <span
                key={idx}
                className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
              >
                <Tag size={16} className="mr-1 text-indigo-500" />
                {cand}
                <X
                  size={16}
                  className="ml-2 cursor-pointer text-red-500"
                  onClick={() => removeEmail(idx)}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
}
