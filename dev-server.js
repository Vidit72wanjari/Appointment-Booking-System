const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5001;

// MongoDB configuration
const MONGODB_URI = 'mongodb+srv://Vidit:Vidit%40123@cluster0.biw23mt.mongodb.net/appointmentDB';
const JWT_SECRET = 'your-secret-key-here-make-it-long-and-secure';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
let db;

console.log('🔄 Connecting to MongoDB...');
console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@'));

MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('✅ Connected to MongoDB');
    db = client.db();
    
    // Seed doctors if needed
    seedDoctors();
    
    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Development server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ MongoDB connection error:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  });

// Seed doctors function
async function seedDoctors() {
  try {
    const doctors = db.collection('doctors');
    const count = await doctors.countDocuments();
    
    if (count === 0) {
      console.log('🌱 Seeding doctors...');
      const doctorList = [
        {
          name: "Salman Khan",
          email: "salman@medicareplus.com",
          specialization: "Cardiology",
          experience: 15,
          fee: 2500,
          consultationFee: 2500,
          rating: 4.8,
          totalPatients: 1200,
          phone: "+91-9876543210",
          availability: {
            days: ["Monday", "Wednesday", "Friday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Shah Rukh Khan",
          email: "shahrukh@medicareplus.com",
          specialization: "Dermatology",
          experience: 18,
          fee: 3000,
          consultationFee: 3000,
          rating: 4.9,
          totalPatients: 1500,
          phone: "+91-9876543211",
          availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aamir Khan",
          email: "aamir@medicareplus.com",
          specialization: "Orthopedics",
          experience: 20,
          fee: 3500,
          consultationFee: 3500,
          rating: 4.7,
          totalPatients: 1800,
          phone: "+91-9876543212",
          availability: {
            days: ["Monday", "Tuesday", "Thursday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Akshay Kumar",
          email: "akshay@medicareplus.com",
          specialization: "General Medicine",
          experience: 12,
          fee: 2000,
          consultationFee: 2000,
          rating: 4.6,
          totalPatients: 900,
          phone: "+91-9876543213",
          availability: {
            days: ["Monday", "Wednesday", "Friday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hrithik Roshan",
          email: "hrithik@medicareplus.com",
          specialization: "Neurology",
          experience: 14,
          fee: 4000,
          consultationFee: 4000,
          rating: 4.9,
          totalPatients: 1100,
          phone: "+91-9876543214",
          availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ranveer Singh",
          email: "ranveer@medicareplus.com",
          specialization: "Pediatrics",
          experience: 10,
          fee: 2200,
          consultationFee: 2200,
          rating: 4.5,
          totalPatients: 800,
          phone: "+91-9876543215",
          availability: {
            days: ["Monday", "Wednesday", "Friday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
          email: "sarah@hospital.com",
          specialization: "Dermatology",
          experience: 12,
          fee: 1800,
          rating: 4.9,
          totalPatients: 800,
          availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Dr. Michael Brown",
          email: "michael@hospital.com",
          specialization: "Neurology",
          experience: 20,
          fee: 2500,
          rating: 4.7,
          totalPatients: 1500,
          availability: {
            days: ["Monday", "Tuesday", "Thursday"],
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await doctors.insertMany(doctorList);
      console.log('✅ Doctors seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding doctors:', error);
  }
}

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Development server is running' });
});

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = db.collection('users');
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await users.insertOne(newUser);
    const token = jwt.sign(
      { userId: result.insertedId, email: email, name: name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

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
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = db.collection('users');
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

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
});

// Doctor Routes
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = db.collection('doctors');
    const doctorList = await doctors.find({ isAvailable: true }).toArray();
    res.json(doctorList);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = db.collection('doctors');
    const doctor = await doctors.findOne({ _id: new ObjectId(id) });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Appointment Routes
app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { doctorId, patientName, appointmentDate, timeSlot, reason } = req.body;
    const userId = req.user.userId;

    if (!doctorId || !patientName || !appointmentDate || !timeSlot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if doctor exists
    const doctors = db.collection('doctors');
    const doctor = await doctors.findOne({ _id: new ObjectId(doctorId) });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if time slot is available
    const appointments = db.collection('appointments');
    const existingAppointment = await appointments.findOne({
      doctorId: new ObjectId(doctorId),
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    const newAppointment = {
      doctorId: new ObjectId(doctorId),
      userId: new ObjectId(userId),
      doctorName: doctor.name,
      patientName,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      reason: reason || 'General consultation',
      status: 'confirmed',
      fee: doctor.fee,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await appointments.insertOne(newAppointment);
    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: { ...newAppointment, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/appointments/my-appointments', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointments = db.collection('appointments');
    const userAppointments = await appointments.find({ 
      userId: new ObjectId(userId) 
    }).sort({ appointmentDate: -1 }).toArray();
    
    res.json(userAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const appointments = db.collection('appointments');
    const result = await appointments.deleteOne({ 
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = db.collection('users');
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await users.insertOne(newUser);
    const token = jwt.sign(
      { userId: result.insertedId, email: email, name: name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

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
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = db.collection('users');
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

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
});

// Doctor Routes
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = db.collection('doctors');
    let doctorsList = await doctors.find({}).toArray();

    if (doctorsList.length === 0) {
      const sampleDoctors = [
        {
          name: 'Dr. John Smith',
          specialization: 'Cardiology',
          experience: '10 years',
          location: 'New York',
          consultationFee: 150,
          rating: 4.8,
          availability: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']
        },
        {
          name: 'Dr. Sarah Johnson',
          specialization: 'Dermatology',
          experience: '8 years',
          location: 'Los Angeles',
          consultationFee: 120,
          rating: 4.9,
          availability: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM']
        },
        {
          name: 'Dr. Michael Brown',
          specialization: 'Neurology',
          experience: '12 years',
          location: 'Chicago',
          consultationFee: 180,
          rating: 4.7,
          availability: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
        },
        {
          name: 'Dr. Emily Davis',
          specialization: 'Pediatrics',
          experience: '6 years',
          location: 'Houston',
          consultationFee: 100,
          rating: 4.8,
          availability: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM']
        }
      ];

      await doctors.insertMany(sampleDoctors);
      doctorsList = sampleDoctors;
    }

    res.json(doctorsList);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = db.collection('doctors');
    const doctor = await doctors.findOne({ _id: new ObjectId(id) });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ data: doctor });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Appointment Routes
app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { doctor, date, timeSlot, symptoms } = req.body;

    if (!doctor || !date || !timeSlot || !symptoms) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const doctors = db.collection('doctors');
    const appointments = db.collection('appointments');
    
    const doctorDetails = await doctors.findOne({ _id: new ObjectId(doctor) });
    if (!doctorDetails) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const newAppointment = {
      userId: new ObjectId(req.user.userId),
      userEmail: req.user.email,
      userName: req.user.name,
      doctorId: new ObjectId(doctor),
      doctorName: doctorDetails.name,
      specialization: doctorDetails.specialization,
      date,
      timeSlot,
      symptoms,
      status: 'scheduled',
      createdAt: new Date()
    };

    const result = await appointments.insertOne(newAppointment);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: {
        id: result.insertedId,
        ...newAppointment
      }
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/appointments/my-appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = db.collection('appointments');
    const userAppointments = await appointments
      .find({ userId: new ObjectId(req.user.userId) })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(userAppointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Development server is running' });
});

// Server will be started after MongoDB connection is established