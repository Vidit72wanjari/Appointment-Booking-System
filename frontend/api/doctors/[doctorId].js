import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://Vidit:Vidit%40123@cluster0.biw23mt.mongodb.net/appointmentDB';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { doctorId } = req.query;
    
    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();
    const doctors = db.collection('doctors');

    // Get doctor by ID
    const doctor = await doctors.findOne({ _id: new ObjectId(doctorId) });
    
    if (!doctor) {
      await client.close();
      return res.status(404).json({ message: 'Doctor not found' });
    }

    await client.close();
    res.status(200).json({ data: doctor });

  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}