import React from 'react';
import FruitList from './FruitList';
import './ChatbotPage.css';
const ChatbotPage = () => {
  return (
    <div className="chatbot-container">
      <h2>Chatbot</h2>
      <p>Here are some fruits you can explore:</p>
      <FruitList />
    </div>
  );
};

export default ChatbotPage;
