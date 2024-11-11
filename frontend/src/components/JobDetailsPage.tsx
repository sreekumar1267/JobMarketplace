import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Job } from './types';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);

  useEffect(() => {
    axios.get<Job>(`http://localhost:3001/api/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/api/jobs/${id}/bids`, { bidAmount }).then(() => {
      // Refresh job details after placing a bid
      axios.get<Job>(`http://localhost:3001/api/jobs/${id}`).then((res) => setJob(res.data));
    });
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="job-details">
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Requirements: {job.requirements}</p>
      <p>Lowest Bid: {job.lowestBid}</p>
      <p>Number of Bids: {job.bidsCount}</p>
      <p>Time Left: {job.expirationTime}</p>

      <form onSubmit={handleBidSubmit}>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(parseFloat(e.target.value))}
        />
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
};

export default JobDetailsPage;
