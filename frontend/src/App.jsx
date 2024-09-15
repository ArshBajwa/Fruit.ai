import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ChatbotPage from './components/ChatbotPage';
import TranslatorPage from './components/TranslatorPage';
import FaqPage from './components/FaqPage';
import AboutPage from './components/AboutPage';
import FruitDetails from './components/FruitDetails';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Login Page Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Home Page Route */}
          <Route path="/home" element={<HomePage />} />

          {/* Chatbot Page Route */}
          <Route path="/chatbot" element={<ChatbotPage />} />

          {/* Translator Page Route */}
          <Route path="/translator" element={<TranslatorPage />} />

          {/* FAQ Page Route */}
          <Route path="/faqs" element={<FaqPage />} />

          {/* About Page Route */}
          <Route path="/about" element={<AboutPage />} />

          {/* Fruit Details Page (Dynamic Route) */}
          <Route path="/fruits/:id" element={<FruitDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
