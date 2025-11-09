import axios from 'axios';

// Use Vite env variable if provided (VITE_API_URL), otherwise use the dev proxy at '/api'
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const signup = (userData) => API.post('/auth/signup', userData);
export const login = (userData) => API.post('/auth/login', userData);

// Doctor APIs
export const getAllDoctors = () => API.get('/doctors');
export const getDoctorById = (id) => API.get(`/doctors/${id}`);

// Appointment APIs
export const createAppointment = (appointmentData) => API.post('/appointments', appointmentData);
export const getMyAppointments = () => API.get('/appointments/my-appointments');

export default API;