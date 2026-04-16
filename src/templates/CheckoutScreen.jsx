import React, { useState, useEffect } from 'react';
import SecondaryNav from '../components/SecondaryNav';
import { useScreenNav } from '../engine/useScreenNav';

export default function CheckoutScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;
  const [timeLeft, setTimeLeft] = useState(d.timerStart || '14:58');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const [mins, secs] = prev.split(':').map(Number);
        let m = mins, s = secs - 1;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 0; s = 0; }
        return `${m}:${s.toString().padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: '#f9f9f9', paddingTop: 'var(--secondary-nav-height)', fontFamily: "'Open Sans', sans-serif", color: '#1F2937' }}>
      <SecondaryNav />
      {d.urgencyText && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', padding: '16px 40px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 600, color: '#991B1B' }}>
          <div style={{ fontSize: 20 }}>⏰</div>
          <div style={{ flex: 1 }}>Order in the next <span style={{ fontSize: 18, fontWeight: 700, color: '#DC2626', fontFamily: "'Poppins', sans-serif" }}>{timeLeft}</span> {d.urgencyText}</div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, maxWidth: 1200, margin: '0 auto', padding: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1F2937', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #E5E7EB' }}>Basket Summary</div>
            {(d.basketItems || []).map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ width: 80, height: 80, background: '#E8D5F2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: '#9B6FA3', flexShrink: 0 }}>{item.icon || '🐕‍🦺'}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontWeight: 600, color: '#1F2937', fontSize: 14 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{item.meta}</div>
                  <div style={{ fontWeight: 700, color: 'var(--secondary-main)', fontSize: 14, marginTop: 4 }}>
                    {item.originalPrice && <span style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'line-through', marginRight: 8 }}>{item.originalPrice}</span>}
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
            {d.promoApplied && (
              <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: 8, padding: 12, fontSize: 13, color: '#166534', fontWeight: 600, marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span>✓</span><span>{d.promoApplied}</span>
              </div>
            )}
          </div>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1F2937', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #E5E7EB' }}>Delivery & Sign In</div>
            <button style={{ background: '#4285F4', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              G Continue with Google
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0', fontSize: 13, color: '#6B7280' }}>
              <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} /><span>or</span><div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
            </div>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}><span style={{ color: '#4285F4', cursor: 'pointer' }}>Sign in with email</span></div>
            <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '16px 0' }} />
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Delivery Address</div>
            {(d.addressFields || []).map((f, i) => (
              <div key={i} style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{f.label}</label>
                <input defaultValue={f.value} style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', outline: 'none' }} readOnly />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1F2937', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #E5E7EB' }}>Order Summary</div>
            {(d.summaryRows || []).map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 12, color: '#6B7280' }}>
                <span style={{ fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontWeight: 500, color: row.highlight ? '#16A34A' : '#1F2937' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ height: 1, background: '#E5E7EB', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: '#1F2937', fontFamily: "'Poppins', sans-serif" }}>
              <span>{d.totalLabel || 'Total per Month'}</span>
              <span>{d.total}</span>
            </div>
          </div>
          <button onClick={() => goNext(screen.id)}
            style={{ background: 'var(--secondary-main)', color: '#fff', border: 'none', padding: '16px 24px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%', fontFamily: "'Poppins', sans-serif" }}>
            {d.ctaText || 'Place Order'}
          </button>
          <div style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', padding: '8px 0' }}>{d.legalText || 'By placing your order, you agree to our Terms and Privacy Policy'}</div>
        </div>
      </div>
    </div>
  );
}
