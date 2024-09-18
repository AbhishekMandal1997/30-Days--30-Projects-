import React, { useState, useEffect } from 'react';
import './App.css';  

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      setData(result);  
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Product Cards</h1>
      <div className="cards">
        {data && data.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} className="card-image" />
            <div className="card-content">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
