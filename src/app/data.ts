import { Venue, Booking, TimeSlot } from './types';

export const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Champion Sports Complex',
    nameAr: 'مجمع تشامبيون الرياضي',
    rating: 4.8,
    reviews: 142,
    distance: 1.2,
    pricePerHour: 200,
    sports: ['football', 'padel'],
    badge: 'Top Rated',
    badgeAr: 'الأعلى تقييماً',
    images: [
      'https://images.unsplash.com/photo-1600130202712-fd01014ffa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZpZWxkJTIwc3RhZGl1bXxlbnwxfHx8fDE3NjgwMTc1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1657709288025-06d5eaa41757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMGNvdXJ0JTIwdGVubmlzfGVufDF8fHx8MTc2ODA3NTg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    latitude: 24.7136,
    longitude: 46.6753,
    amenities: ['Parking', 'Showers', 'Cafeteria', 'WiFi'],
    amenitiesAr: ['موقف سيارات', 'دشات', 'كافتيريا', 'واي فاي'],
    hasOffer: true,
    offerText: '20% off evening slots',
    offerTextAr: 'خصم 20% على الفترات المسائية',
  },
  {
    id: '2',
    name: 'Green Field Arena',
    nameAr: 'ساحة الملعب الأخضر',
    rating: 4.6,
    reviews: 89,
    distance: 2.5,
    pricePerHour: 180,
    sports: ['football'],
    images: [
      'https://images.unsplash.com/photo-1625187538367-6a8483a79cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGdyYXNzfGVufDF8fHx8MTc2ODA3NTg3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    latitude: 24.7236,
    longitude: 46.6853,
    amenities: ['Parking', 'Lockers', 'First Aid'],
    amenitiesAr: ['موقف سيارات', 'خزائن', 'إسعافات أولية'],
  },
  {
    id: '3',
    name: 'Padel Pro Club',
    nameAr: 'نادي بادل برو',
    rating: 4.9,
    reviews: 201,
    distance: 0.8,
    pricePerHour: 150,
    sports: ['padel'],
    badge: 'Best Value',
    badgeAr: 'أفضل قيمة',
    images: [
      'https://images.unsplash.com/photo-1657709288025-06d5eaa41757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMGNvdXJ0JTIwdGVubmlzfGVufDF8fHx8MTc2ODA3NTg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    latitude: 24.7036,
    longitude: 46.6653,
    amenities: ['AC Courts', 'Showers', 'Equipment Rental', 'Coaching'],
    amenitiesAr: ['ملاعب مكيفة', 'دشات', 'تأجير معدات', 'تدريب'],
    hasOffer: true,
    offerText: 'Free coaching session',
    offerTextAr: 'جلسة تدريب مجانية',
  },
  {
    id: '4',
    name: 'Urban Sports Center',
    nameAr: 'مركز الرياضات الحضري',
    rating: 4.5,
    reviews: 67,
    distance: 3.2,
    pricePerHour: 220,
    sports: ['football', 'padel'],
    images: [
      'https://images.unsplash.com/photo-1761644273884-83839f8f22e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzcG9ydHMlMjBjb3VydHxlbnwxfHx8fDE3NjgwNzU4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    latitude: 24.7336,
    longitude: 46.6953,
    amenities: ['Indoor Courts', 'Parking', 'Restaurant', 'Pro Shop'],
    amenitiesAr: ['ملاعب داخلية', 'موقف سيارات', 'مطعم', 'متجر احترافي'],
  },
  {
    id: '5',
    name: 'Elite Football Academy',
    nameAr: 'أكاديمية النخبة لكرة القدم',
    rating: 4.7,
    reviews: 156,
    distance: 1.9,
    pricePerHour: 190,
    sports: ['football'],
    badge: 'New',
    badgeAr: 'جديد',
    images: [
      'https://images.unsplash.com/photo-1600130202712-fd01014ffa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZpZWxkJTIwc3RhZGl1bXxlbnwxfHx8fDE3NjgwMTc1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    latitude: 24.7186,
    longitude: 46.6803,
    amenities: ['Natural Grass', 'Parking', 'Showers', 'Seating Area'],
    amenitiesAr: ['عشب طبيعي', 'موقف سيارات', 'دشات', 'منطقة جلوس'],
  },
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  
  hours.forEach((hour, index) => {
    // Randomly make some slots unavailable for demo
    const available = Math.random() > 0.3;
    slots.push({
      id: `slot-${index}`,
      time: hour,
      available,
      price: index >= 11 ? 200 : 180, // Evening slots more expensive
    });
  });
  
  return slots;
};

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    venueId: '1',
    venueName: 'Champion Sports Complex',
    venueNameAr: 'مجمع تشامبيون الرياضي',
    date: '2026-01-12',
    time: '18:00',
    sport: 'football',
    price: 200,
    status: 'upcoming',
  },
  {
    id: 'b2',
    venueId: '3',
    venueName: 'Padel Pro Club',
    venueNameAr: 'نادي بادل برو',
    date: '2026-01-08',
    time: '10:00',
    sport: 'padel',
    price: 150,
    status: 'completed',
  },
  {
    id: 'b3',
    venueId: '2',
    venueName: 'Green Field Arena',
    venueNameAr: 'ساحة الملعب الأخضر',
    date: '2026-01-15',
    time: '20:00',
    sport: 'football',
    price: 180,
    status: 'upcoming',
  },
];
