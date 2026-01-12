import { useState } from 'react';
import { 
  ArrowBack, 
  CalendarToday, 
  Schedule,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  LocalOffer,
  CreditCard,
  AccountBalance,
  Wallet
} from '@mui/icons-material';
import { Venue } from '../types';
import { generateTimeSlots } from '../data';

interface BookingFlowScreenProps {
  venue: Venue;
  onBack: () => void;
  onComplete: () => void;
}

export function BookingFlowScreen({ venue, onBack, onComplete }: BookingFlowScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'bank' | 'wallet'>('card');

  const timeSlots = generateTimeSlots(selectedDate);
  const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
  const basePrice = selectedSlot?.price || venue.pricePerHour;
  const discount = promoApplied ? basePrice * 0.15 : 0;
  const total = basePrice - discount;

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const applyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  const handleConfirmBooking = () => {
    // Simulate booking confirmation
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div className="min-h-full bg-background pb-32">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 pt-8 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowBack />
          </button>
          <h1>إتمام الحجز</h1>
        </div>
        <p className="text-sm text-muted-foreground mr-11">{venue.nameAr}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Date Selection */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="mb-3 flex items-center gap-2">
            <CalendarToday className="text-primary" />
            اختر التاريخ
          </h3>
          
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {dates.map((date) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTimeSlot(null);
                  }}
                  className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <span className="text-xs opacity-75 mb-1">
                    {date.toLocaleDateString('ar-SA', { weekday: 'short' })}
                  </span>
                  <span className="text-lg mb-0.5">{date.getDate()}</span>
                  {isToday && !isSelected && (
                    <span className="text-xs text-primary">اليوم</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="mb-3 flex items-center gap-2">
            <Schedule className="text-primary" />
            اختر الوقت
          </h3>
          
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.id;
              
              return (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                  disabled={!slot.available}
                  className={`py-3 px-2 rounded-xl text-sm transition-all ${
                    !slot.available
                      ? 'bg-muted/50 text-muted-foreground line-through opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div>{slot.time}</div>
                  {slot.available && (
                    <div className="text-xs opacity-75 mt-1">{slot.price} ر.س</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Promo Code */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="mb-3 flex items-center gap-2">
            <LocalOffer className="text-primary" />
            كود الخصم
          </h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setPromoApplied(false);
              }}
              placeholder="أدخل كود الخصم"
              disabled={promoApplied}
              className="flex-1 bg-input-background px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <button
              onClick={applyPromo}
              disabled={!promoCode.trim() || promoApplied}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {promoApplied ? 'مُطبق' : 'تطبيق'}
            </button>
          </div>
          
          {promoApplied && (
            <div className="mt-3 flex items-center gap-2 text-sm text-primary">
              <CheckCircle style={{ fontSize: 16 }} />
              <span>تم تطبيق خصم 15%</span>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="mb-3">طريقة الدفع</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => setSelectedPayment('card')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                selectedPayment === 'card'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className={selectedPayment === 'card' ? 'text-primary' : 'text-muted-foreground'} />
                <span>بطاقة ائتمان</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPayment === 'card' ? 'border-primary' : 'border-muted-foreground'
              }`}>
                {selectedPayment === 'card' && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedPayment('bank')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                selectedPayment === 'bank'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <AccountBalance className={selectedPayment === 'bank' ? 'text-primary' : 'text-muted-foreground'} />
                <span>تحويل بنكي</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPayment === 'bank' ? 'border-primary' : 'border-muted-foreground'
              }`}>
                {selectedPayment === 'bank' && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedPayment('wallet')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                selectedPayment === 'wallet'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet className={selectedPayment === 'wallet' ? 'text-primary' : 'text-muted-foreground'} />
                <span>محفظة إلكترونية</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPayment === 'wallet' ? 'border-primary' : 'border-muted-foreground'
              }`}>
                {selectedPayment === 'wallet' && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="mb-3">ملخص السعر</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">السعر الأساسي</span>
              <span>{basePrice} ر.س</span>
            </div>
            
            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-primary">الخصم (15%)</span>
                <span className="text-primary">-{discount.toFixed(0)} ر.س</span>
              </div>
            )}
            
            <div className="h-px bg-border my-2" />
            
            <div className="flex justify-between">
              <span>المبلغ الإجمالي</span>
              <span className="text-xl text-primary">{total.toFixed(0)} ر.س</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <button
          onClick={handleConfirmBooking}
          disabled={!selectedTimeSlot}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          تأكيد الحجز والدفع
        </button>
        {!selectedTimeSlot && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            الرجاء اختيار التاريخ والوقت
          </p>
        )}
      </div>
    </div>
  );
}
