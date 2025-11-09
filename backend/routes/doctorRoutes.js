const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all available doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find({ isAvailable: true })
            .select('-__v')
            .sort({ rating: -1 });

        res.json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching doctors'
        });
    }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select('-__v');
        
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        res.json({
            success: true,
            data: doctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching doctor details'
        });
    }
});

module.exports = router;