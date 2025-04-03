import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Subscriptions from "./pages/Subscriptions";
import CreditCardManagement from "./components/CreditCardManagement";
import Login from "./components/Login";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  const [cart, setCart] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  const addToCart = (item) => {
  setCart((prevCart) => [...prevCart, item]);

  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={userToken ? <StreamList /> : <Navigate to="/login" />} />
          <Route path="/movies" element={userToken ? <Movies /> : <Navigate to="/login" />} />
          <Route path="/cart" element={userToken ? <Cart cart={cart} /> : <Navigate to="/login" />} />
          <Route path="/about" element={userToken ? <About /> : <Navigate to="/login" />} />
          <Route path="/subscriptions" element={userToken ? <Subscriptions addToCart={addToCart} /> : <Navigate to="/login" />} />

          <Route path="/credit-card" element={userToken ? <CreditCardManagement /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
