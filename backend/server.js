require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const Appointment = require('./models/Appointment');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Simple doctors route
app.get('/api/doctors', (req, res) => {
    const doctors = [
        {
            _id: '1',
            name: 'Salman Khan',
            specialization: 'Cardiology',
            experience: 15,
            consultationFee: 2500,
            email: 'salman@medicareplus.com',
            phone: '+91-9876543210'
        },
        {
            _id: '2',
            name: 'Shah Rukh Khan',
            specialization: 'Dermatology',
            experience: 18,
            consultationFee: 3000,
            email: 'shahrukh@medicareplus.com',
            phone: '+91-9876543211'
        },
        {
            _id: '3',
            name: 'Aamir Khan',
            specialization: 'Orthopedics',
            experience: 20,
            consultationFee: 3500,
            email: 'aamir@medicareplus.com',
            phone: '+91-9876543212'
        },
        {
            _id: '4',
            name: 'Akshay Kumar',
            specialization: 'General Medicine',
            experience: 12,
            consultationFee: 2000,
            email: 'akshay@medicareplus.com',
            phone: '+91-9876543213'
        },
        {
            _id: '5',
            name: 'Hrithik Roshan',
            specialization: 'Neurology',
            experience: 14,
            consultationFee: 4000,
            email: 'hrithik@medicareplus.com',
            phone: '+91-9876543214'
        },
        {
            _id: '6',
            name: 'Ranveer Singh',
            specialization: 'Pediatrics',
            experience: 10,
            consultationFee: 2200,
            email: 'ranveer@medicareplus.com',
            phone: '+91-9876543215'
        }
    ];
    res.json(doctors);
});

app.get('/api/doctors/:id', (req, res) => {
    const doctors = [
        {
            _id: '1',
            name: 'Salman Khan',
            specialization: 'Cardiology',
            experience: 15,
            consultationFee: 2500,
            email: 'salman@medicareplus.com',
            phone: '+91-9876543210'
        },
        {
            _id: '2',
            name: 'Shah Rukh Khan',
            specialization: 'Dermatology',
            experience: 18,
            consultationFee: 3000,
            email: 'shahrukh@medicareplus.com',
            phone: '+91-9876543211'
        },
        {
            _id: '3',
            name: 'Aamir Khan',
            specialization: 'Orthopedics',
            experience: 20,
            consultationFee: 3500,
            email: 'aamir@medicareplus.com',
            phone: '+91-9876543212'
        },
        {
            _id: '4',
            name: 'Akshay Kumar',
            specialization: 'General Medicine',
            experience: 12,
            consultationFee: 2000,
            email: 'akshay@medicareplus.com',
            phone: '+91-9876543213'
        },
        {
            _id: '5',
            name: 'Hrithik Roshan',
            specialization: 'Neurology',
            experience: 14,
            consultationFee: 4000,
            email: 'hrithik@medicareplus.com',
            phone: '+91-9876543214'
        },
        {
            _id: '6',
            name: 'Ranveer Singh',
            specialization: 'Pediatrics',
            experience: 10,
            consultationFee: 2200,
            email: 'ranveer@medicareplus.com',
            phone: '+91-9876543215'
        }
    ];
    const doctor = doctors.find(d => d._id === req.params.id);
    res.json(doctor || {});
});

// MongoDB-based appointments routes
app.post('/api/appointments', async (req, res) => {
    try {
        const { doctorId, patientName, appointmentDate, timeSlot, reason } = req.body;
        
        const doctors = [
            { _id: '1', name: 'Salman Khan', specialization: 'Cardiology', consultationFee: 2500 },
            { _id: '2', name: 'Shah Rukh Khan', specialization: 'Dermatology', consultationFee: 3000 },
            { _id: '3', name: 'Aamir Khan', specialization: 'Orthopedics', consultationFee: 3500 },
            { _id: '4', name: 'Akshay Kumar', specialization: 'General Medicine', consultationFee: 2000 },
            { _id: '5', name: 'Hrithik Roshan', specialization: 'Neurology', consultationFee: 4000 },
            { _id: '6', name: 'Ranveer Singh', specialization: 'Pediatrics', consultationFee: 2200 }
        ];
        
        const doctor = doctors.find(d => d._id === doctorId);
        
        // Get user ID from headers (in a real app, from JWT token)
        const userId = req.headers['user-id'] || '507f1f77bcf86cd799439011'; // Default for demo
        
        const appointment = new Appointment({
            doctorId: doctorId,
            doctorName: doctor ? doctor.name : 'Unknown Doctor',
            specialization: doctor ? doctor.specialization : 'General',
            consultationFee: doctor ? doctor.consultationFee : 0,
            patientName,
            patientId: userId,
            appointmentDate: new Date(appointmentDate),
            timeSlot,
            reason,
            status: 'confirmed'
        });
        
        const savedAppointment = await appointment.save();
        
        res.json({ 
            success: true, 
            message: 'Appointment booked successfully',
            appointment: savedAppointment
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to book appointment',
            error: error.message 
        });
    }
});

app.get('/api/appointments/my', async (req, res) => {
    try {
        // Get user ID from headers (in a real app, from JWT token)
        const userId = req.headers['user-id'] || '507f1f77bcf86cd799439011'; // Default for demo
        
        const appointments = await Appointment.find({ patientId: userId })
            .sort({ appointmentDate: 1, timeSlot: 1 });
        
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch appointments',
            error: error.message 
        });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Authentication API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});