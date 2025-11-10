import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, removeFromCart, checkout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image || "/placeholder.png"} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{total.toFixed(2)}</h3>
          <button onClick={checkout}>Checkout</button>
          <Link to="/">Continue Shopping</Link>
        </div>
      )}
    </div>
  );
}
