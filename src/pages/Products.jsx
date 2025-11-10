import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  api.get("/products/") // ← change this to your real endpoint if needed
    .then((res) => setProducts(res.data))
    .catch((err) => console.error("Error fetching products:", err));
}, []);

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name}
                className="product-img"
              />
              <h3>{p.name}</h3>
              <p>{p.category}</p>
              <p>₹{p.price}</p>
              <p>Stock: {p.stock}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
