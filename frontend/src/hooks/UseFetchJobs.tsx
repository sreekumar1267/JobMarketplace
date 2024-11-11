import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setJobs } from '../slices/jobSlice';
import { Job } from 'src/app/types';

// interface Job {
//   id: number;
//   title: string;
//   description: string;
//   requirements: string;
//   posterName: string;
//   contactInfo: string;
//   expirationTime: string;
//   createdAt: string;
//   bidsCount?: number;
//   lowestBid?: number;
// }

const fetchJobs = async (filter: string): Promise<Job[]> => {
  const response = await axios.get(`http://localhost:3001/api/jobs?filter=${filter}`);
  return response.data;
};

export const useFetchJobs = (filter: string) => {
  const dispatch = useDispatch();

  return useQuery<Job[], Error>(
    {
      queryKey: ['jobs', filter],
      queryFn: () => fetchJobs(filter),
      onSuccess: (data: Job[]) => {
        dispatch(setJobs(data));
      },
    } as UseQueryOptions<Job[], Error> // Explicitly specify options type here
  );
};
