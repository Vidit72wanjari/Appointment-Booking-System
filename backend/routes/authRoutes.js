const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.get('/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'Auth route is working'
    });
});

router.get('/health', (req, res) => {
    res.json({
        success: true,
        timestamp: new Date().toISOString(),
        message: 'Auth service is healthy'
    });
});

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;