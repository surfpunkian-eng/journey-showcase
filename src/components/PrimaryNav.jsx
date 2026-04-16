import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJourney } from '../engine/JourneyProvider';

export default function PrimaryNav({ activeItem }) {
  const navigate = useNavigate();
  const { journeyId } = useParams();
  const { branding } = useJourney();
  const b = branding?.primary || {};
  const colors = b.colors || {};

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      {colors.accent && <div style={{ height: 4, background: colors.accent }} />}
      <nav style={{
        background: '#fff', borderBottom: `1px solid ${colors.border || '#E8E4DF'}`,
        display: 'flex', alignItems: 'center', padding: '0 40px', height: 76,
      }}>
        <span
          style={{
            fontFamily: 'Georgia, serif', fontSize: 32, color: colors.main || '#D4932A',
            fontWeight: 'bold', cursor: 'pointer', letterSpacing: -0.5,
          }}
          onClick={() => navigate(`/${journeyId}/${branding?.primary?.homeScreen || ''}`)}
          dangerouslySetInnerHTML={{ __html: b.logoHtml || b.name || 'Brand' }}
        />
        <div style={{ display: 'flex', gap: 28, marginLeft: 40 }}>
          {(b.navItems || []).map(item => (
            <span
              key={item}
              style={{
                fontFamily: "'Open Sans', sans-serif", fontSize: 14, color: '#2D2D2D',
                cursor: 'pointer', padding: '4px 0',
                borderBottom: `2px solid ${item === activeItem ? (colors.main || '#D4932A') : 'transparent'}`,
                fontWeight: item === activeItem ? 600 : 400,
                transition: 'border-color 0.2s',
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div style={{
          marginLeft: 'auto', width: 40, height: 40, borderRadius: '50%',
          background: '#2D2D2D', display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 16,
        }}>🔍</div>
      </nav>
    </div>
  );
}
