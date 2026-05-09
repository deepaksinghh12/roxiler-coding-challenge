import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stores from './pages/Stores';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-brand">Roxiler Rating</div>
      <div className="nav-links">
        {user ? (
          <>
            <span style={{ color: 'var(--text-secondary)' }}>Hello, {user.name}</span>
            {user.role === 'admin' && <Link to="/admin" className="btn btn-primary" style={{padding:'0.5rem 1rem'}}>Dashboard</Link>}
            {user.role === 'owner' && <Link to="/owner" className="btn btn-primary" style={{padding:'0.5rem 1rem'}}>Dashboard</Link>}
            {user.role === 'user' && <Link to="/" className="btn btn-primary" style={{padding:'0.5rem 1rem'}}>Stores</Link>}
            <button className="btn btn-danger" style={{padding:'0.5rem 1rem'}} onClick={() => { logout(); nav('/login'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary" style={{padding:'0.5rem 1rem'}}>Login</Link>
            <Link to="/signup" className="btn" style={{padding:'0.5rem 1rem', background:'var(--surface-color)'}}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Stores />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/owner" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

createRoot(document.getElementById('root')!).render(<App />);
