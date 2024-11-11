import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage.tsx';
import NewJobPage from '../components/NewJobPage/NewJobPage.tsx';
import JobDetailsPage from '../components/JobDetails/JobDetailsPage.tsx';
import './app.css';
import Header from '../components/Header/Header.tsx';

export function App() {
  //console.log('styles checking here 222::', styles);
  return (
   <div>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-job" element={<NewJobPage />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
