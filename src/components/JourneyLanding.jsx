import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JourneyLanding() {
  const navigate = useNavigate();
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/journeys/index.json')
      .then(r => r.json())
      .then(data => { setJourneys(data.journeys || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // If only one journey, redirect directly
  useEffect(() => {
    if (!loading && journeys.length === 1) {
      navigate(`/${journeys[0].id}`, { replace: true });
    }
  }, [loading, journeys, navigate]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ fontSize: 48 }}>⏳</div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      padding: '80px 40px', fontFamily: "'Open Sans', sans-serif",
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 48, fontWeight: 700,
          color: '#fff', marginBottom: 16, textAlign: 'center',
        }}>
          Journey Showcase
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 60 }}>
          Interactive customer journey walkthroughs powered by Adobe Experience Cloud
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
          {journeys.map(j => (
            <div
              key={j.id}
              onClick={() => navigate(`/${j.id}`)}
              style={{
                background: '#fff', borderRadius: 16, padding: 32, cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: j.accentColor || '#D4932A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, marginBottom: 20,
              }}>
                {j.icon || '🚀'}
              </div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 8 }}>
                {j.title}
              </h2>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 16 }}>
                {j.description}
              </p>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>
                {j.screenCount} screens
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
