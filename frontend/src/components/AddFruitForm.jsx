import React, { useState } from 'react';
import axios from 'axios';

const AddFruitForm = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/fruits', { name, color });
      console.log('Fruit added:', response.data);
      // Optionally clear form fields or update the UI
      setName('');
      setColor('');
      setError('');
    } catch (err) {
      console.error('Error adding fruit:', err);
      setError('Error adding fruit. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a New Fruit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Fruit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddFruitForm;
