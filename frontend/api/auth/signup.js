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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      await client.close();
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await users.insertOne(newUser);

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: result.insertedId, 
        email: email,
        name: name 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    await client.close();

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.insertedId,
        name,
        email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}