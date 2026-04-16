import React, { useState } from 'react';
import PrimaryNav from '../components/PrimaryNav';
import { useScreenNav } from '../engine/useScreenNav';

export default function DirectoryScreen({ screen }) {
  const { goTo } = useScreenNav();
  const d = screen.data;
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: 'var(--primary-bg-warm)', paddingTop: 'var(--primary-nav-height)', paddingBottom: 40, fontFamily: "'Open Sans', sans-serif" }}>
      <PrimaryNav activeItem={d.activeNav} />
      <div style={{ background: '#fff', padding: 40, borderBottom: '1px solid var(--primary-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 42, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 24 }}>{d.heading}</h1>
          <div style={{ display: 'flex', gap: 12, maxWidth: 500 }}>
            <input type="text" defaultValue={d.searchValue} style={{ flex: 1, padding: '12px 16px', border: '2px solid var(--primary-border)', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', color: 'var(--primary-text)' }} readOnly />
            <button style={{ background: 'var(--primary-main)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Search</button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 32, padding: 40, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 20 }}>Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {(d.items || []).map(item => (
              <div key={item.id}
                onClick={() => item.targetScreen && goTo(item.targetScreen)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#fff', border: '1px solid var(--primary-border)', borderRadius: 8, padding: 20,
                  boxShadow: 'var(--shadow-sm)', cursor: item.targetScreen ? 'pointer' : 'default',
                  borderLeft: `4px solid ${item.featured ? 'var(--primary-main)' : 'transparent'}`,
                  transition: 'all 0.3s',
                  ...(hoveredCard === item.id ? { boxShadow: 'var(--shadow-md)', transform: 'translateY(-2px)' } : {}),
                }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 12 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: 'var(--primary-text-muted)', marginBottom: 8, lineHeight: 1.5 }}>{item.address}</div>
                <div style={{ fontSize: 13, color: 'var(--primary-text-muted)', marginBottom: 12 }}>{item.postcode}</div>
                {item.badge && <div style={{ display: 'inline-block', background: '#E8F4F8', color: '#0891B2', padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600, marginBottom: 12 }}>{item.badge}</div>}
                <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--primary-border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--primary-main)', fontWeight: 600, cursor: 'pointer' }}>Visit website</span>
                  <span style={{ fontSize: 13, color: 'var(--primary-main)', fontWeight: 600, cursor: 'pointer' }}>Get Directions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 320, height: 400, background: '#D4E8E0', borderRadius: 8, border: '2px solid #B8D5CA', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 110 }}>
          <div style={{ textAlign: 'center', color: '#5A8678' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Map of {d.mapLabel || 'locations'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
