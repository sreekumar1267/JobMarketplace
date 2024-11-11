import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import NewJobPage from '../components/NewJobPage';
import JobDetailsPage from '../components/JobDetailsPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-job" element={<NewJobPage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
