export type SportType = 'football' | 'padel';

export interface Venue {
  id: string;
  name: string;
  nameAr: string;
  rating: number;
  reviews: number;
  distance: number; // in km
  pricePerHour: number;
  sports: SportType[];
  badge?: string;
  badgeAr?: string;
  images: string[];
  latitude: number;
  longitude: number;
  amenities: string[];
  amenitiesAr: string[];
  hasOffer?: boolean;
  offerText?: string;
  offerTextAr?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  venueNameAr: string;
  date: string;
  time: string;
  sport: SportType;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export type Screen = 'home' | 'map' | 'bookings' | 'profile' | 'venue-details' | 'booking-flow';
