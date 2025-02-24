// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://duolingo-vue-backend.vercel.app/', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
  }
  return config;
});

export default axiosInstance;
