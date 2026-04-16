import React from 'react';
import { useScreenNav } from '../engine/useScreenNav';

export default function EmailScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F0F0F0', padding: 20, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden', maxWidth: 650, width: '100%' }}>
        <div style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid #E0E0E0', padding: 16, fontSize: 13, color: '#666', lineHeight: 1.5 }}>
          <div style={{ marginBottom: 8 }}><strong>From:</strong> {d.from}</div>
          <div style={{ marginBottom: 8 }}><strong>To:</strong> {d.to}</div>
          <div><strong>Subject:</strong> {d.subject}</div>
        </div>
        <div>
          <div style={{ backgroundColor: d.headerColor || 'var(--primary-main)', color: 'white', padding: '24px 32px', textAlign: 'center', fontSize: 18, fontWeight: 700 }}>
            {d.headerText}
          </div>
          <div style={{ padding: 32, fontSize: 14, lineHeight: 1.6, color: '#333' }}>
            <div style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>{d.greeting}</div>
            {(d.paragraphs || []).map((p, i) => (
              <p key={i} style={{ marginBottom: 20, fontSize: 14, color: '#555' }}>{p}</p>
            ))}
            {d.recommendations && (
              <>
                <div style={{ fontWeight: 600, marginBottom: 16, marginTop: 24, color: '#1A1A2E' }}>{d.recommendations.title}</div>
                <ul style={{ marginLeft: 0, marginBottom: 24, paddingLeft: 0 }}>
                  {d.recommendations.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: d.headerColor || 'var(--primary-main)', fontWeight: 'bold', minWidth: 24 }}>•</span>
                      <span style={{ fontSize: 14, color: '#555' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {d.productCard && (
              <div style={{ backgroundColor: d.productCard.bgColor || '#F5F0FA', border: `1px solid ${d.productCard.borderColor || '#E0D5F0'}`, borderRadius: 8, padding: 24, marginBottom: 24 }}>
                <div style={{ width: '100%', height: 200, backgroundColor: d.productCard.imageBg || '#E0D5F0', borderRadius: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16, fontSize: 48, color: d.productCard.imageColor || '#6B2D8B' }}>{d.productCard.imageIcon || '📦'}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A2E', marginBottom: 8 }}>{d.productCard.name}</div>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 16 }}>{d.productCard.description}</p>
                {d.productCard.prices && (
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 14, color: '#999', textDecoration: 'line-through' }}>{d.productCard.prices.original}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: d.productCard.priceColor || '#6B2D8B' }}>{d.productCard.prices.current}</span>
                  </div>
                )}
              </div>
            )}
            {d.promoBanner && (
              <div style={{ backgroundColor: d.promoBanner.bgColor || '#6B2D8B', color: 'white', padding: 16, borderRadius: 6, textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{d.promoBanner.code}</div>
                <div style={{ fontSize: 13, opacity: 0.95 }}>{d.promoBanner.details}</div>
              </div>
            )}
            {d.divider && <div style={{ borderTop: '1px solid #E0E0E0', margin: '24px 0' }} />}
            {d.offerSection && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: '#1A1A2E' }}>{d.offerSection.title}</div>
                {d.offerSection.transparencyNote && (
                  <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #E0E0E0', borderRadius: 6, padding: 14, fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 16 }}>
                    {d.offerSection.transparencyNote}
                  </div>
                )}
                <button style={{ display: 'block', backgroundColor: d.offerSection.ctaColor || '#6B2D8B', color: 'white', padding: '14px 24px', borderRadius: 6, textAlign: 'center', fontWeight: 600, fontSize: 14, marginBottom: 24, border: 'none', cursor: 'pointer', width: '100%' }}>
                  {d.offerSection.ctaText}
                </button>
              </div>
            )}
            {d.ctaButton && (
              <button style={{ display: 'block', backgroundColor: d.ctaButton.color || '#6B2D8B', color: 'white', padding: '14px 24px', borderRadius: 6, textAlign: 'center', fontWeight: 600, fontSize: 14, marginBottom: 24, border: 'none', cursor: 'pointer', width: '100%' }}>
                {d.ctaButton.text}
              </button>
            )}
            {d.transparencyNote && (
              <div style={{ fontSize: 12, color: '#999', lineHeight: 1.5, paddingTop: 16, borderTop: '1px solid #E0E0E0' }}>{d.transparencyNote}</div>
            )}
          </div>
          {d.footerText && (
            <div style={{ borderTop: '1px solid #E0E0E0', padding: '16px 32px', fontSize: 12, color: '#999', textAlign: 'center' }}>
              {d.footerText}
            </div>
          )}
        </div>
      </div>
      <button onClick={() => goNext(screen.id)}
        style={{ marginTop: 24, padding: '14px 32px', backgroundColor: '#27AE60', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
        {d.continueText || 'Continue →'}
      </button>
    </div>
  );
}
