import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const MONGODB_URI = 'mongodb+srv://Vidit:Vidit%40123@cluster0.biw23mt.mongodb.net/appointmentDB';
const JWT_SECRET = 'your-secret-key-here-make-it-long-and-secure';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      await client.close();
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await client.close();
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        name: user.name 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    await client.close();

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}