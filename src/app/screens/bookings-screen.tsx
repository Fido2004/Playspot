import { useState } from 'react';
import { CalendarToday, Schedule, CheckCircle, Cancel } from '@mui/icons-material';
import { mockBookings } from '../data';
import { Booking, Venue } from '../types';
import { mockVenues } from '../data';

interface BookingsScreenProps {
  onViewVenue: (venue: Venue) => void;
}

export function BookingsScreen({ onViewVenue }: BookingsScreenProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming');
  const completedBookings = mockBookings.filter(b => b.status === 'completed');

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : completedBookings;

  const handleViewVenue = (booking: Booking) => {
    const venue = mockVenues.find(v => v.id === booking.venueId);
    if (venue) {
      onViewVenue(venue);
    }
  };

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 pt-8">
        <h1 className="mb-4">حجوزاتي</h1>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === 'upcoming'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            القادمة ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === 'completed'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            المكتملة ({completedBookings.length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4 space-y-3">
        {displayBookings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <CalendarToday style={{ fontSize: 48 }} className="mb-2 mx-auto" />
            <p>لا توجد حجوزات {activeTab === 'upcoming' ? 'قادمة' : 'مكتملة'}</p>
          </div>
        ) : (
          displayBookings.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onView={() => handleViewVenue(booking)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking, onView }: { booking: Booking; onView: () => void }) {
  const isUpcoming = booking.status === 'upcoming';
  
  return (
    <div
      onClick={onView}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="mb-1">{booking.venueNameAr}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="bg-muted px-2 py-0.5 rounded">
              {booking.sport === 'football' ? 'كرة قدم' : 'بادل'}
            </span>
          </div>
        </div>
        
        {isUpcoming ? (
          <CheckCircle className="text-primary" />
        ) : (
          <Cancel className="text-muted-foreground" />
        )}
      </div>

      <div className="flex items-center gap-4 text-sm mb-3">
        <div className="flex items-center gap-1 text-foreground">
          <CalendarToday style={{ fontSize: 16 }} />
          <span>{new Date(booking.date).toLocaleDateString('ar-SA', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center gap-1 text-foreground">
          <Schedule style={{ fontSize: 16 }} />
          <span>{booking.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="text-sm">
          <span className="text-muted-foreground">المبلغ الإجمالي: </span>
          <span className="text-primary">{booking.price} ر.س</span>
        </div>
        
        {isUpcoming && (
          <button className="text-sm text-accent hover:underline">
            إلغاء الحجز
          </button>
        )}
      </div>
    </div>
  );
}
