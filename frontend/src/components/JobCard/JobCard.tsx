import React from 'react';
import { Job } from '../../app/types';
import { Link } from 'react-router-dom';
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
      <Link to={`/job/${job.id}`}>View Details</Link>
    </div>
  );
};

export default JobCard;
