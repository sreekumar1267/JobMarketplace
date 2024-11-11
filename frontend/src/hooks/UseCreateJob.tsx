import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createJob = async (jobData: any) => {
  const response = await axios.post('http://localhost:3001/api/jobs', jobData);
  return response.data;
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['jobs']} ); 
    },
  });
};
