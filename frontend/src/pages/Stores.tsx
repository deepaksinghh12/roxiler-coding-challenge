import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Stores() {
  const { token, user } = useAuth();
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [addressSearch, setAddressSearch] = useState('');
  const [ratingInput, setRatingInput] = useState<{ [key: number]: number }>({});
  const [commentInput, setCommentInput] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchStores();
  }, [search, addressSearch]);

  const fetchStores = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/stores?qName=${search}&qAddress=${addressSearch}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitRating = async (storeId: number) => {
    const rating = ratingInput[storeId];
    const comment = commentInput[storeId] || '';
    if (!rating || rating < 1 || rating > 5) return alert('Select a valid rating between 1 and 5');
    
    try {
      await axios.post(`http://localhost:4000/api/stores/${storeId}/rating`, 
        { rating, comment }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStores(); // refresh data
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error submitting rating');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Registered Stores</h1>
      
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <input 
          className="form-input" 
          placeholder="Search by Store Name..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <input 
          className="form-input" 
          placeholder="Search by Address..." 
          value={addressSearch} 
          onChange={e => setAddressSearch(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-2">
        {stores.map(({ store, averageRating, userRating }: any) => (
          <div key={store.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2>{store.name}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{store.address}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Overall Rating</span>
                <span className="star-rating">
                  {'★'.repeat(averageRating)}{'☆'.repeat(5 - averageRating)}
                </span>
              </div>
              
              {user && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Your Rating</span>
                  {userRating ? (
                    <span className="star-rating" style={{ color: 'var(--primary-color)' }}>
                      {'★'.repeat(userRating)}{'☆'.repeat(5 - userRating)}
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.85rem' }}>Not rated yet</span>
                  )}
                </div>
              )}
            </div>

            {user && (
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>{userRating ? 'Modify Rating' : 'Submit Rating'}</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <span 
                      key={num} 
                      className={`star-rating star-interactive ${ratingInput[store.id] >= num ? '' : 'unselected'}`}
                      style={{ cursor: 'pointer', color: ratingInput[store.id] >= num ? 'var(--warning)' : 'var(--text-secondary)' }}
                      onClick={() => setRatingInput({...ratingInput, [store.id]: num})}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <input 
                  className="form-input" 
                  placeholder="Optional review comment..." 
                  style={{ marginBottom: '1rem', padding: '0.5rem' }}
                  value={commentInput[store.id] || ''}
                  onChange={e => setCommentInput({...commentInput, [store.id]: e.target.value})}
                />
                <button className="btn btn-primary" onClick={() => submitRating(store.id)}>Submit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
