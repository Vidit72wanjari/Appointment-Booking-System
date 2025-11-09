import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const MONGODB_URI = 'mongodb+srv://Vidit:Vidit%40123@cluster0.biw23mt.mongodb.net/appointmentDB';
const JWT_SECRET = 'your-secret-key-here-make-it-long-and-secure';

export default async function handler(req, res) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();

    if (req.method === 'POST') {
      // Create appointment
      const { doctorId, doctorName, specialization, date, time, notes } = req.body;

      if (!doctorId || !doctorName || !date || !time) {
        await client.close();
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const appointments = db.collection('appointments');
      
      const newAppointment = {
        userId: new ObjectId(decoded.userId),
        userEmail: decoded.email,
        userName: decoded.name,
        doctorId: new ObjectId(doctorId),
        doctorName,
        specialization,
        date,
        time,
        notes: notes || '',
        status: 'scheduled',
        createdAt: new Date()
      };

      const result = await appointments.insertOne(newAppointment);
      await client.close();

      res.status(201).json({
        message: 'Appointment booked successfully',
        appointment: {
          id: result.insertedId,
          ...newAppointment
        }
      });

    } else if (req.method === 'GET') {
      // Get user's appointments
      const appointments = db.collection('appointments');
      const userAppointments = await appointments
        .find({ userId: new ObjectId(decoded.userId) })
        .sort({ createdAt: -1 })
        .toArray();

      await client.close();
      res.status(200).json(userAppointments);

    } else {
      await client.close();
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Appointments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}