import React from 'react';
import { useScreenNav } from '../engine/useScreenNav';

export default function TieredOfferScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F0F0F0', padding: 20, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden', maxWidth: 650, width: '100%' }}>
        {/* Email header */}
        {d.emailHeader && (
          <div style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid #E0E0E0', padding: 16, fontSize: 13, color: '#666', lineHeight: 1.5 }}>
            <div style={{ marginBottom: 8 }}><strong>From:</strong> {d.emailHeader.from}</div>
            <div style={{ marginBottom: 8 }}><strong>To:</strong> {d.emailHeader.to}</div>
            <div><strong>Subject:</strong> {d.emailHeader.subject}</div>
          </div>
        )}
        {/* Branded header bar */}
        <div style={{ background: d.headerGradient || d.headerColor || 'linear-gradient(135deg, #D4932A 0%, #6B2D8B 100%)', color: 'white', padding: '32px', textAlign: 'center' }}>
          {d.brandLine && <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 8, opacity: 0.9, textTransform: 'uppercase' }}>{d.brandLine}</div>}
          <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Poppins', sans-serif", marginBottom: 8 }}>{d.heroTitle}</div>
          {d.heroSubtitle && <div style={{ fontSize: 14, opacity: 0.9 }}>{d.heroSubtitle}</div>}
        </div>
        <div style={{ padding: 32, fontSize: 14, lineHeight: 1.6, color: '#333' }}>
          {d.greeting && <div style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>{d.greeting}</div>}
          {(d.introParagraphs || []).map((p, i) => (
            <p key={i} style={{ marginBottom: 16, fontSize: 14, color: '#555' }}>{p}</p>
          ))}
          {/* Benefits list */}
          {(d.benefits || []).length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
              {d.benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: '#F9F9F9', borderRadius: 8, fontSize: 13 }}>
                  <span style={{ fontSize: 18 }}>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          )}
          {/* Single price CTA */}
          {d.singleOffer && (
            <div style={{ background: d.singleOffer.bgColor || '#F0FFF0', border: `2px solid ${d.singleOffer.borderColor || '#27AE60'}`, borderRadius: 12, padding: 24, textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: d.singleOffer.priceColor || '#27AE60', marginBottom: 4 }}>{d.singleOffer.price}</div>
              <div style={{ fontSize: 14, color: '#666' }}>{d.singleOffer.frequency}</div>
              {d.singleOffer.ctaText && (
                <button style={{ marginTop: 16, background: d.singleOffer.ctaColor || '#27AE60', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                  {d.singleOffer.ctaText}
                </button>
              )}
            </div>
          )}
          {/* Tiered pricing */}
          {(d.tiers || []).length > 0 && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              {d.tiers.map((tier, i) => (
                <div key={i} style={{
                  flex: 1, border: `2px solid ${tier.featured ? (tier.borderColor || '#6B2D8B') : '#E5E7EB'}`,
                  borderRadius: 12, padding: 20, textAlign: 'center', position: 'relative',
                  background: tier.featured ? (tier.bgColor || '#F9F5FC') : '#fff',
                }}>
                  {tier.badge && (
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: tier.badgeColor || '#6B2D8B', color: '#fff', padding: '4px 16px', borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{tier.badge}</div>
                  )}
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1F2937', marginBottom: 8, marginTop: tier.badge ? 8 : 0 }}>{tier.name}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: tier.priceColor || '#1F2937', marginBottom: 4 }}>{tier.price}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 16 }}>{tier.frequency}</div>
                  <ul style={{ textAlign: 'left', fontSize: 12, color: '#555', listStyle: 'none', padding: 0 }}>
                    {(tier.features || []).map((f, j) => (
                      <li key={j} style={{ marginBottom: 6, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <span style={{ color: '#27AE60', fontWeight: 'bold' }}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {d.breedNote && (
            <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 8, padding: 14, fontSize: 13, color: '#795548', marginBottom: 16 }}>
              {d.breedNote}
            </div>
          )}
          {d.footerNote && <div style={{ fontSize: 12, color: '#999', lineHeight: 1.5, paddingTop: 16, borderTop: '1px solid #E0E0E0' }}>{d.footerNote}</div>}
        </div>
      </div>
      {screen.data.ctaText !== false && (
        <button onClick={() => goNext(screen.id)}
          style={{ marginTop: 24, padding: '14px 32px', backgroundColor: '#27AE60', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
          {d.continueText || 'Continue →'}
        </button>
      )}
    </div>
  );
}
