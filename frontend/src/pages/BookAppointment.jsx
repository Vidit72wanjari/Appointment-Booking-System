// Book Appointment Page

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    symptoms: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
  ];

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      const response = await api.get(`/doctors/${doctorId}`);
      setDoctor(response.data.data);
    } catch (error) {
      setError('Doctor not found');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form data
    if (!formData.date || !formData.timeSlot || !formData.symptoms) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Please select a future date');
      return;
    }

    // Validate symptoms length
    if (formData.symptoms.trim().length < 10) {
      setError('Please provide more detailed symptoms (at least 10 characters)');
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.post('/appointments', {
        doctor: doctorId,
        ...formData
      });
      
      setSuccess('🎉 Appointment booked successfully! You will be redirected to your appointments in 3 seconds...');
      
      // Clear form
      setFormData({
        date: '',
        timeSlot: '',
        symptoms: ''
      });
      
      setTimeout(() => navigate('/my-appointments'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '50px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container" style={{ paddingTop: '50px' }}>
        <div className="card">
          <h2 style={{ color: '#e53e3e' }}>Doctor not found</h2>
          <button onClick={() => navigate('/doctors')} className="btn btn-primary">
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px', paddingTop: '50px' }}>
      <div className="card">
        <button onClick={() => navigate('/doctors')} className="btn" style={{ marginBottom: '20px' }}>
          ← Back
        </button>
        
        <h1>Book Appointment</h1>
        <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2>{doctor.name}</h2>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Fee:</strong> ₹{doctor.fee}</p>
        </div>

        {error && (
          <div style={{ 
            background: '#fed7d7', 
            color: '#c53030', 
            padding: '12px', 
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            background: '#c6f6d5', 
            color: '#22543d', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '20px',
            border: '2px solid #48bb78',
            fontSize: '16px',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ opacity: success ? 0.5 : 1, pointerEvents: success ? 'none' : 'auto' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Select Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            disabled={submitting || success}
          />

          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Select Time Slot
          </label>
          <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required disabled={submitting || success}>
            <option value="">Choose a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>

          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Describe Your Symptoms
          </label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            rows="4"
            placeholder="Please describe your symptoms..."
            required
            disabled={submitting || success}
          />

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              marginTop: '20px',
              opacity: (submitting || success) ? 0.7 : 1,
              cursor: (submitting || success) ? 'not-allowed' : 'pointer'
            }}
            disabled={submitting || success}
          >
            {submitting ? '🔄 Booking...' : success ? '✅ Booked!' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;