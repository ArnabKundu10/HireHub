// src/components/JobCard.jsx
import React from 'react';

export default function JobCard({ job }) {
  return (
    <li className="p-4 bg-white shadow rounded mb-4">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p>{job.description}</p>
    </li>
  );
}
