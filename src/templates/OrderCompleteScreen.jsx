import React, { useState, useMemo } from 'react';
import { useScreenNav } from '../engine/useScreenNav';

export default function OrderCompleteScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;

  const confettiElements = useMemo(() => Array.from({ length: 20 }).map((_, i) => {
    const colors = d.confettiColors || ['#6B2D8B', '#F3ECF8', '#D1C4D8', '#E8D5F2', '#C4A5D6'];
    return {
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 30 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    };
  }), []);

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: '#FAFAF8', padding: '60px 40px', fontFamily: "'Open Sans', sans-serif", color: '#1F2937', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        {confettiElements.map((c, i) => (
          <div key={i} style={{ position: 'absolute', borderRadius: '50%', opacity: 0.7, width: c.size, height: c.size, background: c.color, left: c.left, top: c.top }} />
        ))}
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 120, height: 120, background: d.checkmarkColor || 'var(--secondary-main)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, color: '#fff', boxShadow: `0 8px 24px ${d.checkmarkShadow || 'rgba(107,45,139,0.3)'}` }}>✓</div>
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1F2937', textAlign: 'center', marginBottom: 8 }}>{d.heading}</h1>
        <p style={{ fontSize: 18, color: '#6B7280', textAlign: 'center', marginBottom: 40 }}>{d.subheading}</p>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: 32 }}>
          {(d.orderDetails || []).map((det, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < d.orderDetails.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <span style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>{det.label}</span>
              {det.product ? (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 60, height: 60, background: '#E8D5F2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#9B6FA3' }}>{det.product.icon || '🐕‍🦺'}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1F2937', fontSize: 13 }}>{det.product.name}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{det.product.meta}</div>
                  </div>
                </div>
              ) : (
                <span style={{ fontSize: 14, fontWeight: 600, color: det.highlight ? '#16A34A' : '#1F2937' }}>{det.value}</span>
              )}
            </div>
          ))}
        </div>
        {d.deliveryPromise && (
          <div style={{ background: '#E8F0FE', border: '1px solid #D2E3FC', borderRadius: 12, padding: 24, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 48, color: '#4285F4' }}>🚚</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1F2937', marginBottom: 4 }}>{d.deliveryPromise.title}</div>
              <div style={{ fontSize: 14, color: '#6B7280' }}>{d.deliveryPromise.detail}</div>
            </div>
          </div>
        )}
        {d.lifestyleSection && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', marginBottom: 32 }}>
            <div style={{ background: 'linear-gradient(135deg, var(--secondary-light) 0%, #E8D5F2 100%)', aspectRatio: '1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: '#9B6FA3', border: '2px solid #D1C4D8', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>{d.lifestyleSection.icon || '🐕'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1F2937', lineHeight: 1.4, paddingBottom: 16, borderBottom: '3px solid var(--secondary-main)' }}>{d.lifestyleSection.quote}</div>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>{d.lifestyleSection.text}</p>
            </div>
          </div>
        )}
        <button onClick={() => goNext(screen.id)}
          style={{ background: 'var(--secondary-main)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", width: '100%', textAlign: 'center' }}>
          {d.ctaText || 'View Your Profile →'}
        </button>
      </div>
    </div>
  );
}
