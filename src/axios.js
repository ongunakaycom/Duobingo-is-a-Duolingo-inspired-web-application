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
  timeout: 15000, // 15s — prevents silent hangs (Vercel functions cap at 10s)
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
// Response Interceptor — Detailed error logging + 401 handling
// =============================
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;

    // Safely parse the outgoing payload (axios stores it as a JSON string)
    let requestPayload = null;
    try {
      requestPayload = err?.config?.data ? JSON.parse(err.config.data) : null;
    } catch {
      requestPayload = err?.config?.data ?? null;
    }

    const errorInfo = {
      status,
      statusText: err?.response?.statusText,
      method: err?.config?.method?.toUpperCase(),
      url: err?.config?.url,
      requestPayload,                        // What we sent
      responseData: err?.response?.data,     // What the backend returned
      message: err?.message,
    };

    // Print as a pretty string so Chrome shows the full content without collapsing
    console.error('❌ AXIOS ERROR DETAILS:', JSON.stringify(errorInfo, null, 2));

    // 401 → token expired/invalid. Clear it so the user gets redirected to login.
    if (status === 401) {
      console.warn('🔒 Unauthorized — clearing token and redirecting to login.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optional: redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(err);
  }
);

// =============================
// Auth API
// =============================
const signUp = (email, password) =>
  axiosInstance.post('/auth/signup', { email, password }).then((res) => {
    localStorage.setItem('token', res.data.token);
    if (res.data.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  });

const login = (email, password) =>
  axiosInstance.post('/auth/login', { email, password }).then((res) => {
    localStorage.setItem('token', res.data.token);
    if (res.data.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  });

// =============================
// AI API
// =============================
const evaluateAnswer = (sentence, targetRule = 'general') =>
  axiosInstance
    .post('/ai/evaluate-answer', { sentence, targetRule })
    .then((res) => res.data);

// =============================
// Lessons API
// =============================
const lessonsApi = {
  getAll: () => axiosInstance.get('/lessons').then((res) => res.data),
  getById: (id) =>
    axiosInstance.get('/lessons', { params: { lessonId: id } }).then((res) => res.data),
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