import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './app';
import HomePage from '../components/HomePage/HomePage.tsx';
import NewJobPage from '../components/NewJobPage/NewJobPage.tsx';
import JobDetailsPage from '../components/JobDetails/JobDetailsPage.tsx';
import Header from '../components/Header/Header.tsx';
import { Provider } from 'react-redux';
import {store} from '../store/store.ts'; 
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the Header component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    expect(getByText(/Job Marketplace/)).toBeTruthy();
  });

  it('should render NewJobPage component for "/new-job" route', () => {
    const { getByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/new-job']}>
            <Routes>
              <Route path="/new-job" element={<NewJobPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(getByText(/New Job Details/)).toBeTruthy();
  });

  it('should render JobDetailsPage component for "/job/:id" route', async() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { id: 1, title: 'Mock Job Title', description: 'Mock Job Description' , requirements: 'Mock Job Requirements', lowestBid: '90', bisCount: '4' },
    });

    const { getByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/job/1']}>
            <Routes>
              <Route path="/job/:id" element={<JobDetailsPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    await waitFor(() => expect(getByText(/Job Details/)).toBeTruthy());
  });
});