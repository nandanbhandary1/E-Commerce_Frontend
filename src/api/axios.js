// src/api/axios.js
import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ?? "", // e.g. http://localhost:8000
//   headers: { "Content-Type": "application/json" },
// });

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("access");
      // optional: remove refresh, user etc.
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;




