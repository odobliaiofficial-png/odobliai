import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { LifehackCategory } from '../types';
import { ChevronDown, ArrowLeft, Folder, CheckCircle2 } from 'lucide-react';

const Category3DIcon: React.FC<{ icon3d: string; emoji: string; alt: string }> = ({ icon3d, emoji, alt }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !icon3d) {
    return <span className="text-3xl filter drop-shadow-sm">{emoji}</span>;
  }

  return (
    <img
      src={icon3d}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-full object-contain filter drop-shadow-sm"
    />
  );
};

export const Lifehacklar: React.FC = () => {
  const { lifehacks, t, selectedLifehackId, setSelectedLifehackId, categoryCovers, lifehackBannerConfig } = useApp();
  const [selectedCat, setSelectedCat] = useState<LifehackCategory | 'barchasi' | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const triggerHaptic = () => {
    try {
      (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    } catch (e) {}
  };

  useEffect(() => {
    if (selectedLifehackId) {
      const found = lifehacks.find(lh => lh.id === selectedLifehackId);
      if (found) {
        setSelectedCat(found.kategoriya);
        setExpandedId(found.id);
      }
      setSelectedLifehackId(null);
    }
  }, [selectedLifehackId, lifehacks]);

  // Telegram Native Back Button & Browser History Handling (1-step back to folder directory)
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    const backButton = tg?.BackButton;

    if (selectedCat !== null) {
      if (backButton) {
        backButton.show();
        const handleTelegramBack = () => {
          triggerHaptic();
          setSelectedCat(null);
        };
        backButton.onClick(handleTelegramBack);

        return () => {
          backButton.offClick(handleTelegramBack);
          backButton.hide();
        };
      }

      window.history.pushState({ lifehackFolder: selectedCat }, '');
      const handlePopState = () => {
        setSelectedCat(null);
      };
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    } else {
      if (backButton) {
        backButton.hide();
      }
    }
  }, [selectedCat]);

  const categories: { id: LifehackCategory; label: string; icon: string; icon3d: string; desc: string }[] = [
    {
      id: 'pishirish_asoslari',
      label: 'Pishirish asoslari',
      icon: '🍳',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Food/Cooking.png',
      desc: "Sautéing, Boiling, Sous Vide, soda bilan go'shtni yumshatish hamda tarozida un tortish"
    },
    {
      id: 'oshxona_sirlari',
      label: 'Oshxona sirlari',
      icon: '🧂',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Food/Salt.png',
      desc: "Leidenfrost effekti, Toum, palov damlash, Tahini va yog'dagi piyoz filtri sirlari"
    },
    {
      id: 'mahsulotlarni_saqlash',
      label: 'Mahsulotlarni saqlash',
      icon: '🌿',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Food/Herb.png',
      desc: "Nonni saqlash, bulyon uchun paket, ko'katlarni guldasta va nam sochiqda saqlash"
    },
    {
      id: 'tezkor_usullar',
      label: 'Tezkor usullar',
      icon: '⚡',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Symbols/High%20Voltage.png',
      desc: "Buttermilk tayyorlash, archilgan sarimsoq va protivenda tezkor pishirish"
    },
    {
      id: 'masalliqlarni_tejash',
      label: 'Masalliqlarni tejash',
      icon: '♻️',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Money%20Bag.png',
      desc: "Akvafaba, tuxum o'rinbosarlari (zig'ir urug'i, banan), feta suvi va sitrus zest"
    },
    {
      id: 'karving',
      label: 'Karving',
      icon: '🎨',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Activities/Artist%20Palette.png',
      desc: "Sabzavot va mevalardan bayramona bezaklar yasash"
    },
    {
      id: 'oyinchoq_yasash',
      label: "O'yinchoq yasash",
      icon: '🧸',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Teddy%20Bear.png',
      desc: "Farzandlar bilan qiziqarli o'yinchoqlar yasash"
    },
    {
      id: 'uy_ishlari',
      label: 'Uy ishlari',
      icon: '🏠',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Travel%20and%20places/House.png',
      desc: "Xonani tartiblash, tozalash va ro'zg'or sirlari"
    },
    {
      id: 'boshqa',
      label: 'Boshqa',
      icon: '📦',
      icon3d: 'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Package.png',
      desc: "Boshqa turli xil foydali maslahatlar"
    },
  ];

  const getCategoryCount = (catId: LifehackCategory | 'barchasi') => {
    if (catId === 'barchasi') {
      return lifehacks.filter(lh => lh.holat === 'nashr').length;
    }
    return lifehacks.filter(lh => lh.holat === 'nashr' && lh.kategoriya === catId).length;
  };

  const filteredHacks = lifehacks.filter(lh => {
    if (lh.holat !== 'nashr') return false;
    if (selectedCat === 'barchasi') return true;
    return lh.kategoriya === selectedCat;
  });

  const toggleExpand = (id: string) => {
    triggerHaptic();
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleSelectCat = (catId: LifehackCategory | 'barchasi') => {
    triggerHaptic();
    setSelectedCat(catId);
  };

  const activeCategoryObj = categories.find(c => c.id === selectedCat);

  return (
    <div className="space-y-4 pb-36 pt-1">
      <AnimatePresence mode="wait">
        {selectedCat === null ? (
          /* ================= MAIN FOLDERS DIRECTORY VIEW ================= */
          <motion.div
            key="folder-directory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Header Banner - Pink Vibrant Style */}
            <div className="bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] p-4 rounded-2xl flex items-center justify-between shadow-md shadow-pink-500/20 border border-pink-400/30 text-white">
              <div>
                <span className="badge-gold text-xs font-extrabold px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {lifehackBannerConfig?.badge || "💡 Foydali Maslahatlar"}
                </span>
                <h2 className="text-base font-extrabold text-white tracking-tight leading-tight">
                  {t(lifehackBannerConfig?.title || "Oila & Ro'zg'or Lifehacklari")}
                </h2>
                <p className="text-xs text-white/90 mt-1 max-w-[240px]">
                  {t(lifehackBannerConfig?.subtitle || "Oshxona, hunarmandchilik va ro'zg'or papkalari")}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center p-1.5 shadow-sm backdrop-blur-xs flex-shrink-0">
                {lifehackBannerConfig?.icon_or_url && (lifehackBannerConfig.icon_or_url.startsWith('http') || lifehackBannerConfig.icon_or_url.startsWith('/') || lifehackBannerConfig.icon_or_url.startsWith('data:')) ? (
                  <img src={lifehackBannerConfig.icon_or_url} alt="Banner" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Category3DIcon icon3d="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Folder.png" emoji="📁" alt="Folder" />
                )}
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between px-1 pt-1">
              <h3 className="text-xs font-extrabold text-[#6B4E5B] uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-[#DB2777]" />
                {t("Mavzuiy Papkalar Katalogi")}
              </h3>
            </div>

            {/* 2-Column Grid for Folder Cards (Optimal Ergonomics & Low Cognitive Load) */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => {
                const count = getCategoryCount(cat.id);
                const coverImg = categoryCovers ? categoryCovers[cat.id] : null;

                return (
                  <motion.div
                    key={cat.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectCat(cat.id)}
                    className="relative bg-white p-3.5 rounded-2xl border border-pink-200/80 hover:border-[#DB2777] cursor-pointer shadow-sm transition-all flex flex-col items-center justify-center text-center gap-2 group active:bg-pink-50/50 min-h-[120px]"
                  >
                    {/* Badge Count on top right */}
                    <span className="absolute top-2 right-2 bg-pink-100/90 text-[#DB2777] text-[10px] font-black px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs">
                      {count}
                    </span>

                    {/* Folder Cover Image or 3D Icon */}
                    {coverImg && (coverImg.startsWith('http') || coverImg.startsWith('/') || coverImg.startsWith('data:')) ? (
                      <img
                        src={coverImg}
                        alt={cat.label}
                        className="w-14 h-14 object-cover rounded-2xl flex-shrink-0 border border-pink-200 shadow-sm group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100/90 via-white to-rose-100/90 border border-pink-200/80 flex items-center justify-center p-2 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Category3DIcon icon3d={cat.icon3d} emoji={cat.icon} alt={cat.label} />
                      </div>
                    )}

                    <h4 className="font-extrabold text-[#2E121D] text-xs leading-snug line-clamp-2 px-1">
                      {t(cat.label)}
                    </h4>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ================= INSIDE FOLDER VIEW ================= */
          <motion.div
            key="inside-folder"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-4"
          >
            {/* 1. SHAFFOF STICKY HEADER (Glassmorphism Shisha Effekt) */}
            <div className="sticky top-0 z-20 glass-header border-b border-pink-100/80 px-3.5 py-3 flex items-center gap-3 shadow-xs">
              <button
                onClick={() => {
                  triggerHaptic();
                  setSelectedCat(null);
                }}
                className="p-2 rounded-full bg-white shadow-2xs active:scale-90 transition-transform border border-pink-100 text-[#DB2777]"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-[#2E121D] text-sm leading-tight truncate">
                  {selectedCat === 'barchasi' ? t("Barcha Maslahatlar") : t(activeCategoryObj?.label || '')}
                </h3>
                <p className="text-[10px] text-[#9D4C6C] font-medium">
                  {filteredHacks.length} {t("ta foydali maslahat")}
                </p>
              </div>
            </div>

            {/* 2. TOZA VA MINIMALIST KARTALAR RO'YXATI */}
            <div className="space-y-3 px-1">
              {filteredHacks.length === 0 ? (
                /* Professional Actionable Empty State */
                <div className="text-center py-14 px-6 bg-white rounded-3xl border border-dashed border-pink-200 mt-4 shadow-2xs">
                  <div className="text-4xl mb-3">🧐</div>
                  <h4 className="font-extrabold text-[#2E121D] text-sm">
                    {t("Bu papka hozircha bo'sh")}
                  </h4>
                  <p className="text-xs text-[#9D4C6C] mt-1 mb-4">
                    {t("Tez orada yangi foydali sirlar joylashtiriladi.")}
                  </p>
                  <button
                    onClick={() => {
                      triggerHaptic();
                      setSelectedCat(null);
                    }}
                    className="btn-rose-pill px-5 py-2 text-xs font-bold shadow-sm active:scale-95 transition-transform"
                  >
                    {t("Boshqa papkalarni ko'rish")}
                  </button>
                </div>
              ) : (
                filteredHacks.map(lh => {
                  const isExpanded = expandedId === lh.id;
                  return (
                    <motion.div
                      key={lh.id}
                      layout
                      onClick={() => toggleExpand(lh.id)}
                      className="card-pink p-3.5 rounded-2xl cursor-pointer select-none border border-pink-200/90 hover:border-[#DB2777] shadow-xs active:bg-pink-50/40 transition-colors"
                    >
                      {/* Yopiq Holat: Faqat Rasm, Sarlavha hamda ChevronDown */}
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border border-pink-200 flex items-center justify-center text-2xl shrink-0 shadow-xs overflow-hidden">
                          {lh.rasm_url && (lh.rasm_url.startsWith('http') || lh.rasm_url.startsWith('/') || lh.rasm_url.startsWith('data:')) ? (
                            <img
                              src={lh.rasm_url}
                              alt={lh.sarlavha}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{lh.rasm_url || '💡'}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-extrabold text-[#2E121D] text-sm leading-snug line-clamp-2">
                            {t(lh.sarlavha)}
                          </h3>
                        </div>

                        {/* Silliq Aylanuvchi Chevron Down */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 p-1 text-[#9D4C6C]"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Ochiq Holat: Tavsif, Bosqichlar va Foydali lahzalar */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="pt-3 mt-3 border-t border-pink-100 space-y-3"
                            >
                              <p className="text-xs text-[#9D4C6C] leading-relaxed">
                                {t(lh.tavsif_matni)}
                              </p>

                              {lh.bosqichlar && lh.bosqichlar.length > 0 && (
                                <div className="space-y-2">
                                  <h4 className="text-[10px] font-black text-[#2E121D] uppercase tracking-wider">
                                    📋 {t("Ketma-ketlik bosqichlari")}:
                                  </h4>
                                  {lh.bosqichlar.map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-[#374151] bg-pink-50/50 p-2.5 rounded-xl border border-pink-100">
                                      <span className="w-5 h-5 rounded-full bg-[#DB2777] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                        {idx + 1}
                                      </span>
                                      <span className="leading-relaxed flex-1">{t(step)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {lh.foydali_lahzalar && lh.foydali_lahzalar.length > 0 && (
                                <div className="pt-2 border-t border-pink-100">
                                  <h5 className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider mb-1.5">
                                    ✨ {t("Foydali jihatlari")}:
                                  </h5>
                                  <div className="flex flex-wrap gap-1.5">
                                    {lh.foydali_lahzalar.map((tip, idx) => (
                                      <span key={idx} className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                        {t(tip)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
