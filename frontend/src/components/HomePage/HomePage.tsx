import React, { useEffect, useState } from 'react';
import JobCard from '../JobCard/JobCard';
import './HomePage.css';
import { useFetchJobs } from '../../hooks/UseFetchJobs.tsx';

const HomePage: React.FC = () => {

  const { data: recentJobs, isLoading: isRecentLoading, error: recentJobsError } = useFetchJobs('recent');
  const { data: activeJobs, isLoading: iActiveLoading, error: activeJobsError } = useFetchJobs('active');

  if (isRecentLoading || iActiveLoading) return <div>Loading...</div>;
  if (recentJobsError || activeJobsError) return <div>Error loading jobs</div>;

  return (
    <div className="homePageContainer">
      <h2>Recent Jobs</h2>
      <div className="jobCardsContainer">
        {recentJobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>        
      <h2>Most Active Jobs</h2>
      <div className="jobCardsContainer">
        {activeJobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
