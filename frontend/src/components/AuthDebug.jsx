// Debug helper to check authentication state
import React from 'react';
import { useAuth } from '../Context/AuthContext';

const AuthDebug = () => {
  const { user, clearAuthData } = useAuth();
  
  const handleClearAuth = () => {
    if (window.confirm('Are you sure you want to clear all authentication data?')) {
      clearAuthData();
    }
  };
  
  const storageInfo = {
    token: localStorage.getItem('token') ? 'exists' : 'none',
    user: localStorage.getItem('user') ? 'exists' : 'none',
    currentUser: user ? user.name : 'none'
  };
  
  // Only show in development
  if (process.env.NODE_ENV === 'production') return null;
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#f0f0f0', 
      padding: '10px', 
      border: '1px solid #ccc',
      fontSize: '12px',
      zIndex: 1000,
      borderRadius: '5px'
    }}>
      <div><strong>Auth Debug:</strong></div>
      <div>Token: {storageInfo.token}</div>
      <div>User: {storageInfo.user}</div>
      <div>Current: {storageInfo.currentUser}</div>
      <button 
        onClick={handleClearAuth}
        style={{
          marginTop: '5px',
          padding: '2px 8px',
          fontSize: '10px',
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '3px'
        }}
      >
        Clear Auth
      </button>
    </div>
  );
};

export default AuthDebug;