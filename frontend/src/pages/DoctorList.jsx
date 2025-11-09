import React, { useState, useEffect, useContext } from 'react';
import { getAllDoctors } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getAllDoctors();
            console.log('Doctors response:', response.data);
            
            if (response.data.success) {
                setDoctors(response.data.data);
            } else {
                setError('Failed to fetch doctors');
            }
        } catch (err) {
            console.error('Error fetching doctors:', err);
            setError(err.response?.data?.message || 'Error loading doctors');
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = (doctorId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate(`/book-appointment/${doctorId}`);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading doctors...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.error}>
                    {error}
                    <button onClick={fetchDoctors} style={styles.retryButton}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.pageContainer}>
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>Available Doctors</h1>
                <div style={styles.headerButtons}>
                    <Link to="/">
                        <button style={styles.homeButton}>Home</button>
                    </Link>
                    {user && (
                        <>
                            <Link to="/my-appointments">
                                <button style={styles.appointmentsButton}>My Appointments</button>
                            </Link>
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div style={styles.container}>
                {doctors.length === 0 ? (
                    <div style={styles.noData}>
                        <p>No doctors available at the moment.</p>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {doctors.map((doctor) => (
                            <div key={doctor._id} style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <h2 style={styles.doctorName}>{doctor.name}</h2>
                                    <span style={styles.rating}>⭐ {doctor.rating}</span>
                                </div>
                                
                                <div style={styles.cardBody}>
                                    <p style={styles.specialization}>{doctor.specialization}</p>
                                    <p style={styles.info}>Experience: {doctor.experience} years</p>
                                    <p style={styles.info}>Patients: {doctor.totalPatients}+</p>
                                    <p style={styles.fee}>₹{doctor.fee} per consultation</p>
                                    
                                    <div style={styles.availability}>
                                        <strong>Available:</strong>
                                        <p>{doctor.availability.days.join(', ')}</p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => handleBookAppointment(doctor._id)}
                                    style={styles.bookButton}
                                >
                                    Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    headerTitle: {
        margin: 0,
        fontSize: '24px',
    },
    headerButtons: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },
    homeButton: {
        padding: '8px 16px',
        backgroundColor: 'white',
        color: '#1976d2',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    appointmentsButton: {
        padding: '8px 16px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: '8px 16px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
        padding: '50px',
    },
    error: {
        textAlign: 'center',
        color: '#d32f2f',
        padding: '20px',
        backgroundColor: '#ffebee',
        borderRadius: '8px',
        margin: '20px',
    },
    retryButton: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    noData: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '16px',
        color: '#666',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
    },
    doctorName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        margin: 0,
    },
    rating: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#ff9800',
    },
    cardBody: {
        marginBottom: '15px',
    },
    specialization: {
        fontSize: '16px',
        color: '#1976d2',
        fontWeight: '600',
        marginBottom: '10px',
    },
    info: {
        fontSize: '14px',
        color: '#666',
        margin: '5px 0',
    },
    fee: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2e7d32',
        margin: '10px 0',
    },
    availability: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        fontSize: '14px',
    },
    bookButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
};

export default DoctorList;