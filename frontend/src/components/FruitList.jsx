import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FruitList = () => {
  const [fruits, setFruits] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fruits');
        setFruits(response.data);
      } catch (error) {
        console.error('Error fetching fruits:', error);
      }
    };

    fetchFruits();
  }, []);

  return (
    <div>
      {fruits && fruits.length > 0 ? (
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit.id}>{fruit.name}</li>
          ))}
        </ul>
      ) : (
        <p>No fruits available</p>
      )}
    </div>
  );
};

export default FruitList;
