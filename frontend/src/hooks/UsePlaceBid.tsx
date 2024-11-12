import { useQuery, UseQueryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface PlaceBidParams {
  jobId: string;
  bidAmount: number;
  bidderName: string;
}

const placeBid = async (jobId:string, bidAmount:number, bidderName:string) => {
    const response = await axios.post(`http://localhost:3001/api/jobs/${jobId}/bids`, { bidAmount, bidderName });
    return response.data;
  };

export const usePlaceBid = (jobId: string, bidAmount: number, bidderName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, bidAmount, bidderName }: PlaceBidParams) => placeBid(jobId, bidAmount, bidderName),
    onSuccess: (jobId) => {
      queryClient.invalidateQueries({queryKey: ['jobDetails']} ); 
      queryClient.invalidateQueries({queryKey: ['jobs', 'active']} );       
      queryClient.invalidateQueries({queryKey: ['jobs', 'refresh']} );       
    },
    onError: (error) => {
        console.error("Error placing bid:", error);
      },
  });
  
};
