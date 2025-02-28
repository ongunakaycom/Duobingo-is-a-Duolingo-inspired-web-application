import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://duolingo-vue-backend.vercel.app/', // ✅ Backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Ensures authentication & cookies work across domains
});

// Add a request interceptor to attach the token (if any)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  // ✅ Include Authorization token if available
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
