import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      // Only restore user if both user data and token exist
      if (storedUser && token) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      // If there's any error parsing stored data, clear it
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const clearAuthData = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';
  };

  // Validate stored authentication on mount
  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem("token");
      if (token && user) {
        try {
          // Test if the token is still valid by making a simple API call
          await api.get('/appointments/my-appointments');
        } catch (error) {
          // If token is invalid, clear auth data
          console.log('Stored token is invalid, clearing auth data');
          clearAuthData();
        }
      }
    };
    
    validateAuth();
  }, [user]);

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/signup", { name, email, password });
      const userData = res.data.data; // Backend returns data in res.data.data
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data.data; // Backend returns data in res.data.data
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear(); // Clear all localStorage to ensure clean state
    setUser(null);
    // Force page reload to ensure clean state
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, clearAuthData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Correct export for custom hook
export const useAuth = () => useContext(AuthContext);
