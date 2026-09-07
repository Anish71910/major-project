import axios from "axios";

// Single shared axios instance for all API calls.
// The token is attached automatically once the user logs in (see AuthContext).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default api;
