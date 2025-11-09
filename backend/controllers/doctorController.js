// Doctor Controller
// Created by: Vidit Wanjari

const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-__v');
    console.log('Fetched doctors:', doctors); // Debug log
    
    res.status(200).json({
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
};

// @desc    Create a new doctor
// @route   POST /api/doctors
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, email } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      experience,
      email
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor
    });
  } catch (error) {
    console.error("Create Doctor Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating doctor"
    });
  }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor details'
    });
  }
};
