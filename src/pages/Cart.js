// src/components/Cart.js
import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart); // Load cart from localStorage
  }, []);

  // Remove item from cart
  const handleRemove = (itemName) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== itemName && item.service !== itemName); // Remove both custom items and subscriptions
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart); // Update cart state
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Cart</h1>
      
      {/* Display all items in cart */}
      <h2>Items in Cart</h2>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <li key={index}>
              <span>{item.name || item.service} - ${item.price.toFixed(2)} x {item.quantity}</span>
              <button onClick={() => handleRemove(item.name || item.service)}>Remove</button>
            </li>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </ul>

      <div>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        <button onClick={() => alert('Proceeding to checkout!')}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
