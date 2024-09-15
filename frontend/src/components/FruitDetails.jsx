import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FruitDetails.css';

const FruitDetails = () => {
  const { id } = useParams();
  const [fruit, setFruit] = useState(null);

  useEffect(() => {
    const fetchFruit = async () => {
      const response = await axios.get(`/fruits/${id}`);
      setFruit(response.data);
    };

    fetchFruit();
  }, [id]);

  if (!fruit) return <div>Loading...</div>;

  return (
    <div className="fruit-details">
      <img src={fruit.image} alt={fruit.name} />
      <h2>{fruit.name}</h2>
      <p>{fruit.description}</p>
    </div>
  );
};

export default FruitDetails;
