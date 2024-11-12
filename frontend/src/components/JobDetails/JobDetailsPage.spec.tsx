import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import JobDetailsPage from './JobDetailsPage';
import { useFetchJobDetails } from '../../hooks/UseFetchJobDetails';
import { usePlaceBid } from '../../hooks/UsePlaceBid';

jest.mock('../../hooks/UseFetchJobDetails');
jest.mock('../../hooks/UsePlaceBid', () => ({
    usePlaceBid: jest.fn(),
  }));
  
  describe('JobDetailsPage', () => {
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('submits bid successfully', async () => {
      const mockJob = {
        id: '1',
        title: 'Software Engineer',
        description: 'We are looking for a software engineer.',
        requirements: '3+ years of experience',
        posterName: 'John Doe',
        lowestBid: 100,
        bidsCount: 5,
        expirationTime: new Date(new Date().getTime() + 10000).toISOString(), // 10 seconds from now
      };
  
      const mockPlaceBid = jest.fn();
  
      (useFetchJobDetails as jest.Mock).mockReturnValue({ data: mockJob, isLoading: false, isError: false });
  
      (usePlaceBid as jest.Mock).mockReturnValue({
        mutate: mockPlaceBid,
        isError: false,
      });
  
      render(
        <Router>
          <JobDetailsPage />
        </Router>
      );
  
      const nameInput = screen.getByPlaceholderText('Bidder Name');
      const amountInput = screen.getByPlaceholderText('Enter bid amount');
      const submitButton = screen.getByRole('button', { name: /Place Bid/i });
  
      fireEvent.change(nameInput, { target: { value: 'Alice' } });
      fireEvent.change(amountInput, { target: { value: '150' } });
  
      fireEvent.click(submitButton);
  
      await waitFor(() => expect(mockPlaceBid).toHaveBeenCalledTimes(1));

    });
  
    it('displays an error message when bid submission fails', async () => {
      const mockJob = {
        id: '1',
        title: 'Software Engineer',
        description: 'We are looking for a software engineer.',
        requirements: '3+ years of experience',
        posterName: 'John Doe',
        lowestBid: 100,
        bidsCount: 5,
        expirationTime: new Date(new Date().getTime() + 10000).toISOString(),
      };
  
      (useFetchJobDetails as jest.Mock).mockReturnValue({ data: mockJob, isLoading: false, isError: false });
  
      (usePlaceBid as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
        isError: true,
      });
  
      render(
        <Router>
          <JobDetailsPage />
        </Router>
      );
  
      const nameInput = screen.getByPlaceholderText('Bidder Name');
      const amountInput = screen.getByPlaceholderText('Enter bid amount');
      const submitButton = screen.getByRole('button', { name: /Place Bid/i });
      fireEvent.change(nameInput, { target: { value: 'Alice' } });
      fireEvent.change(amountInput, { target: { value: '150' } });
      fireEvent.click(submitButton);
      expect(await screen.findByText('Error placing bid. Please try again.')).toBeInTheDocument();
    });


    it('Place bid button disabled', async () => {
        const mockJob = {
          id: '1',
          title: 'Software Engineer',
          description: 'We are looking for a software engineer.',
          requirements: '3+ years of experience',
          posterName: 'John Doe',
          lowestBid: 100,
          bidsCount: 5,
          expirationTime: new Date(new Date().getTime() + 5000).toISOString(),
        };
    
        (useFetchJobDetails as jest.Mock).mockReturnValue({ data: mockJob, isLoading: false, isError: false });
        jest.useFakeTimers();
    
        render(
          <Router>
            <JobDetailsPage />
          </Router>
        );

        expect(screen.getByText('Time Remaining to Bid:')).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(60000); 
          });          
        expect(await screen.findByText('Job Details')).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: /Place Bid/i });
        expect(submitButton).toBeDisabled();


      });


      it('calls mutate function when placing a bid', async () => {
        const mockJob = {
            id: '1',
            title: 'Software Engineer',
            description: 'We are looking for a software engineer.',
            requirements: '3+ years of experience',
            posterName: 'John Doe',
            lowestBid: 100,
            bidsCount: 5,
            expirationTime: new Date(new Date().getTime() + 5000).toISOString(),
          };
        (useFetchJobDetails as jest.Mock).mockReturnValue({ data: mockJob, isLoading: false, isError: false });
        const mockPlaceBid = jest.fn();
        jest.mock('../../hooks/UsePlaceBid');
        (usePlaceBid as jest.Mock).mockReturnValue({
          mutate: mockPlaceBid,
          isError: false,
        });
    
        render(
          <Router>
            <JobDetailsPage />
          </Router>
        );
        const nameInput = screen.getByPlaceholderText('Bidder Name');
        const amountInput = screen.getByPlaceholderText('Enter bid amount');
        const submitButton = screen.getByRole('button', { name: /Place Bid/i });
        fireEvent.change(nameInput, { target: { value: 'Alice' } });
        fireEvent.change(amountInput, { target: { value: '150' } });
        fireEvent.click(submitButton);
        await waitFor(() => expect(mockPlaceBid).toHaveBeenCalledTimes(1));
    
        // expect(mockPlaceBid).toHaveBeenCalledWith({
        //   jobId: mockJob.id,
        //   bidAmount: 150,
        //   bidderName: 'Alice',
        // });
      });
  });
  