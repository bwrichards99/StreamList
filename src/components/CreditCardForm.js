import React, { useState } from 'react';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCardNumber(cardNumber)) {
      const cardData = {
        cardNumber,
        cardHolder,
        expiryDate,
        cvv,
      };
      localStorage.setItem('creditCard', JSON.stringify(cardData));
      alert('Credit card information saved successfully!');
    } else {
      alert('Invalid card number format. Please use 1234 5678 9012 3456.');
    }
  };

  const validateCardNumber = (number) => {
    const regex = /^\d{4} \d{4} \d{4} \d{4}$/; // Format: 1234 5678 9012 3456
    return regex.test(number);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Card Holder Name:</label>
        <input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      <div>
        <label>Expiry Date:</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          required
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Card</button>
    </form>
  );
};

export default CreditCardForm;
