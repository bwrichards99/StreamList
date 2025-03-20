// src/components/StreamList.js
import React, { useState } from 'react';
import subscriptionData from '../data'; // Import subscription data (but not displayed)

function StreamList() {
  const [input, setInput] = useState('');
  const [price, setPrice] = useState('');
  const [streamList, setStreamList] = useState([]); // Only custom items here

  // Add new custom items (movies, etc.) to the stream list
  const handleAdd = () => {
    if (input.trim() && price.trim()) {
      setStreamList([...streamList, { name: input, price: parseFloat(price) }]);
      setInput('');
      setPrice('');
    }
  };

  // Add custom items (movies, etc.) to the cart
  const handleAddToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...item, quantity: 1 }); // Add item with quantity 1
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  };

  return (
    <div>
      <h1>StreamList</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item name"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
      />
      <button onClick={handleAdd}>Add Item</button>

      <h2>Custom Items</h2>
      <ul>
        {streamList.map((item, index) => (
          <li key={index}>
            <span>{item.name} - ${item.price.toFixed(2)}</span>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
