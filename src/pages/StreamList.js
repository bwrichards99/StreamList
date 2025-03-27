import React, { useState, useCallback } from 'react';

function StreamList() {
    const [input, setInput] = useState('');
    const [price, setPrice] = useState('');
    const [streamList, setStreamList] = useState([]);
    const [error, setError] = useState('');

    const handleAdd = useCallback(() => {
        if (!input.trim() || !price.trim()) {
            setError('Please enter both item name and price.');
            return;
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            setError('Please enter a valid price.');
            return;
        }

        setStreamList(prevStreamList => [...prevStreamList, { name: input, price: parsedPrice }]);
        setInput('');
        setPrice('');
        setError(''); // Clear any previous errors
    }, [input, price, setStreamList]);

    const handleAddToCart = useCallback((item) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...cart, { ...item, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${item.name} added to cart!`);
    }, []);

    return (
        <div>
            <h1>StreamList</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label htmlFor="item-name">Item Name:</label>
            <input
                type="text"
                id="item-name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter item name"
            />
            <label htmlFor="item-price">Item Price:</label>
            <input
                type="number"
                id="item-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
            />
            <button onClick={handleAdd} disabled={!input.trim() || !price.trim()}>Add Item</button>

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
