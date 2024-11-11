import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
    <h1>Job Marketplace</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-job">New Job</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
