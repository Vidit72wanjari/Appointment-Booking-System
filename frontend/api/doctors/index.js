import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://Vidit:Vidit%40123@cluster0.biw23mt.mongodb.net/appointmentDB';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();
    const doctors = db.collection('doctors');

    // Get all doctors
    const doctorsList = await doctors.find({}).toArray();

    // If no doctors exist, create some sample doctors
    if (doctorsList.length === 0) {
      const sampleDoctors = [
        {
          name: 'Dr. John Smith',
          specialization: 'Cardiology',
          experience: '10 years',
          location: 'New York',
          consultationFee: 150,
          rating: 4.8,
          availability: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
          user: {
            name: 'Dr. John Smith',
            email: 'john.smith@hospital.com'
          },
          fee: 150
        },
        {
          name: 'Dr. Sarah Johnson',
          specialization: 'Dermatology',
          experience: '8 years',
          location: 'Los Angeles',
          consultationFee: 120,
          rating: 4.9,
          availability: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
          user: {
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@hospital.com'
          },
          fee: 120
        },
        {
          name: 'Dr. Michael Brown',
          specialization: 'Neurology',
          experience: '12 years',
          location: 'Chicago',
          consultationFee: 180,
          rating: 4.7,
          availability: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
          user: {
            name: 'Dr. Michael Brown',
            email: 'michael.brown@hospital.com'
          },
          fee: 180
        },
        {
          name: 'Dr. Emily Davis',
          specialization: 'Pediatrics',
          experience: '6 years',
          location: 'Houston',
          consultationFee: 100,
          rating: 4.8,
          availability: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
          user: {
            name: 'Dr. Emily Davis',
            email: 'emily.davis@hospital.com'
          },
          fee: 100
        }
      ];

      await doctors.insertMany(sampleDoctors);
      await client.close();
      return res.status(200).json(sampleDoctors);
    }

    await client.close();
    res.status(200).json(doctorsList);

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}