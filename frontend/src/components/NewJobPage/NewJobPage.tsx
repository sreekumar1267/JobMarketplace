import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewJobPage.css';

const NewJobPage: React.FC = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    posterName: '',
    contactInfo: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/jobs', jobData).then(() => navigate('/'));
  };

  return (
    <form className="newJobForm" onSubmit={handleSubmit}>
      <h2>New Job Details</h2>
      <input
        type="text"
        placeholder="Job Title"
        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
      />
      <textarea
        placeholder="Job Description"
        onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
      />
      <textarea
        placeholder="Requirements"
        onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
      />
      <input
        type="text"
        placeholder="Poster Name"
        onChange={(e) => setJobData({ ...jobData, posterName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Info"
        onChange={(e) => setJobData({ ...jobData, contactInfo: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewJobPage;
