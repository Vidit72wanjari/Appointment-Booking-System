require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Doctor Appointment Booking API',
        endpoints: {
            auth: '/api/auth',
            doctors: '/api/doctors',
            appointments: '/api/appointments',
            health: '/health'
        }
    });
});

const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ MongoDB Connected');
            return true;
        } catch (error) {
            console.error(`❌ Connection attempt failed. Retries left: ${retries-1}`);
            retries -= 1;
            if (retries === 0) throw error;
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const startServer = async () => {
    try {
        // Debug environment variables
        console.log('🔍 Environment Variables Check:');
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('PORT:', process.env.PORT);
        console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
        console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
        
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set');
        }
        
        await connectDB();
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`✅ API Documentation: http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();