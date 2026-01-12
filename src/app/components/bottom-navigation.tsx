import { Home, Map, EventAvailable, Person } from '@mui/icons-material';
import { Screen } from '../types';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const tabs = [
    { id: 'home' as Screen, label: 'الرئيسية', icon: Home },
    { id: 'map' as Screen, label: 'خريطة', icon: Map },
    { id: 'bookings' as Screen, label: 'الحجوزات', icon: EventAvailable },
    { id: 'profile' as Screen, label: 'الحساب', icon: Person },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {tabs.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`transition-all ${isActive ? 'scale-110' : ''}`} style={{ fontSize: 24 }} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}