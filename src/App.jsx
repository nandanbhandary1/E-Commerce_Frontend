import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import api from "./api/axios";

export default function App() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const checkout = async () => {
    try {
      await api.post("/orders/", {
        items: cart.map((i) => i.id),
      });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/checkout");
    } catch {
      alert("Failed to place order. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div>
      <Navbar cartCount={cart.length} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} removeFromCart={removeFromCart} checkout={checkout} />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
