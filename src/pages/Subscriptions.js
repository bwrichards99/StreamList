// src/pages/Subscriptions.js
import React from 'react';
import subscriptionData from '../data'; // Import subscription data from data.js

function Subscriptions() {
  // Add subscription item to the cart
  const handleAddSubscription = (subscription) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if subscription already exists in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === subscription.id);

    if (existingItemIndex !== -1) {
      alert('You can only add one subscription at a time.');
      return;
    }

    // Add subscription to cart
    cart.push({ ...subscription, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${subscription.service} subscription added to cart!`);
  };

  return (
    <div>
      <h1>Subscriptions</h1>
      <ul>
        {subscriptionData.map((subscription) => (
          <li key={subscription.id}>
            <img src={subscription.img} alt={subscription.service} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <span>{subscription.service} - ${subscription.price.toFixed(2)}</span>
            <p>{subscription.serviceInfo}</p>
            <button onClick={() => handleAddSubscription(subscription)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subscriptions;
