import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('/appointments/my');
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
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
                    <div>Loading appointments...</div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '0'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 40px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white'
            }}>
                <h2 style={{ margin: 0 }}>🏥 My Appointments</h2>
                <button 
                    onClick={() => navigate('/doctors')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    + Book New Appointment
                </button>
            </div>

            <div style={{ padding: '40px' }}>
                {appointments.length === 0 ? (
                    <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '60px',
                        textAlign: 'center',
                        maxWidth: '500px',
                        margin: '0 auto',
                        color: '#333',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📅</div>
                        <h3 style={{ marginBottom: '15px', color: '#666' }}>No Appointments Found</h3>
                        <p style={{ marginBottom: '30px', color: '#888', fontSize: '16px' }}>
                            Book your first appointment with our expert doctors!
                        </p>
                        <button 
                            onClick={() => navigate('/doctors')}
                            style={{
                                padding: '15px 30px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}
                        >
                            🩺 Book Appointment
                        </button>
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gap: '25px',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {appointments.map((appointment) => (
                            <div key={appointment._id} style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '20px',
                                padding: '30px',
                                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                                color: '#333'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '25px' }}>
                                    <div style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        color: 'white',
                                        flexShrink: 0
                                    }}>
                                        👨‍⚕️
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#333' }}>
                                            Dr. {appointment.doctorName}
                                        </h3>
                                        
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '4px 12px',
                                            backgroundColor: '#e8f4ff',
                                            color: '#1976d2',
                                            borderRadius: '15px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            marginBottom: '15px'
                                        }}>
                                            {appointment.specialization}
                                        </div>

                                        <div style={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            gap: '15px',
                                            marginTop: '15px'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '1.2rem' }}>📅</span>
                                                <div>
                                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>Date</div>
                                                    <div style={{ fontWeight: '600', color: '#333' }}>
                                                        {formatDate(appointment.appointmentDate)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '1.2rem' }}>🕐</span>
                                                <div>
                                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>Time</div>
                                                    <div style={{ fontWeight: '600', color: '#333' }}>
                                                        {appointment.timeSlot}
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '1.2rem' }}>💰</span>
                                                <div>
                                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>Fee</div>
                                                    <div style={{ fontWeight: '600', color: '#28a745' }}>
                                                        ₹{appointment.consultationFee}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {appointment.reason && (
                                            <div style={{ 
                                                marginTop: '20px',
                                                padding: '15px',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '10px'
                                            }}>
                                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                                                    📝 Reason for Consultation
                                                </div>
                                                <div style={{ color: '#333', lineHeight: '1.4' }}>
                                                    {appointment.reason}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;