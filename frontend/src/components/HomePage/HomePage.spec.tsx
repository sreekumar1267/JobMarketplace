// FILEPATH: /Users/vn573f3/projects/market_place_orm/test_in_progress_marketplace/frontend/src/components/HomePage/HomePage.spec.tsx

import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { useFetchJobs } from '../../hooks/UseFetchJobs.tsx';
import { Job } from '../../app/types';
import { UseQueryResult } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

// Mock the useFetchJobs hook
jest.mock('../../hooks/UseFetchJobs.tsx');
const mockedUseFetchJobs = useFetchJobs as jest.MockedFunction<typeof useFetchJobs>;

const MockContext = React.createContext({ basename: 'test' });
jest.spyOn(React, 'useContext').mockImplementation(() => useContext(MockContext));

describe('HomePage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

it('should display loading state', () => {
    mockedUseFetchJobs.mockImplementation((type) => ({
        data: undefined,
        isLoading: true,
        error: null,
        isError: false,
        isSuccess: false,
        isIdle: false,
        isFetching: true,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'loading',
    } as unknown as UseQueryResult<Job[], Error>));

    const { getByText } = render(
        <MockContext.Provider value={{ basename: 'test' }}>
          <HomePage />
        </MockContext.Provider>
      );
      
      expect(getByText('Loading...')).toBeTruthy();
});

it('should display error state', () => {
    mockedUseFetchJobs.mockImplementation((type) => ({
        data: undefined,
        isLoading: false,
        error: new Error(`Error loading ${type} jobs`),
        isError: true,
        isSuccess: false,
        isIdle: false,
        isFetching: false,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'error',
    } as unknown as UseQueryResult<Job[], Error>));

    const { getByText } = render(
        <MockContext.Provider value={{ basename: 'test' }}>
          <HomePage />
        </MockContext.Provider>
      );
    expect(getByText('Error loading jobs')).toBeTruthy();
});

  it('should display recent and active jobs', async () => {


    
    const recentJobs: Job[] = [
        { id: 1, title: 'Recent Job 1', description: 'Description 1', requirements: 'requirements 1', posterName: 'user1', contactInfo: 'test', bidsCount: 0, expirationTime: '11/17/2024', createdAt: '11/11/2024' },
        { id: 2, title: 'Recent Job 2', description: 'Description 2', requirements: 'requirements 2', posterName: 'user2', contactInfo: 'test', bidsCount: 0, expirationTime: '11/17/2024', createdAt: '11/11/2024' },
      ];
      const activeJobs: Job[] = [
          { id: 1, title: 'Active Job 1', description: 'Description 1', requirements: 'requirements 1', posterName: 'user1', contactInfo: 'test', bidsCount: 0, expirationTime: '11/17/2024', createdAt: '11/11/2024' },
          { id: 2, title: 'Active Job 2', description: 'Description 2', requirements: 'requirements 2', posterName: 'user2', contactInfo: 'test', bidsCount: 0, expirationTime: '11/17/2024', createdAt: '11/11/2024' },
        ];

    mockedUseFetchJobs.mockImplementation((type) => {
    if (type === 'recent') {
        return {
            data: recentJobs,
            isLoading: false,
            error: null,
            isError: false,
            isSuccess: true,
            isIdle: false,
            isFetching: false,
            refetch: jest.fn(),
            remove: jest.fn(),
            status: 'success',
        } as unknown as UseQueryResult<Job[], Error>;
    } else if (type === 'active') {
            return {
                data: activeJobs,
                isLoading: false,
                error: null,
                isError: false,
                isSuccess: true,
                isIdle: false,
                isFetching: false,
                refetch: jest.fn(),
                remove: jest.fn(),
                status: 'success',
            } as unknown as UseQueryResult<Job[], Error>;
        }
    return {
        data: undefined,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: false,
        isIdle: true,
        isFetching: false,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'idle',
    } as unknown as UseQueryResult<Job[], Error>;
    });

    const { getByText } = render(
        
        <MemoryRouter initialEntries={['/job/1']}>

            <HomePage />
          </MemoryRouter>
       
      );

    //   const { getByText } = render(<HomePage />);


    await waitFor(() => {
      expect(getByText('Recent Jobs')).toBeTruthy();
      expect(getByText('Recent Job 1')).toBeTruthy();
      expect(getByText('Recent Job 2')).toBeTruthy();
      expect(getByText('Most Active Jobs')).toBeTruthy();
      expect(getByText('Active Job 1')).toBeTruthy();
      expect(getByText('Active Job 2')).toBeTruthy();
    });
  });
});