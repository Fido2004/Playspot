import { useState } from 'react';
import { 
  ArrowBack, 
  Star, 
  LocationOn, 
  Favorite, 
  FavoriteBorder, 
  Share,
  LocalParking,
  Shower,
  Restaurant,
  Wifi,
  SportsSoccer,
  SportsTennis
} from '@mui/icons-material';
import { Venue } from '../types';
import { generateTimeSlots } from '../data';

interface VenueDetailsScreenProps {
  venue: Venue;
  onBook: () => void;
  onBack: () => void;
}

export function VenueDetailsScreen({ venue, onBook, onBack }: VenueDetailsScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const timeSlots = generateTimeSlots(selectedDate);
  const availableSlots = timeSlots.filter(slot => slot.available).slice(0, 6);

  const amenityIcons: Record<string, any> = {
    'Parking': LocalParking,
    'Showers': Shower,
    'Cafeteria': Restaurant,
    'Restaurant': Restaurant,
    'WiFi': Wifi,
  };

  return (
    <div className="min-h-full bg-background pb-20">
      {/* Header with Back Button */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-8">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:scale-105 transition-transform"
        >
          <ArrowBack />
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:scale-105 transition-transform"
          >
            {isFavorite ? (
              <Favorite className="text-red-500" />
            ) : (
              <FavoriteBorder />
            )}
          </button>
          <button className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:scale-105 transition-transform">
            <Share />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-64 bg-muted">
        <img
          src={venue.images[currentImageIndex]}
          alt={venue.nameAr}
          className="w-full h-full object-cover"
        />
        
        {venue.badge && (
          <div className="absolute bottom-4 left-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-sm">
            {venue.badgeAr}
          </div>
        )}

        {venue.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1">
            {venue.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-4'
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Venue Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h1 className="flex-1">{venue.nameAr}</h1>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
            <Star className="text-yellow-500" style={{ fontSize: 18 }} />
            <span className="text-sm">{venue.rating}</span>
            <span className="text-xs text-muted-foreground">({venue.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <LocationOn style={{ fontSize: 18 }} />
          <span className="text-sm">{venue.distance} كم من موقعك</span>
        </div>

        {/* Sports Available */}
        <div className="flex gap-2 mb-4">
          {venue.sports.map((sport) => (
            <div
              key={sport}
              className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg"
            >
              {sport === 'football' ? <SportsSoccer style={{ fontSize: 18 }} /> : <SportsTennis style={{ fontSize: 18 }} />}
              <span className="text-sm">{sport === 'football' ? 'كرة قدم' : 'بادل'}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">السعر لكل ساعة</p>
              <p className="text-2xl text-primary">{venue.pricePerHour} ر.س</p>
            </div>
            {venue.hasOffer && (
              <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm">
                {venue.offerTextAr}
              </div>
            )}
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <h3 className="mb-3">الموقع</h3>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <LocationOn className="text-primary" style={{ fontSize: 48 }} />
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <h3 className="mb-3">المرافق</h3>
          <div className="grid grid-cols-2 gap-3">
            {venue.amenitiesAr.map((amenity, index) => {
              const IconComponent = amenityIcons[venue.amenities[index]] || Wifi;
              return (
                <div key={index} className="flex items-center gap-2">
                  <IconComponent className="text-primary" style={{ fontSize: 20 }} />
                  <span className="text-sm">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Time Slots */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="mb-3">المواعيد المتاحة اليوم</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                className="bg-primary/10 text-primary border border-primary/30 rounded-lg py-2 px-3 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {slot.time}
              </button>
            ))}
          </div>
          {availableSlots.length > 0 && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              +{timeSlots.filter(s => s.available).length - availableSlots.length} مواعيد أخرى متاحة
            </p>
          )}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <button
          onClick={onBook}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl hover:opacity-90 transition-opacity"
        >
          احجز الآن
        </button>
      </div>
    </div>
  );
}
