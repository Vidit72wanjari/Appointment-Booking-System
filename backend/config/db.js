const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true 
});

router.post('/auth/signup', signup);
router.post('/auth/login', login);

module.exports = {
    connectDB,
    User: mongoose.model('User', userSchema),
    authRouter: router
};
