import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">🛍️ Sepnoty</div>
      <div className="links">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
