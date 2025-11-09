// My Appointments Page
// Created by: Vidit Wanjari

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await api.delete(`/appointments/${appointmentId}`);
      fetchAppointments();
    } catch (error) {
      alert('Failed to cancel appointment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#48bb78';
      case 'pending':
        return '#ed8936';
      case 'cancelled':
        return '#f56565';
      case 'completed':
        return '#4299e1';
      default:
        return '#718096';
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '50px', textAlign: 'center' }}>
        <h2>Loading appointments...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      {/* Header Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, marginBottom: '8px' }}>My Appointments</h1>
            <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
              Manage your booked appointments
            </p>
          </div>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            ← Back to Home
          </button>
        </div>

        {/* Summary Cards */}
        {appointments.length > 0 && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px', 
            marginBottom: '20px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#ed8936' }}>
                {appointments.filter(apt => apt.status === 'pending').length}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Pending</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#48bb78' }}>
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Confirmed</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#4299e1' }}>
                {appointments.filter(apt => apt.status === 'completed').length}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Completed</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#f56565' }}>
                {appointments.filter(apt => apt.status === 'cancelled').length}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Cancelled</p>
            </div>
          </div>
        )}
      </div>

      {appointments.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#666' }}>
            You don't have any appointments yet.
          </p>
          <button
            onClick={() => navigate('/doctors')}
            className="btn btn-primary"
            style={{ display: 'block', margin: '20px auto' }}
          >
            Book an Appointment
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
          {appointments.map((appointment) => (
            <div key={appointment._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h2>{appointment.doctorName}</h2>
                  <p><strong>Specialization:</strong> {appointment.specialization}</p>
                  <p><strong>Date:</strong> {formatDate(appointment.date)}</p>
                  <p><strong>Time:</strong> {appointment.timeSlot}</p>
                  <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
                  <p><strong>Booked on:</strong> {formatDate(appointment.createdAt)}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span style={{
                      background: getStatusColor(appointment.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {appointment.status.toUpperCase()}
                    </span>
                  </p>
                </div>
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <button
                    onClick={() => handleCancel(appointment._id)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;