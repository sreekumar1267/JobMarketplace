import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedJob } from '../slices/jobSlice';

interface Job {
    id: number;
    title: string;
    description: string;
    requirements: string;
    posterName: string;
    contactInfo: string;
    expirationTime: string;
    createdAt: string;
    bidsCount?: number;
    lowestBid?: number;
}

const fetchJobDetails = async (id:number): Promise<Job[]> => {
  const response = await axios.get(`http://localhost:3001/api/jobs/${id}`);
  return response.data;
};

export const useFetchJobDetails = (id: number) => {
  const dispatch = useDispatch();

  return useQuery<Job[], Error>(
    {
        queryKey: ['jobDetails'],
        queryFn: ()=> fetchJobDetails(id),
        onSuccess: (data: Job) => {
          dispatch(setSelectedJob(data));
        },
      } as UseQueryOptions<Job[], Error>
    );  
};
