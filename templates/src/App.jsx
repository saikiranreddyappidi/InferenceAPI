import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import './assets/css/Login-Register.css';
import LoginRegister from './components/Login-Register';
import { AuthProvider } from './components/Authentication/AuthContext';
import ProtectedRoute from './components/Authentication/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Navigate to="/home" />
                        </ProtectedRoute>
                    } />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/login-register" element={<LoginRegister />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
