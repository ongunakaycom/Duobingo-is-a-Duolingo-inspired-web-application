import axios from 'axios';

// Create an axios instance to centralize API requests
const axiosInstance = axios.create({
  baseURL: 'https://duolingo-vue-backend.vercel.app', // Set the correct backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure cookies are sent with requests if needed
});

// Request interceptor: Attach JWT token (if available) to request headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  
  if (token) {
    // Attach token to Authorization header if it exists
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;  // Return modified config
}, (error) => {
  return Promise.reject(error);  // Reject request on error
});

// Response interceptor: Optionally handle responses globally
axiosInstance.interceptors.response.use((response) => {
  return response;  // Return successful response
}, (error) => {
  console.error('Error in response:', error);  // Handle response errors globally
  return Promise.reject(error);  // Reject on error
});

// Sign-up function to handle user registration
const signUp = (email, password) => {
  return axiosInstance.post('/auth/signup', { email, password })
    .then(response => {
      console.log('Signup successful:', response.data);
      // Optionally, save the token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data; // Return the response data (can be used in components)
    })
    .catch(error => {
      console.error('Error signing up:', error.response?.data || error);
      throw error; // Re-throw the error to be handled by the component
    });
};

// Login function to handle user authentication
const login = (email, password) => {
  return axiosInstance.post('/auth/login', { email, password })
    .then(response => {
      console.log('Login successful:', response.data);
      // Optionally, save the token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data; // Return the response data (can be used in components)
    })
    .catch(error => {
      console.error('Error logging in:', error.response?.data || error);
      throw error; // Re-throw the error to be handled by the component
    });
};

// Export axios instance and helper functions
export { axiosInstance, signUp, login };
