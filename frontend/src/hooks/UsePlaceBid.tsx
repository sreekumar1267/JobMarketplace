import { useQuery, UseQueryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface PlaceBidParams {
  jobId: string;
  bidAmount: number;
}

const placeBid = async (jobId:string, bidAmount:number) => {
    const response = await axios.post(`http://localhost:3001/api/jobs/${jobId}/bids`, { bidAmount });
    return response.data;
  };

export const usePlaceBid = (jobId: string, bidAmount: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, bidAmount }: PlaceBidParams) => placeBid(jobId, bidAmount),
    onSuccess: (jobId) => {
      queryClient.invalidateQueries({queryKey: ['jobDetails']} ); 
    },
    onError: (error) => {
        console.error("Error placing bid:", error);
      },
  });
};
