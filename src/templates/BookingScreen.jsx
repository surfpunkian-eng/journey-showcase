import React, { useState } from 'react';
import PrimaryNav from '../components/PrimaryNav';
import { useJourney } from '../engine/JourneyProvider';
import { useScreenNav } from '../engine/useScreenNav';

export default function BookingScreen({ screen }) {
  const { persona } = useJourney();
  const { goNext } = useScreenNav();
  const d = screen.data;
  const [consentChecked, setConsentChecked] = useState(true);

  const inputStyle = { padding: '12px 16px', borderRadius: 8, border: '1px solid var(--primary-border)', background: '#E8E4DF', fontSize: 14, fontFamily: 'inherit', color: 'var(--primary-text)' };

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: 'var(--primary-bg-warm)', paddingTop: 'var(--primary-nav-height)', paddingBottom: 40, fontFamily: "'Open Sans', sans-serif" }}>
      <PrimaryNav activeItem={d.activeNav} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 40, display: 'flex', gap: 40 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 42, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 8 }}>{d.heading}</h1>
          <p style={{ fontSize: 16, color: 'var(--primary-text-muted)', marginBottom: 32 }}>{d.subtitle}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {(d.fieldGroups || []).map((group, gi) => (
              <div key={gi}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--primary-text)', marginBottom: 16 }}>{group.title}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: group.columns === 1 ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
                  {group.fields.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text)' }}>{f.label}</label>
                      <input type="text" defaultValue={f.value} style={inputStyle} readOnly />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {d.consentText && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: '#fff', border: '1px solid var(--primary-border)', borderRadius: 8, cursor: 'pointer', marginTop: 8 }}>
                <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} style={{ width: 20, height: 20, cursor: 'pointer', accentColor: 'var(--primary-main)' }} />
                <span style={{ fontSize: 14, color: 'var(--primary-text)', cursor: 'pointer', flex: 1 }}>{d.consentText}</span>
              </label>
            )}
            <button onClick={() => goNext(screen.id)}
              style={{ background: 'var(--primary-main)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', marginTop: 20 }}>
              {d.ctaText || 'Confirm'}
            </button>
          </div>
        </div>
        {d.sidebar && (
          <div style={{ width: 320, height: 'fit-content', background: '#fff', border: '1px solid var(--primary-border)', borderRadius: 8, padding: 24, boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 110 }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 16 }}>{d.sidebar.title}</h3>
            {(d.sidebar.paragraphs || []).map((p, i) => (
              <p key={i} style={{ fontSize: 13, color: 'var(--primary-text-muted)', lineHeight: 1.7, marginBottom: i < d.sidebar.paragraphs.length - 1 ? 16 : 0 }}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
