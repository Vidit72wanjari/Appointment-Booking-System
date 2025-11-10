import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import api from '../services/api';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [doctor, setDoctor] = useState(null);
    const [formData, setFormData] = useState({
        appointmentDate: '',
        timeSlot: '',
        reason: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDoctor();
    }, [doctorId]);

    const fetchDoctor = async () => {
        try {
            const response = await api.get(`/doctors/${doctorId}`);
            setDoctor(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to load doctor details');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await api.post('/appointments', {
                doctorId,
                patientName: user.name,
                appointmentDate: formData.appointmentDate,
                timeSlot: formData.timeSlot,
                reason: formData.reason
            });

            alert('Appointment booked successfully!');
            navigate('/my-appointments');
        } catch (error) {
            setError('Failed to book appointment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏥</div>
                    <div>Loading doctor details...</div>
                </div>
            </div>
        );
    }

    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '0'
        }}>
            {/* Header */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 40px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white'
            }}>
                <h2 style={{ margin: 0 }}>🏥 MediCare Plus</h2>
                <button 
                    onClick={() => navigate('/doctors')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    ← Back to Doctors
                </button>
            </div>

            {/* Main Content */}
            <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                {doctor && (
                    <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        marginBottom: '30px',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                        color: '#333'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                marginRight: '20px',
                                color: 'white'
                            }}>
                                👨‍⚕️
                            </div>
                            <div>
                                <h2 style={{ margin: '0 0 5px 0', color: '#333' }}>Dr. {doctor.name}</h2>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    backgroundColor: '#e8f4ff',
                                    color: '#1976d2',
                                    borderRadius: '15px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    {doctor.specialization}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{
                                padding: '15px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Experience</div>
                                <div style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                                    {doctor.experience} years
                                </div>
                            </div>
                            <div style={{
                                padding: '15px',
                                backgroundColor: '#e8f5e8',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Consultation Fee</div>
                                <div style={{ fontSize: '18px', fontWeight: '600', color: '#28a745' }}>
                                    ₹{doctor.consultationFee}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Booking Form */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                    color: '#333'
                }}>
                    <h3 style={{ 
                        textAlign: 'center', 
                        marginBottom: '30px',
                        fontSize: '1.8rem',
                        color: '#333'
                    }}>
                        📅 Book Your Appointment
                    </h3>

                    {error && (
                        <div style={{ 
                            color: '#dc3545', 
                            backgroundColor: '#f8d7da',
                            border: '1px solid #f5c6cb',
                            borderRadius: '10px',
                            padding: '15px',
                            marginBottom: '25px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                color: '#333',
                                fontWeight: '500',
                                fontSize: '16px'
                            }}>
                                📅 Appointment Date
                            </label>
                            <input
                                type="date"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                                style={{ 
                                    width: '100%', 
                                    padding: '15px 20px', 
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                color: '#333',
                                fontWeight: '500',
                                fontSize: '16px'
                            }}>
                                🕐 Preferred Time Slot
                            </label>
                            <select
                                name="timeSlot"
                                value={formData.timeSlot}
                                onChange={handleChange}
                                required
                                style={{ 
                                    width: '100%', 
                                    padding: '15px 20px', 
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    backgroundColor: 'white'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                            >
                                <option value="">Select a time slot</option>
                                {timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                color: '#333',
                                fontWeight: '500',
                                fontSize: '16px'
                            }}>
                                📝 Reason for Consultation
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Please describe your health concern or reason for consultation..."
                                style={{ 
                                    width: '100%', 
                                    padding: '15px 20px', 
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                width: '100%',
                                padding: '18px',
                                background: submitting ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                fontSize: '18px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!submitting) {
                                    e.target.style.transform = 'translateY(-3px)';
                                    e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!submitting) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        >
                            {submitting ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <div style={{ 
                                        width: '20px', 
                                        height: '20px', 
                                        border: '2px solid transparent',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    Booking Appointment...
                                </span>
                            ) : (
                                '✅ Confirm Appointment'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;