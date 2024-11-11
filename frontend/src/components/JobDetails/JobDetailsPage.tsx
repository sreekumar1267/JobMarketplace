import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useFetchJobDetails } from '../../hooks/UseFetchJobDetails';
import { usePlaceBid } from '../../hooks/UsePlaceBid';

import { Job } from '../../app/types';
import './JobDetailsPage.css';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const [job, setJob] = useState<Job | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(1);


  const { data: job, isLoading, isError, error } = useFetchJobDetails(id!);
  const { mutate: placeBid, isError: isBidError } = usePlaceBid(id!, bidAmount);

  const handleBidSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bidAmount <= 0) return;
    placeBid({jobId: id!, bidAmount: bidAmount});
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Job not found!</div>;

  return (
    <div className="jobDetails">
      {job && (
        <>
            <h2>Job Details</h2>
            <h1 className="title">{job.title}</h1>
            <p>{job.description}</p>
            <p>Requirements: {job.requirements}</p>
            <p>Lowest Bid: {job.lowestBid}</p>
            <p>Number of Bids: {job.bidsCount}</p>
            <p>Time Left: {job.expirationTime}</p>

            <div className="bidForm">
                  <h2>Place a New Bid</h2>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    placeholder="Enter bid amount"
                    min="1"
                  />
                  <button onClick={handleBidSubmit} > 
                    Place Bid             
                  </button>
                  {isBidError && <p className="error">Error placing bid. Please try again.</p>}
            </div>
          </>)}
    </div>
  );
};

export default JobDetailsPage;
