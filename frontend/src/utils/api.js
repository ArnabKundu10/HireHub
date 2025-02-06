// src/utils/api.js
import axios from "axios";
const apiurl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL: apiurl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
