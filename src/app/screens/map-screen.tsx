import { useState } from 'react';
import { LocationOn, FilterList, Star } from '@mui/icons-material';
import { mockVenues } from '../data';
import { Venue, SportType } from '../types';

interface MapScreenProps {
  onViewVenue: (venue: Venue) => void;
}

export function MapScreen({ onViewVenue }: MapScreenProps) {
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const filters: Array<{ id: SportType | 'all'; label: string }> = [
    { id: 'all', label: 'الكل' },
    { id: 'football', label: 'كرة القدم' },
    { id: 'padel', label: 'بادل' },
  ];

  const filteredVenues = selectedSport === 'all' 
    ? mockVenues 
    : mockVenues.filter(v => v.sports.includes(selectedSport));

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <h1 className="mb-3">الخريطة</h1>
        
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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
      </div>

      {/* Map Area (Simulated) */}
      <div className="flex-1 relative bg-gray-200 dark:bg-gray-800">
        {/* Simulated Map */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <LocationOn style={{ fontSize: 48 }} className="text-primary mb-2" />
            <p>عرض الخريطة</p>
            <p className="text-sm mt-1">{filteredVenues.length} ملعب متاح</p>
          </div>
        </div>

        {/* Map Markers */}
        <div className="absolute inset-0 p-8">
          <div className="relative h-full">
            {filteredVenues.map((venue, index) => (
              <button
                key={venue.id}
                onClick={() => setSelectedVenue(venue)}
                className={`absolute transition-all ${
                  selectedVenue?.id === venue.id ? 'scale-125 z-10' : ''
                }`}
                style={{
                  top: `${(index * 23 + 15) % 70}%`,
                  right: `${(index * 31 + 20) % 70}%`,
                }}
              >
                <div className={`p-2 rounded-full ${
                  selectedVenue?.id === venue.id 
                    ? 'bg-accent shadow-lg' 
                    : 'bg-primary shadow-md'
                }`}>
                  <LocationOn className="text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Details Card (appears when marker is clicked) */}
      {selectedVenue && (
        <div className="absolute bottom-20 left-4 right-4 bg-card rounded-2xl shadow-lg border border-border p-4 z-20">
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
              <img
                src={selectedVenue.images[0]}
                alt={selectedVenue.nameAr}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 truncate">{selectedVenue.nameAr}</h3>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500" style={{ fontSize: 14 }} />
                  <span>{selectedVenue.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <LocationOn style={{ fontSize: 14 }} />
                  <span>{selectedVenue.distance} كم</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-primary">
                  {selectedVenue.pricePerHour} ر.س / ساعة
                </span>
                <button
                  onClick={() => onViewVenue(selectedVenue)}
                  className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
