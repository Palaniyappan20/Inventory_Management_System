import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addProduct = () => {
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, quantity, price })
    })
    .then(res => res.json())
    .then(newProduct => setProducts([...products, newProduct]));
  };

  return (
    <div>
      <h1>Inventory Management System</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>
      <ul>
        {products.map((p, i) => (
          <li key={i}>{p.name} - {p.quantity} - ₹{p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
