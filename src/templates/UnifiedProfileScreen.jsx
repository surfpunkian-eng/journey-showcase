import React, { useState } from 'react';
import { useJourney } from '../engine/JourneyProvider';
import { useScreenNav } from '../engine/useScreenNav';

export default function UnifiedProfileScreen({ screen }) {
  const { screens } = useJourney();
  const { goFirst } = useScreenNav();
  const d = screen.data;
  const [activeTab, setActiveTab] = useState('Detail');

  const segmentDotColors = {
    blue: '#1473E6', orange: '#E68619', green: '#2D9D78',
    purple: '#6B2D8B', gold: '#D4932A', red: '#DC2626',
    teal: '#0891B2',
  };

  const tabs = ['Detail', 'Events', 'Audience membership', 'Attributes'];
  const initials = d.personName ? d.personName.split(' ').map(n => n[0]).join('') : 'SM';

  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: "'Open Sans', sans-serif", color: '#323232' }}>

      {/* Adobe Experience Platform Header */}
      <div style={{ background: '#1B1B1B', color: '#fff', padding: '0 24px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontFamily: "'Open Sans', sans-serif" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Adobe triangle logo */}
          <svg width="20" height="18" viewBox="0 0 24 22" fill="none">
            <path d="M9.2 0H0v21.6L9.2 0z" fill="#FA0F00"/>
            <path d="M14.8 0H24v21.6L14.8 0z" fill="#FA0F00"/>
            <path d="M12 8l5.5 13.6h-3.5L12 16.2l-2 5.4H6.5L12 8z" fill="#FA0F00"/>
          </svg>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Adobe Experience Platform</span>
          <span style={{ color: '#999', fontSize: 13, marginLeft: 4 }}>Real-Time Customer Profiles</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ background: '#2C2C2C', borderRadius: 4, padding: '6px 12px', fontSize: 12, color: '#999', display: 'flex', alignItems: 'center', gap: 6, minWidth: 180 }}>
            Search Experience Cloud (Ctrl+/)
          </div>
          <span style={{ fontSize: 13, color: '#ccc' }}>{d.orgName || 'LeapPoint, LLC'}</span>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1473E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
            ID
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 48px)' }}>
        {/* Left Sidebar Icons */}
        <div style={{ width: 44, background: '#fff', borderRight: '1px solid #E5E5E5', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, gap: 20 }}>
          {['👤', '📋', '📊', '✉️'].map((icon, i) => (
            <div key={i} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, opacity: 0.5, cursor: 'pointer', borderRadius: 4, background: i === 0 ? '#F0F0F0' : 'transparent' }}>
              {icon}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px 32px' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: 13, color: '#6E6E6E', marginBottom: 20 }}>
            <span style={{ color: '#1473E6', cursor: 'pointer' }}>Profiles</span>
            <span style={{ margin: '0 6px' }}>/</span>
            <span>{d.personName || 'Sarah Mitchell'}</span>
          </div>

          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#1473E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Open Sans', sans-serif", flexShrink: 0 }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#323232', marginBottom: 4, fontFamily: "'Open Sans', sans-serif" }}>
                {d.personName || 'Sarah Mitchell'}
              </div>
              <div style={{ fontSize: 13, color: '#6E6E6E', marginBottom: 6 }}>
                {d.personSubtitle || 'sarah.mitchell@gmail.com · +44 7700 123456'}
              </div>
              <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#8E8E8E' }}>
                <span>Namespace: <strong style={{ color: '#323232' }}>Email</strong></span>
                <span>Identity: <strong style={{ color: '#323232' }}>{d.personEmail || 'sarah.mitchell@gmail.com'}</strong></span>
                <span>Merge Policy: <strong style={{ color: '#323232' }}>Default</strong></span>
              </div>
            </div>
          </div>

          {/* Tab Bar */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #E5E5E5', marginBottom: 24 }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: 'none', border: 'none', padding: '10px 20px', fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? '#323232' : '#8E8E8E', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
                borderBottom: activeTab === tab ? '2px solid #323232' : '2px solid transparent', marginBottom: -2, transition: 'all 0.2s'
              }}>
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            {/* Profile Attributes */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#323232', marginBottom: 16 }}>
                Profile Attributes
              </div>
              <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E5E5', overflow: 'hidden' }}>
                {(d.profileRows || []).map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', padding: '12px 20px', alignItems: 'center',
                    borderBottom: i < d.profileRows.length - 1 ? '1px solid #F0F0F0' : 'none',
                    background: i % 2 === 0 ? '#FAFAFA' : '#fff',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 400, color: '#6E6E6E', minWidth: 140 }}>
                      {row.label}
                    </div>
                    <div style={{
                      fontSize: 14, fontWeight: 500, flex: 1,
                      color: row.highlight === 'accent' ? '#1473E6' : row.highlight === 'positive' ? '#2D9D78' : '#323232'
                    }}>
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Membership Sidebar */}
            <div style={{ width: 280, flexShrink: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#323232', marginBottom: 16 }}>
                Audience Membership ({(d.segments || []).length})
              </div>
              <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E5E5', overflow: 'hidden' }}>
                {(d.segments || []).map((seg, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                    borderBottom: i < d.segments.length - 1 ? '1px solid #F0F0F0' : 'none',
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                      background: segmentDotColors[seg.color] || seg.color || '#1473E6',
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#323232' }}>{seg.name}</div>
                      <div style={{ fontSize: 11, color: '#8E8E8E' }}>{seg.description}</div>
                    </div>
                    <div style={{
                      fontSize: 11, fontWeight: 600, color: '#2D9D78', flexShrink: 0,
                    }}>
                      Realized
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#323232', marginBottom: 16 }}>
              Journey Timeline
            </div>
            <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E5E5', padding: '24px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {(d.timelineItems || []).map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: idx === d.timelineItems.length - 1 ? 14 : 10,
                        height: idx === d.timelineItems.length - 1 ? 14 : 10,
                        background: '#1473E6', borderRadius: '50%',
                        boxShadow: idx === d.timelineItems.length - 1 ? '0 0 0 4px rgba(20,115,230,0.15)' : 'none',
                      }} />
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#323232', textAlign: 'center', whiteSpace: 'nowrap' }}>{item.label}</div>
                    </div>
                    {idx < d.timelineItems.length - 1 && (
                      <div style={{ flex: 1, height: 2, background: '#D1D5DB', margin: '0 4px', marginBottom: 20 }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Restart Button */}
          <button onClick={() => goFirst()} style={{
            background: '#2D9D78', color: '#fff', border: 'none', padding: '14px 28px',
            borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif", width: '100%', marginTop: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background 0.2s',
          }}
            onMouseOver={e => e.currentTarget.style.background = '#248A68'}
            onMouseOut={e => e.currentTarget.style.background = '#2D9D78'}
          >
            ↻ {d.restartText || 'Restart Journey Demo'}
          </button>
        </div>
      </div>
    </div>
  );
}
