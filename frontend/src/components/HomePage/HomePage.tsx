import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Job } from '../../app/types';
import JobCard from '../JobCard/JobCard';
import './HomePage.css';
import { useFetchJobs } from '../../hooks/UseFetchJobs.tsx';

const HomePage: React.FC = () => {

  const { data: recentJobs, isLoading: isRecentLoading, error: recentJobsError } = useFetchJobs('recent');
  const { data: activeJobs, isLoading: iActiveLoading, error: activeJobsError } = useFetchJobs('active');

  if (isRecentLoading || iActiveLoading) return <div>Loading...</div>;
  if (recentJobsError || activeJobsError) return <div>Error loading jobs</div>;

  return (
    <div className="homePage">
      <h2>Recent Jobs</h2>
      {recentJobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <h2>Most Active Jobs</h2>
      {activeJobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default HomePage;
