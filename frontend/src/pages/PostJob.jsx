// src/pages/PostJob.jsx
import React, { useState } from 'react';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';

export default function PostJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('BEGINNER');
  const [endDate, setEndDate] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/company/post-job', {
        title,
        description,
        experienceLevel: experience,
        endDate,
        candidates: [candidateEmail],
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Job posting failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="EXPERT">EXPERT</option>
        </select>
        <FormInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <FormInput
          type="email"
          placeholder="Candidate Email"
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
}
