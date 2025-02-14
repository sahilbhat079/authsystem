// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      {/* Navigation Header */}
      <header style={{ backgroundColor: '#007BFF', padding: '1rem' }}>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: '#fff',
            fontSize: '1.1rem',
          }}
        >
          <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>
            Login
          </a>
          <a href="/register" style={{ color: '#fff', textDecoration: 'none' }}>
            Register
          </a>
          <a href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>
            Profile
          </a>
        </nav>
      </header>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Default route: Redirect to Profile if authenticated; otherwise, to Login */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        
        {/* Fallback route */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
