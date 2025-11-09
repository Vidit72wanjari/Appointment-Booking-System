import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Doctor Appointment Booking System</h1>
                {user ? (
                    <div style={styles.userInfo}>
                        <span style={styles.userName}>Welcome, {user.name}</span>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={styles.authButtons}>
                        <Link to="/login" style={styles.link}>
                            <button style={styles.loginButton}>Login</button>
                        </Link>
                        <Link to="/signup" style={styles.link}>
                            <button style={styles.signupButton}>Sign Up</button>
                        </Link>
                    </div>
                )}
            </div>

            <div style={styles.content}>
                <div style={styles.card}>
                    <h2>Book an Appointment</h2>
                    <p>Find and book appointments with top doctors</p>
                    <Link to="/doctors">
                        <button style={styles.primaryButton}>View Doctors</button>
                    </Link>
                </div>

                {user && (
                    <div style={styles.card}>
                        <h2>My Appointments</h2>
                        <p>View and manage your appointments</p>
                        <Link to="/my-appointments">
                            <button style={styles.primaryButton}>View Appointments</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
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
    title: {
        margin: 0,
        fontSize: '24px',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    userName: {
        fontSize: '16px',
    },
    logoutButton: {
        padding: '8px 16px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    authButtons: {
        display: 'flex',
        gap: '10px',
    },
    link: {
        textDecoration: 'none',
    },
    loginButton: {
        padding: '8px 16px',
        backgroundColor: 'white',
        color: '#1976d2',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    signupButton: {
        padding: '8px 16px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    content: {
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
    },
    card: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    primaryButton: {
        padding: '12px 24px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '15px',
        fontWeight: 'bold',
    },
};

export default Home;