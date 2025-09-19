import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://lecture-backend-k4y1.onrender.com',
  withCredentials: true, // This is crucial for sending HttpOnly cookies
});

export default api;
