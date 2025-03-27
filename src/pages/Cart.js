import React, { useState, useEffect, useCallback } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart); // Load cart from localStorage
    }, []);

    const updateLocalStorage = useCallback((updatedCart) => {
        try {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error updating local storage:', error);
            // Handle the error appropriately, e.g., display an error message to the user
        }
    }, []);

    // Remove item from cart
    const handleRemove = useCallback((itemToRemove) => {
        const updatedCart = cartItems.filter(item =>
            (item.name || item.service) !== (itemToRemove.name || itemToRemove.service)
        );
        updateLocalStorage(updatedCart);
        setCartItems(updatedCart); // Update cart state
    }, [cartItems, updateLocalStorage]);

    // Calculate total price
    const calculateTotal = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

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
                            <button onClick={() => handleRemove(item)}>Remove</button>
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
