import React, { useState } from 'react';
import axios from 'axios';
import './TranslatorPage.css';

const TranslatorPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleTranslate = async () => {
    // Assuming an API for translation (can be mocked)
    const response = await axios.post('/translate', { text: input });
    setOutput(response.data.translatedText);
  };

  return (
    <div className="translator-container">
      <h2>Translator</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleTranslate}>Translate</button>
      <div className="translated-text">
        <h3>Translation:</h3>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default TranslatorPage;
