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
      <div className="p-1.5 rounded-full flex items-center justify-between shadow-2xl relative bg-gradient-to-r from-[#BE185D]/90 via-[#DB2777]/90 to-[#E11D48]/90 backdrop-blur-xl border border-white/30">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.90 }}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center justify-center transition-all duration-300 py-2.5 ${
                isActive
                  ? 'text-white font-black px-4 text-xs'
                  : 'text-white/70 hover:text-white px-3 text-xs'
              }`}
            >
              {/* LIQUID GLASS BUBBLE LENS (Suyuq shisha qabariq tugma ko'rinishi) */}
              {isActive && (
                <motion.div
                  layoutId="liquidBubbleHighlight"
                  transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                  className="absolute inset-0 rounded-full bg-white/25 backdrop-blur-md border border-white/70 shadow-[0_8px_25px_rgba(219,39,119,0.4),inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-2px_6px_rgba(0,0,0,0.1)] overflow-hidden"
                >
                  {/* Liquid Lens Internal Reflection Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent pointer-events-none rounded-full" />
                </motion.div>
              )}

              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="relative z-10 shrink-0 drop-shadow-md flex items-center justify-center"
              >
                {item.icon}
              </motion.div>

              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -4, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="relative z-10 ml-1.5 text-[11.5px] leading-none font-black tracking-tight whitespace-nowrap text-white drop-shadow-md"
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
