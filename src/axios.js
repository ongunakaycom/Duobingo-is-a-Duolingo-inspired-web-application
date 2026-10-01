// src/axios.js
import axios from 'axios';

// =============================
// Axios Instance
// =============================
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'https://duolingo-vue-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// =============================
// Request Interceptor — JWT ekle
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
// Response Interceptor — Merkezi hata log
// =============================
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('❌ Axios error:', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

// =============================
// Auth Endpoints
// =============================
const authApi = {
  signUp: (email, password) =>
    axiosInstance
      .post('/auth/signup', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        return res.data;
      }),

  login: (email, password) =>
    axiosInstance
      .post('/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        return res.data;
      }),

  logout: () => {
    localStorage.removeItem('token');
  },
};

// =============================
// AI Endpoints
// =============================
const aiApi = {
  evaluateAnswer: (sentence, targetRule = 'general') =>
    axiosInstance
      .post('/ai/evaluate-answer', { sentence, targetRule })
      .then((res) => res.data),
};

// =============================
// Exports
// =============================
// Backward-compatible exports (eski kod bozulmasın)
const signUp = authApi.signUp;
const login = authApi.login;
const evaluateAnswer = aiApi.evaluateAnswer;

export {
  axiosInstance,
  // Eski API (backward compatible)
  signUp,
  login,
  evaluateAnswer,
  // Yeni API (namespaced)
  authApi,
  aiApi,
};

export default axiosInstance;