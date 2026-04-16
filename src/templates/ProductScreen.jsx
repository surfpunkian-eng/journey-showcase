import React, { useState } from 'react';
import SecondaryNav from '../components/SecondaryNav';
import { useScreenNav } from '../engine/useScreenNav';

export default function ProductScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;
  const [sizeSelected, setSizeSelected] = useState(d.defaultSize || '');

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: '#fff', paddingTop: 'var(--secondary-nav-height)', fontFamily: "'Open Sans', sans-serif", color: '#1F2937' }}>
      <SecondaryNav />
      <div style={{ background: 'linear-gradient(135deg, var(--secondary-light) 0%, #E8D5F2 100%)', padding: 40, textAlign: 'center', borderBottom: '1px solid #E5D9EF' }}>
        <div style={{ display: 'inline-block', background: 'var(--secondary-main)', color: '#fff', padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>{d.personalisationBadge}</div>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: 'var(--secondary-main)', margin: '0 0 8px 0' }}>{d.heroTitle}</div>
        <div style={{ fontSize: 16, color: '#5B3D7A', marginBottom: 24 }}>{d.heroSubtitle}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, maxWidth: 1200, margin: '0 auto', padding: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            <div style={{ background: '#E5D9EF', aspectRatio: '1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: '#9B6FA3', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>{d.productIcon || '🐕‍🦺'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1F2937', lineHeight: 1.2 }}>{d.productName}</div>
                <div style={{ fontSize: 16, color: '#6B7280', fontStyle: 'italic' }}>{d.productSubtitle}</div>
              </div>
              {(d.sizes || []).length > 0 && (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', minWidth: 80 }}>Size:</div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {d.sizes.map(size => (
                      <button key={size} onClick={() => setSizeSelected(size)}
                        style={{ padding: '10px 16px', border: `2px solid ${sizeSelected === size ? 'var(--secondary-main)' : '#D1C4D8'}`, borderRadius: 8, background: sizeSelected === size ? 'var(--secondary-main)' : '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: sizeSelected === size ? '#fff' : '#6B7280' }}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: '#F9F5FC', borderRadius: 8, border: '1px solid #E5D9EF' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', flex: 1 }}>Subscribe & Save</div>
                <div style={{ width: 48, height: 28, background: 'var(--secondary-main)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4 }}>
                  <div style={{ width: 24, height: 24, background: '#fff', borderRadius: '50%' }} />
                </div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>Monthly</div>
              </div>
              <div>
                <div style={{ fontSize: 18, color: '#9CA3AF', textDecoration: 'line-through', fontWeight: 500 }}>{d.originalPrice}</div>
                <div style={{ fontSize: 40, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: 'var(--secondary-main)' }}>{d.discountedPrice}<span style={{ fontSize: 20, fontWeight: 500 }}>/month</span></div>
                <div style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>{d.savingsText}</div>
              </div>
              {d.promoBanner && (
                <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#166534', fontWeight: 600 }}>
                  <div style={{ fontSize: 20 }}>✓</div>
                  <div>{d.promoBanner}</div>
                </div>
              )}
              <button onClick={() => goNext(screen.id)}
                style={{ background: 'var(--secondary-main)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", width: '100%' }}>
                {d.ctaText || 'Add to Basket'}
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {(d.sidebarCards || []).map((card, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E5D9EF', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: 'var(--secondary-main)', marginBottom: 12 }}>{card.title}</div>
              {card.text && <div style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 12 }}>{card.text}</div>}
              {card.benefits && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#374151' }}>
                  {card.benefits.map((b, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--secondary-main)', fontWeight: 'bold', marginTop: 2 }}>→</div>
                      <div dangerouslySetInnerHTML={{ __html: b }} />
                    </div>
                  ))}
                </div>
              )}
              {card.badges && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {card.badges.map((badge, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', padding: '8px 12px', background: 'var(--secondary-light)', borderRadius: 6 }}>
                      <div style={{ fontSize: 16 }}>{badge.icon}</div>
                      <div>{badge.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
