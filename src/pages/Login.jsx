import React, { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Correct DRF JWT endpoint
      const res = await api.post("/api/token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      alert("Logged in successfully!");

      // Redirect to products page
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="login-container">
      <h2>Sign in</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign in</button>
      </form>
      <p className="hint">Use seeded admin: admin / Admin@12345</p>
    </div>
  );
}
