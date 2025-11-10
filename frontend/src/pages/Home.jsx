import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

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
                <h2 style={{ margin: 0 }}>🏥 MediCare</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span>Welcome, {user?.name}!</span>
                    <button 
                        onClick={handleLogout}
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
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                <h1 style={{ 
                    fontSize: '3rem', 
                    marginBottom: '20px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Welcome to Appointment Booking System
                </h1>
                <p style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '50px',
                    maxWidth: '600px',
                    margin: '0 auto 50px'
                }}>
                    Book appointments with our qualified doctors. Get the best healthcare service at your convenience.
                </p>

                {/* Action Cards */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '30px', 
                    maxWidth: '1200px', 
                    margin: '0 auto' 
                }}>
                    {/* Browse Doctors Card */}
                    <div 
                        onClick={() => navigate('/doctors')}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            padding: '40px 30px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-10px)';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👩‍⚕️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Browse Doctors</h3>
                        <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                            Find and book appointments with our experienced doctors across various specializations
                        </p>
                    </div>

                    {/* My Appointments Card */}
                    <div 
                        onClick={() => navigate('/my-appointments')}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            padding: '40px 30px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-10px)';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📅</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>My Appointments</h3>
                        <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                            View and manage your upcoming and past appointments with doctors
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '50px', 
                    marginTop: '60px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>50+</div>
                        <div style={{ opacity: 0.8 }}>Expert Doctors</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>10+</div>
                        <div style={{ opacity: 0.8 }}>Specializations</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>24/7</div>
                        <div style={{ opacity: 0.8 }}>Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;