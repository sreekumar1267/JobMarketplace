import React from 'react';
import { Job } from '../../app/types';
import './JobCard.css';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }:JobCardProps) => {
  return (
    <div className="jobCard">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>Bids: {job.bidsCount}</p>
      <a href={`/job/${job.id}`}>
         <button>View Details</button>
      </a>
    </div>
  );
};

export default JobCard;
