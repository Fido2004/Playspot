import { 
  Person, 
  Favorite, 
  Settings, 
  Notifications, 
  Language, 
  Help,
  Info,
  ExitToApp,
  ChevronLeft,
  LightMode,
  DarkMode
} from '@mui/icons-material';

interface ProfileScreenProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function ProfileScreen({ theme, onToggleTheme }: ProfileScreenProps) {
  const menuItems = [
    {
      id: 'favorites',
      icon: Favorite,
      label: 'الملاعب المفضلة',
      badge: '3',
    },
    {
      id: 'notifications',
      icon: Notifications,
      label: 'الإشعارات',
    },
    {
      id: 'language',
      icon: Language,
      label: 'اللغة',
      value: 'العربية',
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'الإعدادات',
    },
    {
      id: 'help',
      icon: Help,
      label: 'المساعدة والدعم',
    },
    {
      id: 'about',
      icon: Info,
      label: 'حول التطبيق',
      value: 'v1.0.0',
    },
  ];

  return (
    <div className="min-h-full bg-background">
      {/* Header with Profile */}
      <div className="bg-primary text-primary-foreground p-4 pt-8 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXIlMjBwcm9maWxlfGVufDF8fHx8MTc2ODA3NTk5OHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h2 className="mb-1">أحمد محمد</h2>
            <p className="text-sm opacity-90">ahmed@example.com</p>
            <p className="text-xs opacity-75 mt-1">عضو منذ يناير 2025</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-4 -mt-6">
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border">
          <div className="text-2xl text-primary mb-1">12</div>
          <div className="text-xs text-muted-foreground">حجز كامل</div>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border">
          <div className="text-2xl text-primary mb-1">3</div>
          <div className="text-xs text-muted-foreground">ملاعب مفضلة</div>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border">
          <div className="text-2xl text-primary mb-1">4.8</div>
          <div className="text-xs text-muted-foreground">التقييم</div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {theme === 'light' ? <DarkMode /> : <LightMode />}
              <span>المظهر</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {theme === 'light' ? 'فاتح' : 'داكن'}
              </span>
              <ChevronLeft className="text-muted-foreground" />
            </div>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-muted-foreground" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {item.value && (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                  <ChevronLeft className="text-muted-foreground" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-center gap-2 text-destructive hover:bg-destructive/10 transition-colors">
          <ExitToApp />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
