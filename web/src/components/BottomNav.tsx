import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { Home, ChefHat, Sparkles, Lightbulb, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Home className="w-5 h-5" /> },
    { id: 'pazanda', label: 'Pazanda AI', icon: <ChefHat className="w-5 h-5" /> },
    { id: 'lifehacklar', label: 'Lifehacklar', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto">
      {/* Original Vibrant Pink Gradient Dock Container */}
      <div className="p-1.5 rounded-full flex items-center justify-between shadow-2xl relative bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] backdrop-blur-xl border border-pink-300/40">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.90 }}
              onClick={() => setActiveTab(item.id)}
              className={`relative z-10 flex items-center justify-center transition-all duration-200 py-2.5 ${
                isActive
                  ? 'text-[#DB2777] font-black px-3.5 text-xs'
                  : 'text-white/85 hover:text-white px-2.5 text-xs'
              }`}
            >
              {/* Vibrant White Active Bubble Lens (Silliq sirpanuvchi oq shaffof tugma) */}
              {isActive && (
                <motion.div
                  layoutId="activeTabBubblePill"
                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                  className="absolute inset-0 bg-white rounded-full shadow-lg border border-pink-100 -z-10"
                />
              )}

              <div className="shrink-0 drop-shadow-xs flex items-center justify-center">
                {item.icon}
              </div>

              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                  className="ml-1.5 text-[11.5px] leading-none tracking-tight font-black whitespace-nowrap text-[#DB2777]"
                >
                  {t(item.label)}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

