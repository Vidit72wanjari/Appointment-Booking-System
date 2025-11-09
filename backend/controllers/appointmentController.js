const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

exports.createAppointment = async (req, res) => {
    try {
        const { doctor: doctorId, date, timeSlot, symptoms } = req.body;

        // Validate required fields
        if (!doctorId || !date || !timeSlot || !symptoms) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Check if appointment slot is already taken
        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            date: new Date(date),
            timeSlot: timeSlot,
            status: { $in: ['pending', 'confirmed'] }
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: 'This time slot is already booked'
            });
        }

        // Create appointment
        const appointment = await Appointment.create({
            doctor: doctorId,
            patient: req.user._id,
            date: new Date(date),
            timeSlot,
            symptoms,
            status: 'pending'
        });

        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate('doctor', 'name specialization fee')
            .populate('patient', 'name email');

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            data: populatedAppointment
        });
    } catch (error) {
        console.error('Appointment creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating appointment'
        });
    }
};

exports.getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id })
            .populate('doctor', 'name specialization fee')
            .populate('patient', 'name email')
            .sort('-date');

        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments'
        });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        
        // Find appointment and verify it belongs to the current user
        const appointment = await Appointment.findOne({
            _id: appointmentId,
            patient: req.user._id
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        if (appointment.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Appointment is already cancelled'
            });
        }

        if (appointment.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel completed appointment'
            });
        }

        // Update appointment status to cancelled
        appointment.status = 'cancelled';
        await appointment.save();

        res.status(200).json({
            success: true,
            message: 'Appointment cancelled successfully',
            data: appointment
        });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling appointment'
        });
    }
};
