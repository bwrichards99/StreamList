import React, { useState, useCallback, useRef } from 'react';

function StreamList() {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [streamList, setStreamList] = useState([]);
    const [itemNameError, setItemNameError] = useState('');
    const [itemPriceError, setItemPriceError] = useState('');
    const itemNameInputRef = useRef(null);

    const validateInputs = () => {
        let isValid = true;
        if (!itemName.trim()) {
            setItemNameError('Please enter an item name.');
            isValid = false;
        } else {
            setItemNameError('');
        }

        if (!itemPrice.trim()) {
            setItemPriceError('Please enter a price.');
            isValid = false;
        } else if (isNaN(parseFloat(itemPrice))) {
            setItemPriceError('Please enter a valid number for the price.');
            isValid = false;
        } else {
            setItemPriceError('');
        }
        return isValid;
    };

    const handleAddItem = useCallback(() => {
        if (!validateInputs()) {
            return;
        }

        setStreamList(prevStreamList => [...prevStreamList, { name: itemName, price: parseFloat(itemPrice) }]);
        setItemName('');
        setItemPrice('');
        setItemNameError('');
        setItemPriceError('');

        if (itemNameInputRef.current) {
            itemNameInputRef.current.focus();
        }

    }, [itemName, itemPrice, setStreamList]);

    const handleAddToCart = useCallback((item) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...cart, { ...item, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${item.name} added to cart!`);
    }, []);

    const clearItemNameError = () => {
        setItemNameError('');
    };

    const clearItemPriceError = () => {
        setItemPriceError('');
    };

    return (
        <div>
            <h1>StreamList</h1>

            <label htmlFor="item-name">Item Name:</label>
            <input
                type="text"
                id="item-name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                aria-invalid={!!itemNameError}
                onFocus={clearItemNameError}
                ref={itemNameInputRef}
            />
            {itemNameError && <p style={{ color: 'red' }}>{itemNameError}</p>}

            <label htmlFor="item-price">Item Price:</label>
            <input
                type="number"
                id="item-price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="Enter price"
                aria-invalid={!!itemPriceError}
                onFocus={clearItemPriceError}
            />
            {itemPriceError && <p style={{ color: 'red' }}>{itemPriceError}</p>}

            <button onClick={handleAddItem} disabled={!itemName.trim() || !itemPrice.trim()}>Add Item</button>

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
