import React from 'react';
import PrimaryNav from '../components/PrimaryNav';
import { useScreenNav } from '../engine/useScreenNav';

export default function ConfirmationScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: 'var(--primary-bg-warm)', paddingTop: 'var(--primary-nav-height)', paddingBottom: 40, fontFamily: "'Open Sans', sans-serif" }}>
      <PrimaryNav activeItem={d.activeNav} />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px', textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, background: '#27AE60', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, color: '#fff', margin: '0 auto 32px', boxShadow: '0 8px 24px rgba(39,174,96,0.2)', animation: 'scaleIn 0.5s ease-out' }}>✓</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 40 }}>{d.heading}</h1>
        <div style={{ background: '#fff', border: '1px solid var(--primary-border)', borderRadius: 8, padding: 32, marginBottom: 40, boxShadow: 'var(--shadow-sm)' }}>
          {(d.details || []).map((det, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < d.details.length - 1 ? '1px solid var(--primary-border)' : 'none' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text)', textAlign: 'left' }}>{det.label}</span>
              <span style={{ fontSize: 14, color: 'var(--primary-text-muted)', textAlign: 'right' }}>{det.value}</span>
            </div>
          ))}
        </div>
        {(d.nextSteps || []).length > 0 && (
          <div style={{ textAlign: 'left', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 'normal', color: 'var(--primary-text)', marginBottom: 24, textAlign: 'center' }}>{d.nextStepsTitle || 'What happens next'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {d.nextSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff', border: '1px solid var(--primary-border)', borderRadius: 8, padding: 20 }}>
                  <div style={{ minWidth: 40, width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-main)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary-text)', marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--primary-text-muted)', lineHeight: 1.5 }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => goNext(screen.id)}
          style={{ background: 'var(--primary-main)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 48px', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(212,147,42,0.2)' }}>
          {d.ctaText || 'Continue'}
        </button>
      </div>
    </div>
  );
}
