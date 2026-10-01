// src/axios.js
import axios from 'axios';

// =============================
// Axios Instance
// =============================
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://duolingo-vue-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// =============================
// Request Interceptor — JWT
// =============================
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

// =============================
// Response Interceptor — Hata log
// =============================
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('❌ Axios error:', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

// =============================
// Auth API
// =============================
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

// =============================
// AI API
// =============================
const evaluateAnswer = (sentence, targetRule = 'general') =>
  axiosInstance.post('/ai/evaluate-answer', { sentence, targetRule }).then((res) => res.data);

// =============================
// Lessons API
// =============================
const lessonsApi = {
  getAll: () => axiosInstance.get('/lessons').then((res) => res.data),
  getById: (id) => axiosInstance.get(`/lessons?lessonId=${id}`).then((res) => res.data),
};

// =============================
// Progress API
// =============================
const progressApi = {
  get: () => axiosInstance.get('/progress').then((res) => res.data),
  update: (payload) => axiosInstance.post('/progress', payload).then((res) => res.data),
};

// =============================
// Exports
// =============================
export {
  axiosInstance,
  signUp,
  login,
  evaluateAnswer,
  lessonsApi,
  progressApi,
};

export default axiosInstance;