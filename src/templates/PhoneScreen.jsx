import React from 'react';
import { useScreenNav } from '../engine/useScreenNav';

export default function PhoneScreen({ screen }) {
  const { goNext } = useScreenNav();
  const d = screen.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1A1A2E', padding: 20, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ width: 350, height: 600, backgroundColor: 'white', borderRadius: 40, border: '8px solid #333', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: 28, backgroundColor: '#000', borderRadius: '0 0 20px 20px' }} />
        <div style={{ height: 40, backgroundColor: '#F5F5F5', borderBottom: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, fontWeight: 600, paddingLeft: 16, paddingRight: 16 }}>
          <span>{d.time || '14:15'}</span>
          <span>●●●●●</span>
        </div>
        <div style={{ height: 56, paddingLeft: 16, paddingRight: 16, display: 'flex', alignItems: 'center', fontSize: 18, fontWeight: 600, color: '#000', borderBottom: '1px solid #E0E0E0' }}>
          {d.appTitle || 'Messages'}
        </div>
        <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(d.messages || []).map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {msg.sender && <div style={{ fontSize: 13, fontWeight: 600, color: '#000', marginBottom: 4 }}>{msg.sender}</div>}
              <div style={{ backgroundColor: msg.highlight ? '#FFF3CD' : '#E5E5EA', color: '#000', borderRadius: 18, padding: '12px 16px', fontSize: 14, lineHeight: 1.4, maxWidth: '85%' }}>
                {msg.text}
              </div>
            </div>
          ))}
          {d.timestamp && <div style={{ fontSize: 12, color: '#999', marginTop: 8, marginLeft: 16 }}>{d.timestamp}</div>}
        </div>
      </div>
      <button onClick={() => goNext(screen.id)}
        style={{ marginTop: 24, padding: '14px 32px', backgroundColor: '#27AE60', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
        {d.ctaText || 'Continue →'}
      </button>
    </div>
  );
}
