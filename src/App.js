import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Subscriptions from "./pages/Subscriptions";
import list from "./data"; // 

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscriptions" element={<Subscriptions addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
