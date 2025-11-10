import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load products. Check backend or CORS.");
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, status: "Pending" }]);
  };

  const updateStatus = (id, newStatus) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image || "/placeholder.png"} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <strong>{item.name}</strong> — ₹{item.price} —{" "}
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
            <select
              value={item.status}
              onChange={(e) => updateStatus(item.id, e.target.value)}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}
