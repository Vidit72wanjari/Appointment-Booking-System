require('dotenv').config();
const http = require('http');

// Test signup endpoint
const testSignup = () => {
    const postData = JSON.stringify({
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/signup',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Signup Response Status:', res.statusCode);
            console.log('Signup Response:', data);
        });
    });

    req.on('error', (e) => {
        console.error('Signup Error:', e.message);
    });

    req.write(postData);
    req.end();
};

// Test health endpoint first
const testHealth = () => {
    http.get('http://localhost:5000/health', (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('Health Response:', data);
            // If health works, test signup
            setTimeout(testSignup, 1000);
        });
    }).on('error', (err) => {
        console.error('Health Error:', err.message);
    });
};

testHealth();