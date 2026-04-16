import React from 'react';
import { useJourney } from '../engine/JourneyProvider';
import { useScreenNav } from '../engine/useScreenNav';

export default function UnifiedProfileScreen({ screen }) {
  const { screens } = useJourney();
  const { goFirst } = useScreenNav();
  const d = screen.data;

  const segmentColors = { purple: '#6B2D8B', gold: '#D4932A', green: '#16A34A', teal: '#0891B2', red: '#DC2626', blue: '#1473E6' };

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: d.darkTheme ? '#131327' : '#fff', fontFamily: "'Open Sans', sans-serif", color: d.darkTheme ? '#E0E0E0' : '#1F2937' }}>
      {/* Adobe shell bar */}
      <div style={{ background: d.darkTheme ? '#1E1E3A' : '#0891B2', color: '#fff', padding: '16px 40px', fontSize: 16, fontWeight: 600, fontFamily: "'Poppins', sans-serif", boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {d.headerText || 'Adobe Experience Platform — Real-Time Customer Profile'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, maxWidth: 1200, margin: '0 auto', padding: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Profile Card */}
          <div style={{ background: d.darkTheme ? '#1E1E3A' : '#fff', border: `1px solid ${d.darkTheme ? '#2A2A4A' : '#E5E7EB'}`, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ background: d.darkTheme ? '#16162E' : '#0891B2', color: '#fff', padding: '16px 24px', fontSize: 16, fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
              {d.profileTitle}
            </div>
            <div style={{ padding: 24 }}>
              {(d.profileRows || []).map((row, i) => (
                <div key={i} style={{
                  display: 'flex', padding: '12px 0', alignItems: 'center', gap: 12,
                  borderBottom: i < d.profileRows.length - 1 ? `1px solid ${d.darkTheme ? '#2A2A4A' : '#F3F4F6'}` : 'none',
                  ...(i % 2 === 0 ? { background: d.darkTheme ? '#16162E' : '#F9FAFB', marginLeft: -12, marginRight: -12, paddingLeft: 12, paddingRight: 12 } : {}),
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: d.darkTheme ? '#8888AA' : '#6B7280', minWidth: 120, textTransform: 'uppercase' }}>{row.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: row.highlight === 'accent' ? (d.darkTheme ? '#0D97D9' : '#0891B2') : row.highlight === 'positive' ? '#16A34A' : (d.darkTheme ? '#E0E0E0' : '#1F2937'), flex: 1 }}>{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Audience Segments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: d.darkTheme ? '#1E1E3A' : '#fff', border: `1px solid ${d.darkTheme ? '#2A2A4A' : '#E5E7EB'}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: d.darkTheme ? '#16162E' : '#0891B2', color: '#fff', padding: '16px 24px', fontSize: 16, fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
              {d.segmentsTitle || 'Audience Segments'}
            </div>
            <div style={{ padding: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {(d.segments || []).map((seg, i) => (
                <div key={i} style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#fff', background: segmentColors[seg.color] || seg.color || '#6B2D8B', display: 'flex', flexDirection: 'column', gap: 3, minWidth: 140 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{seg.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 400 }}>{seg.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Journey Timeline */}
        <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
          <div style={{ background: d.darkTheme ? '#1E1E3A' : '#fff', border: `1px solid ${d.darkTheme ? '#2A2A4A' : '#E5E7EB'}`, borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: d.darkTheme ? '#E0E0E0' : '#1F2937', marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${d.darkTheme ? '#2A2A4A' : '#E5E7EB'}` }}>
              {d.timelineTitle || 'Journey Timeline'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
              {(d.timelineItems || []).map((item, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 'max-content', flex: '0 0 auto' }}>
                    <div style={{ width: 12, height: 12, background: d.darkTheme ? '#0D97D9' : '#0891B2', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(8,145,178,0.1)' }} />
                    <div style={{ fontSize: 12, fontWeight: 600, color: d.darkTheme ? '#8888AA' : '#6B7280', textAlign: 'center', whiteSpace: 'nowrap', maxWidth: 80 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: d.darkTheme ? '#5555AA' : '#9CA3AF', textAlign: 'center', whiteSpace: 'nowrap' }}>{item.timestamp}</div>
                  </div>
                  {idx < d.timelineItems.length - 1 && <div style={{ width: 20, height: 2, background: d.darkTheme ? '#2A2A4A' : '#D1D5DB', flex: '0 0 auto' }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <button onClick={() => goFirst()}
            style={{ background: 'var(--secondary-main)', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", width: '100%', marginTop: 16 }}>
            {d.restartText || 'Restart Journey'}
          </button>
        </div>
      </div>
    </div>
  );
}
