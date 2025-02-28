import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://duolingo-clone-server.vercel.app/api/proxy', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure cookies or other credentials are sent with requests
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config; 
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  // Handle response if necessary (e.g., log success)
  return response;
}, (error) => {
  // Handle response error (e.g., show notification or retry logic)
  return Promise.reject(error);
});

export default axiosInstance;
