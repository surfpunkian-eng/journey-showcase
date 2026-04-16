import React from 'react';
import PrimaryNav from '../components/PrimaryNav';
import { useScreenNav } from '../engine/useScreenNav';

export default function DetailScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: 'var(--primary-bg)', paddingTop: 'var(--primary-nav-height)', paddingBottom: 40, fontFamily: "'Open Sans', sans-serif" }}>
      <PrimaryNav activeItem={d.activeNav} />
      <div style={{ display: 'flex', background: '#fff', minHeight: 500, borderBottom: '1px solid var(--primary-border)' }}>
        <div style={{ flex: 1, background: '#C0C0C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#808080' }}>
          {d.heroImageText || '📸 Image'}
        </div>
        <div style={{ flex: 1, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--primary-main)', marginBottom: 20, cursor: 'pointer', fontWeight: 600 }}>{d.breadcrumb}</span>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 16, lineHeight: 1.2 }}>{d.name}</h1>
          <div style={{ fontSize: 16, color: 'var(--primary-text-muted)', marginBottom: 32, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{d.address}</div>
          <button style={{ background: 'var(--primary-main)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>Visit website</button>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, marginBottom: 40 }}>
          {(d.infoBoxes || []).map((box, i) => (
            <div key={i} style={{ background: 'var(--primary-bg-warm)', border: '1px solid var(--primary-border)', borderRadius: 8, padding: 24 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 16 }}>{box.title}</h3>
              {box.items ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {box.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#fff', borderRadius: 4, fontSize: 14, color: 'var(--primary-text)' }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 14, color: 'var(--primary-text)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{box.content}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <button onClick={() => goNext(screen.id)}
            style={{ background: 'var(--primary-main)', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(212, 147, 42, 0.2)' }}>
            {d.ctaText || 'Book an Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}
