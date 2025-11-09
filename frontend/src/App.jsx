import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DoctorList from "./pages/DoctorList";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Home from "./pages/Home";

function App() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Public routes - only accessible when not logged in */}
                <Route 
                    path="/login" 
                    element={!user ? <Login /> : <Navigate to="/" replace />} 
                />
                <Route 
                    path="/signup" 
                    element={!user ? <Signup /> : <Navigate to="/" replace />} 
                />
                
                {/* Protected routes - only accessible when logged in */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/doctors" 
                    element={
                        <ProtectedRoute>
                            <DoctorList />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/book-appointment/:doctorId" 
                    element={
                        <ProtectedRoute>
                            <BookAppointment />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/my-appointments" 
                    element={
                        <ProtectedRoute>
                            <MyAppointments />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Default redirect */}
                <Route 
                    path="*" 
                    element={<Navigate to={user ? "/" : "/login"} replace />} 
                />
            </Routes>
        </Router>
    );
}

export default App;