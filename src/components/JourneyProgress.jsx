import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJourney } from '../engine/JourneyProvider';

const bar = {
  position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
  background: '#1A1A2E', padding: '8px 16px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
  boxShadow: '0 -2px 12px rgba(0,0,0,0.2)',
};
const arrow = { color: '#555', fontSize: 10, margin: '0 1px' };

export default function JourneyProgress() {
  const navigate = useNavigate();
  const { journeyId, screenId } = useParams();
  const { screens, loading, branding } = useJourney();

  if (loading || !screens.length) return null;

  const accentColor = branding?.primary?.colors?.main || '#D4932A';

  return (
    <div style={bar}>
      {screens.map((s, i) => {
        const active = s.id === screenId || (!screenId && i === 0);
        return (
          <React.Fragment key={s.id}>
            <span
              style={{
                fontSize: 10, fontFamily: "'Open Sans', sans-serif",
                padding: '4px 8px', borderRadius: 16, cursor: 'pointer',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
                background: active ? accentColor : 'transparent',
                color: active ? '#fff' : '#888',
                fontWeight: active ? 600 : 400,
              }}
              onClick={() => navigate(`/${journeyId}/${s.id}`)}
            >
              {`${i + 1}. ${s.label}`}
            </span>
            {i < screens.length - 1 && <span style={arrow}>›</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
