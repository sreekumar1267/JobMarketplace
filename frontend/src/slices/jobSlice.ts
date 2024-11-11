import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface JobState {
  jobs: Job[];
  selectedJob?: Job;
}

const initialState: JobState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload;
    },
    setSelectedJob(state, action: PayloadAction<Job>) {
      state.selectedJob = action.payload;
    },
  },
});

export const { setJobs, setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
