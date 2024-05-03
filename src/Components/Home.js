import React from 'react';
import './Home.css';
import backgroundImage from '../2.jpg';

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
        <h3>Engage your intellect, embrace the challenge.</h3>
      </div>
    </div>
  );
}

export default Home;
