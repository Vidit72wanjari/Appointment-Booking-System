const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    }
}, { _id: false });

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    fee: {
        type: Number,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    totalPatients: {
        type: Number,
        default: 0
    },
    availability: {
        days: {
            type: [String],
            required: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        timeSlots: [timeSlotSchema]
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);