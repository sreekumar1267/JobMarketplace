import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Job } from './types';
import JobCard from './JobCard';

const HomePage: React.FC = () => {
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get<Job[]>('http://localhost:3001/api/jobs?filter=recent').then((res) => setRecentJobs(res.data));
    axios.get<Job[]>('http://localhost:3001/api/jobs?filter=active').then((res) => setActiveJobs(res.data));
  }, []);

  return (
    <div className="root">
      <h1>Job Marketplace</h1>
      <h2>Recent Jobs</h2>
      {recentJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <h2>Most Active Jobs</h2>
      {activeJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default HomePage;
