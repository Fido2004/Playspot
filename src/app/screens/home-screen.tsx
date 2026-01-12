import { useState } from 'react';
import { Search, FilterList, Star, LocationOn, LightMode, DarkMode, LocalOffer } from '@mui/icons-material';
import { mockVenues } from '../data';
import { Venue, SportType } from '../types';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface HomeScreenProps {
  onViewVenue: (venue: Venue) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function HomeScreen({ onViewVenue, theme, onToggleTheme }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

  const filters: Array<{ id: SportType | 'all'; label: string }> = [
    { id: 'all', label: 'الكل' },
    { id: 'football', label: 'كرة القدم' },
    { id: 'padel', label: 'بادل' },
  ];

  const filterVenues = (venues: Venue[]) => {
    return venues.filter(venue => {
      const matchesSearch = searchQuery === '' || 
        venue.nameAr.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSport = selectedSport === 'all' || venue.sports.includes(selectedSport);
      return matchesSearch && matchesSport;
    });
  };

  const nearbyVenues = filterVenues(mockVenues.sort((a, b) => a.distance - b.distance)).slice(0, 3);
  const topRatedVenues = filterVenues([...mockVenues].sort((a, b) => b.rating - a.rating)).slice(0, 3);
  const offerVenues = filterVenues(mockVenues.filter(v => v.hasOffer));

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">PlaySpot</h1>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {theme === 'light' ? <DarkMode /> : <LightMode />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="ابحث عن الملاعب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 text-foreground pr-12 pl-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide bg-card border-b border-border">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedSport(filter.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedSport === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="p-4 space-y-6">
        {/* Nearby Venues */}
        <section>
          <h2 className="mb-3 flex items-center gap-2">
            <LocationOn className="text-primary" />
            الملاعب القريبة منك
          </h2>
          <div className="space-y-3">
            {nearbyVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} onView={onViewVenue} />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <h2 className="mb-3 flex items-center gap-2">
            <Star className="text-primary" />
            أفضل الملاعب تقييماً
          </h2>
          <div className="space-y-3">
            {topRatedVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} onView={onViewVenue} />
            ))}
          </div>
        </section>

        {/* Today's Offers */}
        {offerVenues.length > 0 && (
          <section>
            <h2 className="mb-3 flex items-center gap-2">
              <LocalOffer className="text-accent" />
              عروض اليوم
            </h2>
            <div className="space-y-3">
              {offerVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} onView={onViewVenue} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function VenueCard({ venue, onView }: { venue: Venue; onView: (venue: Venue) => void }) {
  return (
    <div
      onClick={() => onView(venue)}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative h-40">
        <ImageWithFallback
          src={venue.images[0]}
          alt={venue.nameAr}
          className="w-full h-full object-cover"
        />
        {venue.badge && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs">
            {venue.badgeAr}
          </div>
        )}
        {venue.hasOffer && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
            عرض
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="flex-1">{venue.nameAr}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="text-yellow-500" style={{ fontSize: 16 }} />
            <span>{venue.rating}</span>
            <span className="text-muted-foreground">({venue.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <LocationOn style={{ fontSize: 16 }} />
            <span>{venue.distance} كم</span>
          </div>
          <div className="flex gap-1">
            {venue.sports.map((sport) => (
              <span key={sport} className="bg-muted px-2 py-0.5 rounded text-xs">
                {sport === 'football' ? 'كرة قدم' : 'بادل'}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary">
              {venue.pricePerHour} ر.س
            </span>
            <span className="text-sm text-muted-foreground"> / ساعة</span>
          </div>
          {venue.hasOffer && (
            <span className="text-xs text-accent">{venue.offerTextAr}</span>
          )}
        </div>
      </div>
    </div>
  );
}
