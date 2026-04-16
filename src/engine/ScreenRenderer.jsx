import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useJourney } from './JourneyProvider';

// Template imports
import SearchScreen from '../templates/SearchScreen';
import DirectoryScreen from '../templates/DirectoryScreen';
import DetailScreen from '../templates/DetailScreen';
import BookingScreen from '../templates/BookingScreen';
import ConfirmationScreen from '../templates/ConfirmationScreen';
import PhoneScreen from '../templates/PhoneScreen';
import StatusCardScreen from '../templates/StatusCardScreen';
import EmailScreen from '../templates/EmailScreen';
import ProductScreen from '../templates/ProductScreen';
import CheckoutScreen from '../templates/CheckoutScreen';
import OrderCompleteScreen from '../templates/OrderCompleteScreen';
import UnifiedProfileScreen from '../templates/UnifiedProfileScreen';
import TieredOfferScreen from '../templates/TieredOfferScreen';

const TEMPLATE_MAP = {
  search: SearchScreen,
  directory: DirectoryScreen,
  detail: DetailScreen,
  booking: BookingScreen,
  confirmation: ConfirmationScreen,
  phone: PhoneScreen,
  'status-card': StatusCardScreen,
  email: EmailScreen,
  product: ProductScreen,
  checkout: CheckoutScreen,
  'order-complete': OrderCompleteScreen,
  'unified-profile': UnifiedProfileScreen,
  'tiered-offer': TieredOfferScreen,
};

export default function ScreenRenderer() {
  const { screenId } = useParams();
  const { journey, loading, error, getScreen } = useJourney();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!journey) return null;

  // If no screenId, redirect to first screen
  if (!screenId) {
    return <Navigate to={journey.screens[0]?.id || ''} replace />;
  }

  const screen = getScreen(screenId);
  if (!screen) return <ErrorState message={`Screen "${screenId}" not found`} />;

  const Template = TEMPLATE_MAP[screen.type];
  if (!Template) return <ErrorState message={`Unknown template type "${screen.type}"`} />;

  return <Template key={screenId} screen={screen} />;
}

function LoadingState() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#f5f5f5',
      fontFamily: "'Open Sans', sans-serif", color: '#666',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <div>Loading journey...</div>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#FEF2F2',
      fontFamily: "'Open Sans', sans-serif", color: '#991B1B',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Oops</div>
        <div style={{ fontSize: 14, color: '#7F1D1D' }}>{message}</div>
      </div>
    </div>
  );
}
