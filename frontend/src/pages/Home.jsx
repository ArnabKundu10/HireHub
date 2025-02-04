// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import JobCard from '../components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/jobs').then((response) => {
      setJobs(response.data);
    }).catch((error) => {
      console.error('Error fetching jobs:', error);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <ul className='text-blue-600'>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </ul>
    </div>
  );
}
