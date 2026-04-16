import React from 'react';
import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { JourneyProvider } from './engine/JourneyProvider';
import ScreenRenderer from './engine/ScreenRenderer';
import JourneyProgress from './components/JourneyProgress';
import JourneyLanding from './components/JourneyLanding';

function JourneyShell() {
  const { journeyId } = useParams();
  return (
    <JourneyProvider journeyId={journeyId}>
      <Outlet />
      <JourneyProgress />
    </JourneyProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JourneyLanding />} />
      <Route path="/:journeyId" element={<JourneyShell />}>
        <Route index element={<ScreenRenderer />} />
        <Route path=":screenId" element={<ScreenRenderer />} />
      </Route>
    </Routes>
  );
}
