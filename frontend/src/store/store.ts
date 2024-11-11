import { configureStore } from '@reduxjs/toolkit';
import jobSlice from '../slices/jobSlice';

export const store = configureStore({
  reducer: {
    jobs: jobSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
