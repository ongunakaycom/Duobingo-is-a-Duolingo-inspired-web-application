import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: '/api/proxy', // Use the proxy base URL (this will go through your proxy server)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Ensure cookies are sent with requests if needed
});

// Add interceptors to handle token inclusion in requests and responses
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  
  if (token) {
    // If a token exists, add it to the Authorization header
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;  // Return modified config
}, (error) => {
  return Promise.reject(error);  // Reject the request if an error occurs
});

axiosInstance.interceptors.response.use((response) => {
  // Handle response if necessary (e.g., logging success)
  return response;  // Simply return the response object
}, (error) => {
  // Handle any response errors (e.g., show notifications or retry logic)
  console.error('Error in response:', error);
  return Promise.reject(error);  // Reject the error
});

// Make a signup request as an example
const signup = (email, password) => {
  axiosInstance.post('/auth/signup', { email, password }) // Use relative path since the baseURL already includes '/api/proxy'
    .then(response => {
      console.log('Signup successful:', response.data);
    })
    .catch(error => {
      console.error('Error signing up:', error);
    });
};

export default axiosInstance;
