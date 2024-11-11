/* eslint-env jest */ 
import React from 'react';
import { render } from '@testing-library/react';
import JobCard from './JobCard';
import { Job } from '../../app/types';
//import { BrowserRouter } from 'react-router-dom';

describe('JobCard', () => {
  const job: Job = { id: 1, title: 'Test Job', description: 'This is a test job description', requirements: 'requirements 1', posterName: 'user1', contactInfo: 'test', bidsCount: 5, expirationTime: '11/17/2024', createdAt: '11/11/2024' };

  it('should render job title, description, and bids count', () => {
    const { getByText } = render(
        <JobCard job={job} />
    );

    expect(getByText('Test Job')).toBeTruthy();
    expect(getByText('This is a test job description')).toBeTruthy();
    expect(getByText('Bids: 5')).toBeTruthy();
  });


it('should have a link to the job details page', () => {
    const { getByText } = render(
            <JobCard job={job} />
    );

    const linkElement = getByText('View Details').closest('a');
    expect(linkElement).toHaveProperty('href', 'http://localhost/job/1');
});

});