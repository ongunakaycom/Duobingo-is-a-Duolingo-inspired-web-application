import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://duolingo-vue-backend.vercel.app/api', // Backend API base
  headers: {
    'Content-Type': 'application/json',
  },
  // No withCredentials needed for JWT
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('❌ Axios error:', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

const signUp = (email, password) =>
  axiosInstance.post('/auth/signup', { email, password }).then((res) => {
    localStorage.setItem('token', res.data.token);
    return res.data;
  });

const login = (email, password) =>
  axiosInstance.post('/auth/login', { email, password }).then((res) => {
    localStorage.setItem('token', res.data.token);
    return res.data;
  });

export { axiosInstance, signUp, login };
