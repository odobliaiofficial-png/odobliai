import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { Home, ChefHat, Lightbulb, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const handleTabPress = (tabId: ActiveTab) => {
    try {
      (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    } catch (e) {}
    setActiveTab(tabId);
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Home className="w-5 h-5" /> },
    { id: 'pazanda', label: 'Pazanda AI', icon: <ChefHat className="w-5 h-5" /> },
    { id: 'lifehacklar', label: 'Layfhaklar', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-pink-100/80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-all"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)' }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabPress(item.id)}
              className="relative flex flex-col items-center justify-center w-1/4 py-1.5 group select-none active:scale-95 transition-transform"
            >
              {/* Active Tab Sliding Pill Bubble */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="absolute inset-x-1.5 inset-y-0.5 bg-pink-50 rounded-2xl border border-pink-200/60 shadow-xs"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}

              {/* Icon & Label */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
                <div className={`transition-colors duration-200 ${isActive ? 'text-[#DB2777]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {item.icon}
                </div>
                <span
                  className={`text-[10px] font-bold tracking-tight transition-colors duration-200 ${
                    isActive ? 'text-[#DB2777] font-extrabold' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {t(item.label)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};


