import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJourney } from '../engine/JourneyProvider';

export default function SecondaryNav() {
  const navigate = useNavigate();
  const { journeyId } = useParams();
  const { branding } = useJourney();
  const b = branding?.secondary || {};
  const colors = b.colors || {};

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      {b.topBarText && (
        <div style={{
          background: colors.main || '#6B2D8B', color: '#fff', textAlign: 'center',
          padding: '10px 0', fontSize: 13, fontFamily: "'Open Sans', sans-serif", fontWeight: 500,
        }}>{b.topBarText}</div>
      )}
      <nav style={{
        background: '#fff', borderBottom: `1px solid ${colors.border || '#E5E7EB'}`,
        display: 'flex', alignItems: 'center', padding: '0 40px', height: 60,
      }}>
        <div style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/${journeyId}/${branding?.secondary?.homeScreen || ''}`)}>
          <span style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700,
            color: colors.main || '#6B2D8B',
          }} dangerouslySetInnerHTML={{ __html: b.logoHtml || b.name || 'Brand' }} />
          {b.tagline && <span style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 11,
            color: colors.main || '#6B2D8B', display: 'block', marginTop: -4,
          }}>{b.tagline}</span>}
        </div>
        <div style={{ flex: 1, margin: '0 24px', position: 'relative' }}>
          <input style={{
            width: '100%', padding: '10px 50px 10px 16px',
            border: `2px solid ${colors.main || '#6B2D8B'}`, borderRadius: 6,
            fontSize: 14, fontFamily: "'Open Sans', sans-serif", outline: 'none',
          }} placeholder="What are you looking for?" readOnly />
          <button style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 48,
            background: colors.main || '#6B2D8B', border: 'none', borderRadius: '0 6px 6px 0',
            color: '#fff', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🔍</button>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 22, color: colors.main || '#6B2D8B' }}>
          <span style={{ cursor: 'pointer' }}>👤</span>
          <span style={{ cursor: 'pointer' }}>♡</span>
          <span style={{ cursor: 'pointer' }}>🛒</span>
        </div>
      </nav>
      {(b.categories || []).length > 0 && (
        <div style={{
          background: '#fff', borderBottom: `1px solid ${colors.border || '#E5E7EB'}`,
          display: 'flex', justifyContent: 'center', gap: 32, padding: '10px 0',
          fontSize: 14, fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#1F2937',
        }}>
          {b.categories.map(c => <span key={c} style={{ cursor: 'pointer' }}>{c}</span>)}
        </div>
      )}
      {(b.trustItems || []).length > 0 && (
        <div style={{
          background: '#F9FAFB', borderBottom: `1px solid ${colors.border || '#E5E7EB'}`,
          display: 'flex', justifyContent: 'space-around', padding: '8px 40px',
          fontSize: 12, color: '#6B7280', fontFamily: "'Open Sans', sans-serif",
        }}>
          {b.trustItems.map(t => <span key={t}>✓ {t}</span>)}
        </div>
      )}
    </div>
  );
}
