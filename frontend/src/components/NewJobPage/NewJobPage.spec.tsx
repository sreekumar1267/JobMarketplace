// FILEPATH: /Users/vn573f3/projects/market_place_orm/test_in_progress_marketplace/frontend/src/components/NewJobPage/NewJobPage.spec.tsx

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewJobPage from './NewJobPage';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('NewJobPage', () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form with all input fields', () => {
    render(<NewJobPage />);

    expect(screen.getByPlaceholderText('Job Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Job Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Requirements')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Poster Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact Info')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should update jobData state on input change', () => {
    render(<NewJobPage />);

    fireEvent.change(screen.getByPlaceholderText('Job Title'), { target: { value: 'Test Job' } });
    fireEvent.change(screen.getByPlaceholderText('Job Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByPlaceholderText('Requirements'), { target: { value: 'Test Requirements' } });
    fireEvent.change(screen.getByPlaceholderText('Poster Name'), { target: { value: 'Test Poster' } });
    fireEvent.change(screen.getByPlaceholderText('Contact Info'), { target: { value: 'Test Contact' } });

    expect(screen.getByPlaceholderText('Job Title')).toHaveValue('Test Job');
    expect(screen.getByPlaceholderText('Job Description')).toHaveValue('Test Description');
    expect(screen.getByPlaceholderText('Requirements')).toHaveValue('Test Requirements');
    expect(screen.getByPlaceholderText('Poster Name')).toHaveValue('Test Poster');
    expect(screen.getByPlaceholderText('Contact Info')).toHaveValue('Test Contact');
  });

  it('should submit the form and navigate to home page', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({});
    render(<NewJobPage />);

    fireEvent.change(screen.getByPlaceholderText('Job Title'), { target: { value: 'Test Job' } });
    fireEvent.change(screen.getByPlaceholderText('Job Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByPlaceholderText('Requirements'), { target: { value: 'Test Requirements' } });
    fireEvent.change(screen.getByPlaceholderText('Poster Name'), { target: { value: 'Test Poster' } });
    fireEvent.change(screen.getByPlaceholderText('Contact Info'), { target: { value: 'Test Contact' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/jobs', {
      title: 'Test Job',
      description: 'Test Description',
      requirements: 'Test Requirements',
      posterName: 'Test Poster',
      contactInfo: 'Test Contact',
    });

    await screen.findByText('Submit'); // Wait for the form submission to complete

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});