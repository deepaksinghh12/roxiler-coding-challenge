import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const [stRes, strRes, usrRes] = await Promise.all([
        axios.get('http://localhost:4000/api/admin/dashboard', config),
        axios.get('http://localhost:4000/api/admin/stores', config),
        axios.get('http://localhost:4000/api/admin/users', config)
      ]);
      setStats(stRes.data);
      setStores(strRes.data);
      setUsers(usrRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>Total Users</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>{stats.users}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>Total Stores</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>{stats.stores}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>Total Ratings</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--warning)' }}>{stats.ratings}</p>
        </div>
      </div>

      <h2 style={{ marginBottom: '1rem' }}>All Stores</h2>
      <div className="table-wrapper" style={{ marginBottom: '3rem' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s: any) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginBottom: '1rem' }}>All Users</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.85rem',
                  background: u.role === 'admin' ? 'var(--danger)' : u.role === 'owner' ? 'var(--warning)' : 'var(--primary-color)',
                  color: u.role === 'warning' ? '#000' : '#fff'
                }}>{u.role}</span></td>
                <td>{u.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
