import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchJobDetails } from '../../hooks/UseFetchJobDetails';
import { usePlaceBid } from '../../hooks/UsePlaceBid';
import './JobDetailsPage.css';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const [job, setJob] = useState<Job | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(1);
  const [bidderName, setBidderName] = useState<string>('');

  const { data: job, isLoading, isError } = useFetchJobDetails(id!);
  const { mutate: placeBid, isError: isBidError } = usePlaceBid(id!, bidAmount, bidderName);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [expiredJob, setExpiredJob] = useState<boolean>(false);


  const handleBidSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bidAmount <= 0 || bidderName.length === 0) return;
    placeBid({jobId: id!, bidAmount: bidAmount, bidderName: bidderName});
  };

  const calculateTimeRemaining = (expiration: Date) => {
    const now = new Date().getTime();
    const expirationTime = expiration.getTime();
    const difference = expirationTime - now;
    if (difference <= 0) {
      setExpiredJob(true);
      return '00:00:00';
    }
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')} hr:${String(minutes).padStart(2, '0')} min:${String(seconds).padStart(2, '0')} sec`;
  };


  useEffect(() => {
    if (!job || !job.expirationTime) return;
    const expiration = new Date(job.expirationTime);
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(expiration));
    }, 1000);

    return () => clearInterval(interval);
  }, [job]);


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
            <p>Posted By: {job.posterName}</p>
            <p>Lowest Bid Amount: {job.lowestBid}</p>
            <p>Number of Bids: {job.bidsCount}</p>
            <p>
              <strong>Expiration Date:</strong> {new Date(job.expirationTime).toLocaleString()}
            </p>
            <p>
              <strong>Time Remaining to Bid:</strong> {timeRemaining ?? 'Calculating...'}
            </p>

            <div className="bidForm">
                  <h2>Place a New Bid</h2>
                  <label htmlFor="bidderName">Bidder Name:</label>
                  <input
                    type="text"
                    value={bidderName}
                    placeholder="Bidder Name"
                    onChange={(e) => setBidderName(e.target.value )}
                  />
                  <label htmlFor="bidAmount">Bid Amount:</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    placeholder="Enter bid amount"
                    min="1"
                  />
                  <button onClick={handleBidSubmit} disabled={expiredJob} > 
                    Place Bid             
                  </button>
                  {isBidError && <p className="error">Error placing bid. Please try again.</p>}
            </div>
          </>)}
    </div>
  );
};

export default JobDetailsPage;
