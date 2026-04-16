import React from 'react';
import { useJourney } from '../engine/JourneyProvider';
import { useScreenNav } from '../engine/useScreenNav';

export default function SearchScreen({ screen }) {
  const { persona } = useJourney();
  const { goNext } = useScreenNav();
  const d = screen.data;

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: '#F5F5F5', paddingBottom: 40, fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ background: '#fff', padding: '20px 40px', borderBottom: '1px solid #E0E0E0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 700, display: 'flex', alignItems: 'center', background: '#f9f9f9', border: '1px solid #ddd', borderRadius: 24, padding: '8px 16px', gap: 12 }}>
          <input type="text" defaultValue={d.query} style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 16, color: '#2D2D2D', outline: 'none', fontFamily: 'inherit' }} readOnly />
          <span style={{ fontSize: 16, color: '#666' }}>🔍</span>
        </div>
      </div>
      <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 24, fontStyle: 'italic' }}>💡 {d.assistantLabel || 'Copilot'} - Suggested result</div>
        {(d.results || []).map((r, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#1A73E8', marginBottom: 8 }}>{r.title}</div>
            <div style={{ fontSize: 13, color: '#006621', marginBottom: 12, fontFamily: 'monospace' }}>{r.url}</div>
            <div style={{ fontSize: 14, color: '#4D4D4D', lineHeight: 1.6 }}>{r.snippet}</div>
          </div>
        ))}
        {d.assistantCard && (
          <div style={{ background: '#E8F0FE', border: '1px solid #D2E3FC', borderRadius: 12, padding: 24, marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold' }}>✦</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#202124' }}>{d.assistantLabel || 'Copilot'}</div>
            </div>
            <div style={{ fontSize: 14, color: '#3C4043', lineHeight: 1.6, marginBottom: 16 }}>{d.assistantCard.intro}</div>
            <div style={{ background: '#fff', border: '1px solid #D0D0D0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#202124', marginBottom: 8 }}>{d.assistantCard.name}</div>
              {(d.assistantCard.details || []).map((det, i) => (
                <div key={i} style={{ fontSize: 13, color: '#5F6368', marginBottom: 4 }}>{det}</div>
              ))}
              {d.assistantCard.rating && (
                <div style={{ fontSize: 13, color: '#F57C00', marginTop: 8 }}>{d.assistantCard.rating}</div>
              )}
              <button
                onClick={() => goNext(screen.id)}
                style={{ background: 'var(--primary-main)', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 12 }}
              >
                {d.assistantCard.ctaText || 'Book Now'}
              </button>
            </div>
            <div style={{ fontSize: 14, color: '#3C4043', lineHeight: 1.6 }}>{d.assistantCard.footer}</div>
          </div>
        )}
      </div>
    </div>
  );
}
