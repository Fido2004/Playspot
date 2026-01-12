import { useState, useEffect } from 'react';
import { BottomNavigation } from './components/bottom-navigation';
import { Screen, Venue } from './types';
import { HomeScreen } from './screens/home-screen';
import { MapScreen } from './screens/map-screen';
import { BookingsScreen } from './screens/bookings-screen';
import { ProfileScreen } from './screens/profile-screen';
import { VenueDetailsScreen } from './screens/venue-details-screen';
import { BookingFlowScreen } from './screens/booking-flow-screen';

/**
 * PlaySpot - Football & Padel Court Booking App
 * Main app component with RTL support, light/dark themes, and navigation
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  useEffect(() => {
    // Set RTL and apply theme
    document.documentElement.dir = 'rtl';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setSelectedVenue(null);
  };

  const handleViewVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setCurrentScreen('venue-details');
  };

  const handleBookVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setCurrentScreen('booking-flow');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="size-full flex flex-col bg-background">
      {/* Main Content Area with padding for bottom nav */}
      <div className="flex-1 overflow-y-auto pb-16">
        {currentScreen === 'home' && (
          <HomeScreen onViewVenue={handleViewVenue} theme={theme} onToggleTheme={toggleTheme} />
        )}
        {currentScreen === 'map' && (
          <MapScreen onViewVenue={handleViewVenue} />
        )}
        {currentScreen === 'bookings' && (
          <BookingsScreen onViewVenue={handleViewVenue} />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen theme={theme} onToggleTheme={toggleTheme} />
        )}
        {currentScreen === 'venue-details' && selectedVenue && (
          <VenueDetailsScreen 
            venue={selectedVenue} 
            onBook={() => handleBookVenue(selectedVenue)}
            onBack={() => setCurrentScreen('home')}
          />
        )}
        {currentScreen === 'booking-flow' && selectedVenue && (
          <BookingFlowScreen 
            venue={selectedVenue}
            onBack={() => setCurrentScreen('venue-details')}
            onComplete={() => setCurrentScreen('bookings')}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      {!['venue-details', 'booking-flow'].includes(currentScreen) && (
        <BottomNavigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}
    </div>
  );
}