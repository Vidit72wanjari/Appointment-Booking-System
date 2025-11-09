const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        console.log('📝 Signup request received:', { body: req.body });
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.log('❌ Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        console.log('🔍 Checking for existing user with email:', email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('❌ Email already exists');
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        console.log('🔒 Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('👤 Creating new user...');
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log('🔑 Generating token...');
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        console.log('✅ User created successfully:', user._id);
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            }
        });

    } catch (error) {
        console.error('💥 Signup error:', error.message);
        console.error('📊 Error details:', error);
        res.status(500).json({
            success: false,
            message: 'Error in signup: ' + error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in login'
        });
    }
};