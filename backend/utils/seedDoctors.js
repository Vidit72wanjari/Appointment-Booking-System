require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

const doctorsData = [
    {
        name: "Dr. Hrithik Roshan",
        email: "hrithik@hospital.com",
        specialization: "Neurology",
        experience: 15,
        fee: 2500,
        rating: 4.9,
        totalPatients: 8000,
        availability: {
            days: ["Monday", "Wednesday", "Friday"],
            timeSlots: [
                { start: "09:00", end: "13:00" },
                { start: "16:00", end: "19:00" }
            ]
        }
    },
    {
        name: "Dr. Aishwarya Rai",
        email: "aishwarya@hospital.com",
        specialization: "Dermatology",
        experience: 12,
        fee: 3000,
        rating: 4.8,
        totalPatients: 6500,
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            timeSlots: [
                { start: "10:00", end: "14:00" },
                { start: "15:00", end: "18:00" }
            ]
        }
    },
    {
        name: "Dr. Ranveer Singh",
        email: "ranveer@hospital.com",
        specialization: "Cardiology",
        experience: 18,
        fee: 2800,
        rating: 4.7,
        totalPatients: 7200,
        availability: {
            days: ["Monday", "Tuesday", "Thursday"],
            timeSlots: [
                { start: "09:00", end: "13:00" },
                { start: "15:00", end: "18:00" }
            ]
        }
    },
    {
        name: "Dr. Priyanka Chopra",
        email: "priyanka@hospital.com",
        specialization: "Pediatrics",
        experience: 14,
        fee: 2200,
        rating: 4.9,
        totalPatients: 5500,
        availability: {
            days: ["Wednesday", "Friday", "Saturday"],
            timeSlots: [
                { start: "10:00", end: "14:00" },
                { start: "16:00", end: "19:00" }
            ]
        }
    }
];

const seedDoctors = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing doctors
        await Doctor.deleteMany({});
        console.log('✅ Cleared existing doctors');

        // Insert doctors one by one to handle any potential errors
        for (const doctor of doctorsData) {
            try {
                await Doctor.create(doctor);
                console.log(`✅ Added doctor: ${doctor.name}`);
            } catch (err) {
                console.error(`❌ Error adding doctor ${doctor.name}:`, err.message);
            }
        }

        console.log('✅ Seeding completed');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Database error:', error);
        process.exit(1);
    }
};

seedDoctors();