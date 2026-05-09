import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Client-side validations
    if (form.name.length < 20 || form.name.length > 60) {
      return setError('Name must be between 20 and 60 characters');
    }
    if (form.address.length > 400) {
      return setError('Address must be max 400 characters');
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    if (!passwordRegex.test(form.password)) {
      return setError('Password must be 8-16 chars, include 1 uppercase and 1 special char');
    }

    try {
      await axios.post('http://localhost:4000/api/auth/signup', form);
      nav('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create an Account</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Min 20, Max 60 characters" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required type="email" />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea className="form-input" placeholder="Max 400 characters" rows={3} value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" placeholder="8-16 chars, 1 uppercase, 1 special char" value={form.password} type="password" onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
