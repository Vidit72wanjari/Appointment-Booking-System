import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Welcome, {user?.name}!</h1>
            <p style={{ color: '#666' }}>Doctor Appointment Booking System</p>
          </div>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/doctors')}>
          <h2>📋 Browse Doctors</h2>
          <p style={{ color: '#666' }}>Find and book appointments with available doctors</p>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/my-appointments')}>
          <h2>📅 My Appointments</h2>
          <p style={{ color: '#666' }}>View and manage your booked appointments</p>
        </div>

        <div className="card">
          <h2>👤 Profile</h2>
          <p style={{ color: '#666' }}>Email: {user?.email}</p>
          <p style={{ color: '#666' }}>Phone: {user?.phone}</p>
          <p style={{ color: '#666' }}>Role: {user?.role}</p>
        </div>
      </div>

    </div>
  );
};

export default Home;