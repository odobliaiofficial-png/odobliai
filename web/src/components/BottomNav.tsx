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
      {/* Translucent Rose-Quartz Glass Dock Container */}
      <div className="p-1.5 rounded-full flex items-center justify-between shadow-[0_12px_40px_rgba(46,18,29,0.45)] relative bg-[#2E121D]/80 backdrop-blur-2xl border border-white/25 overflow-hidden">
        
        {/* Subtle Ambient Glass Dock Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-rose-500/10 to-amber-500/20 pointer-events-none rounded-full" />

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center justify-center transition-all duration-300 py-2.5 ${
                isActive
                  ? 'text-white font-black px-4 text-xs'
                  : 'text-white/60 hover:text-white px-3 text-xs'
              }`}
            >
              {/* ULTRA-CRYSTAL LIQUID GLASS BUBBLE LENS (Haqiqiy Tiniq Suyuq Shisha Qabariq) */}
              {isActive && (
                <motion.div
                  layoutId="crystalLiquidBubble"
                  transition={{ type: 'spring', stiffness: 420, damping: 27 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-white/5 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(219,39,119,0.5),inset_0_2px_8px_rgba(255,255,255,1),inset_0_-2px_8px_rgba(255,255,255,0.25)] ring-1 ring-white/60 overflow-hidden"
                >
                  {/* Top Glass Lens Curved Highlight Glare */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-t-full" />
                  {/* Bottom Refraction Glow */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-pink-400/30 to-transparent pointer-events-none rounded-b-full" />
                </motion.div>
              )}

              <motion.div
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="relative z-10 shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center"
              >
                {item.icon}
              </motion.div>

              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -5, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="relative z-10 ml-1.5 text-[11.5px] leading-none font-black tracking-tight whitespace-nowrap text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
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
