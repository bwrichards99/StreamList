import React, { useState, useEffect } from "react";
import { Container, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete"; // Import a delete icon

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Handle removing an item from the cart
  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cart.filter(item => item.id !== itemToRemove.id); // Remove the item by id
    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  // Calculate the total price of the cart
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <div>
          <h2>Your Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveItem(item)} // Remove item on click
                >
                  <DeleteIcon /> {/* Delete icon */}
                </IconButton>
              </li>
            ))}
          </ul>
          {/* Display total price */}
          <Typography variant="h6" gutterBottom>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </div>
      )}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/credit-card")} 
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
}

export default Cart;



