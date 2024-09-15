import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Fruit.ai</h1>
      <div className="services">
        <Link to="/chatbot">Chatbot</Link>
        <Link to="/translator">Translator</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default HomePage;
