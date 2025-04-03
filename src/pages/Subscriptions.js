// src/pages/Subscriptions.js
import React, { useState } from 'react';
import subscriptionData from '../data'; // Import subscription data from data.js

function SubscriptionItem({ subscription, onAddSubscription }) {
  return (
    <article>
      <img
        src={subscription.image}
        alt={subscription.description}
        style={{ width: '50px', height: '50px', marginRight: '10px' }}
      />
      <span>
        {subscription.service} - ${subscription.price}
      </span>
      <p>{subscription.description}</p>
      <button type="button" onClick={() => onAddSubscription(subscription)}>
        Add to Cart
      </button>
    </article>
  );
}

function Subscriptions() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  // Handle adding subscription to the cart
  const handleAddSubscription = (subscription) => {
    let updatedCart = [...cart];

    // Check if subscription is already in the cart
    const hasSubscription = updatedCart.some(item => item.id === subscription.id);

    if (hasSubscription) {
      alert('This subscription is already in the cart.');
      return;
    }

    // Remove the old subscription if it's already there (if the cart has any)
    const existingSubscription = updatedCart.find(item => item.id === subscription.id);
    if (existingSubscription) {
      updatedCart = updatedCart.filter(item => item.id !== subscription.id);
    }

    // Add new subscription to the cart
    updatedCart.push({ ...subscription, quantity: 1 });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${subscription.service} subscription added to cart!`);
  };

  return (
    <div>
      <h1>Subscriptions</h1>
      <ul>
        {subscriptionData.map((subscription) => (
          <li key={subscription.id}>
            <SubscriptionItem
              subscription={subscription}
              onAddSubscription={handleAddSubscription}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subscriptions;
