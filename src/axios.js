import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://duolingo-vue-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  // Removed withCredentials — only needed for cookies
});

// Request interceptor: attach token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: log global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Axios error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Helper auth functions
const signUp = (email, password) =>
  axiosInstance.post('/auth/signup', { email, password })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      return res.data;
    });

const login = (email, password) =>
  axiosInstance.post('/auth/login', { email, password })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      return res.data;
    });

export { axiosInstance, signUp, login };
