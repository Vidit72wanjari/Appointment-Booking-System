import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Add user ID for appointment requests (demo purposes)
    config.headers['user-id'] = '507f1f77bcf86cd799439011';
    return config;
});

export default api;