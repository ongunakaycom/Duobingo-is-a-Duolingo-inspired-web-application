// axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://duolingo-clone-server.vercel.app/api/proxy', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config; 
});

export default axiosInstance;
