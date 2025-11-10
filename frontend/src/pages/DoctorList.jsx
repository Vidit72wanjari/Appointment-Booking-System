import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import api from '../services/api';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await api.get('/doctors');
            setDoctors(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to load doctors');
            setLoading(false);
        }
    };

    const handleBookAppointment = (doctorId) => {
        navigate(`/book-appointment/${doctorId}`);
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
                    <div>Loading doctors...</div>
                </div>
            </div>
        );
    }

    if (error) {
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
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>❌</div>
                    <div>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        }}>
            {/* Header */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 40px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h2 style={{ margin: 0 }}>🏥 MediCare</h2>
                    <span style={{ 
                        padding: '6px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px',
                        fontSize: '14px'
                    }}>
                        Hello, {user?.name}!
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button 
                        onClick={() => navigate('/home')}
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
                        🏠 Home
                    </button>
                    <button 
                        onClick={() => navigate('/my-appointments')}
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
                        📅 My Appointments
                    </button>
                    <button 
                        onClick={logout}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: 'rgba(220, 53, 69, 0.8)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ 
                        fontSize: '2.5rem', 
                        marginBottom: '10px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        Our Expert Doctors
                    </h1>
                    <p style={{ 
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Choose from our team of qualified healthcare professionals
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                    gap: '30px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {doctors.map(doctor => (
                        <div key={doctor._id} style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '20px',
                            padding: '30px',
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#333',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                        }}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{ 
                                    width: '80px', 
                                    height: '80px', 
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    margin: '0 auto 15px',
                                    color: 'white'
                                }}>
                                    👨‍⚕️
                                </div>
                                <h3 style={{ 
                                    fontSize: '1.4rem', 
                                    margin: '0 0 5px 0',
                                    color: '#333'
                                }}>
                                    Dr. {doctor.name}
                                </h3>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    backgroundColor: '#e8f4ff',
                                    color: '#1976d2',
                                    borderRadius: '15px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                }}>
                                    {doctor.specialization}
                                </div>
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    marginBottom: '10px',
                                    padding: '8px 0'
                                }}>
                                    <span style={{ color: '#666' }}>Experience:</span>
                                    <span style={{ fontWeight: '600' }}>{doctor.experience} years</span>
                                </div>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    marginBottom: '10px',
                                    padding: '8px 0'
                                }}>
                                    <span style={{ color: '#666' }}>Consultation Fee:</span>
                                    <span style={{ 
                                        fontWeight: '600',
                                        color: '#28a745',
                                        fontSize: '1.1rem'
                                    }}>
                                        ₹{doctor.consultationFee}
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => handleBookAppointment(doctor._id)}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                📅 Book Appointment
                            </button>
                        </div>
                    ))}
                </div>

                {doctors.length === 0 && (
                    <div style={{ 
                        textAlign: 'center', 
                        marginTop: '50px',
                        color: 'white'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👩‍⚕️</div>
                        <p style={{ fontSize: '1.2rem' }}>No doctors available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorList;