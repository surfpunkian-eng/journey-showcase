import React from 'react';
import { useScreenNav } from '../engine/useScreenNav';

export default function StatusCardScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F8F6F3', padding: 20, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ backgroundColor: 'white', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '40px 32px', maxWidth: 500, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, backgroundColor: d.iconColor || '#27AE60', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 24, fontSize: 48, color: 'white', fontWeight: 'bold' }}>
          {d.icon || '✓'}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1A1A2E', marginBottom: 24, lineHeight: 1.3 }}>{d.heading}</h1>
        {d.testimonial && (
          <>
            <p style={{ fontSize: 16, fontStyle: 'italic', color: '#555', marginBottom: 16, lineHeight: 1.6 }}>"{d.testimonial.text}"</p>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#999', marginBottom: 16 }}>— {d.testimonial.author}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24, fontSize: 20 }}>{d.testimonial.stars || '★★★★★'}</div>
          </>
        )}
        <div style={{ width: '100%', height: 1, backgroundColor: '#E0E0E0', margin: '24px 0' }} />
        {(d.sections || []).map((sec, i) => (
          <div key={i} style={{ width: '100%', marginBottom: 28 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>{sec.title}</h3>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{sec.text}</p>
          </div>
        ))}
        <button onClick={() => goNext(screen.id)}
          style={{ padding: '14px 32px', backgroundColor: '#27AE60', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
          {d.ctaText || 'Continue →'}
        </button>
      </div>
    </div>
  );
}
