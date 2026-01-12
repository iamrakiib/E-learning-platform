import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add client ID for chatbot
      const clientId = localStorage.getItem('chatbot_client_id');
      if (clientId) {
        config.headers['x-client-id'] = clientId;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      
      // Handle unauthorized - redirect to login
      if (status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      // Handle forbidden
      if (status === 403) {
        console.error('Access forbidden');
      }
      
      // Handle server errors
      if (status >= 500) {
        console.error('Server error occurred');
      }
    } else if (error.request) {
      console.error('Network error - no response received');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Helper function for SSR requests (no localStorage access)
export const createServerAxios = (token?: string) => {
  const serverAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  
  return serverAxios;
};
