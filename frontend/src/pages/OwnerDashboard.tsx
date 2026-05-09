import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function OwnerDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/owner/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching data');
    }
  };

  if (error) return <div style={{ color: 'var(--danger)', padding: '2rem' }}>{error}</div>;
  if (!data) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2>{data.store.name}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>{data.store.address}</p>
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.25rem' }}>Average Rating:</span>
          <span className="star-rating">
            {'★'.repeat(data.averageRating)}{'☆'.repeat(5 - data.averageRating)}
          </span>
          <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{data.averageRating} / 5</span>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Recent Ratings</h3>
      <div className="grid grid-cols-2">
        {data.ratings.length === 0 && <p>No ratings yet.</p>}
        {data.ratings.map((r: any) => (
          <div key={r.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>{r.User?.name}</span>
              <span className="star-rating">
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{r.User?.email}</p>
            {r.comment && <p style={{ fontStyle: 'italic' }}>"{r.comment}"</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
