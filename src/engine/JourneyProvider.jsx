import React, { createContext, useContext, useState, useEffect } from 'react';

const JourneyContext = createContext(null);

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider');
  return ctx;
}

export function JourneyProvider({ journeyId, children }) {
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/journeys/${journeyId}/journey.json`)
      .then(r => {
        if (!r.ok) throw new Error(`Journey "${journeyId}" not found`);
        return r.json();
      })
      .then(data => { setJourney(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [journeyId]);

  // Apply branding CSS variables when journey loads
  useEffect(() => {
    if (!journey) return;
    const root = document.documentElement;
    const b = journey.branding;
    if (b.primary) {
      Object.entries(b.primary.colors || {}).forEach(([k, v]) => {
        root.style.setProperty(`--primary-${k}`, v);
      });
    }
    if (b.secondary) {
      Object.entries(b.secondary.colors || {}).forEach(([k, v]) => {
        root.style.setProperty(`--secondary-${k}`, v);
      });
    }
    // Update page title
    document.title = journey.title || 'Journey Showcase';
  }, [journey]);

  const value = {
    journey,
    journeyId,
    loading,
    error,
    screens: journey?.screens || [],
    persona: journey?.persona || {},
    branding: journey?.branding || {},
    getScreen: (id) => journey?.screens?.find(s => s.id === id),
    getScreenIndex: (id) => journey?.screens?.findIndex(s => s.id === id) ?? -1,
    getNextScreen: (currentId) => {
      const idx = journey?.screens?.findIndex(s => s.id === currentId);
      if (idx >= 0 && idx < (journey?.screens?.length || 0) - 1) {
        return journey.screens[idx + 1];
      }
      return null;
    },
    getPrevScreen: (currentId) => {
      const idx = journey?.screens?.findIndex(s => s.id === currentId);
      if (idx > 0) return journey.screens[idx - 1];
      return null;
    },
  };

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
}
