// src/pages/Subscriptions.js
import React from 'react';
import subscriptionData from '../data'; // Import subscription data from data.js

function SubscriptionItem({ subscription, onAddSubscription }) {
    return (
        <article>
            <img
                src={subscription.image}
                alt={subscription.description} // Use a meaningful description
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
    const handleAddSubscription = (subscription) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if there are any subscriptions in the cart
        const hasSubscription = cart.some(item => subscriptionData.some(sub => sub.id === item.id));

        if (hasSubscription) {
            // Find the existing subscription in the cart
            const existingSubscription = cart.find(item => subscriptionData.some(sub => sub.id === item.id));

            if (existingSubscription && existingSubscription.id === subscription.id) {
                alert('This subscription is already in the cart.');
                return;
            } else {
                // Remove the existing subscription
                cart = cart.filter(item => !subscriptionData.some(sub => sub.id === item.id));
                cart.push({ ...subscription, quantity: 1 });
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`Previous subscription removed. ${subscription.service} subscription added to cart!`);
                return;
            }
        }

        // If no subscriptions, add the new subscription
        cart.push({ ...subscription, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${subscription.service} subscription added to cart!`);
    };

    return (
        <div>
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
        </div>
    );
}

export default Subscriptions;
