import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Lifehack, LifehackCategory } from '../types';
import { Lightbulb, Sparkles, ChevronDown, ChevronUp, CheckCircle2, Folder, FolderOpen, ArrowLeft } from 'lucide-react';

export const Lifehacklar: React.FC = () => {
  const { lifehacks, t, selectedLifehackId, setSelectedLifehackId, categoryCovers, lifehackBannerConfig } = useApp();
  const [selectedCat, setSelectedCat] = useState<LifehackCategory | 'barchasi' | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const categories: { id: LifehackCategory; label: string; icon: string; desc: string }[] = [
    { id: 'pishirish_asoslari', label: 'Pishirish asoslari', icon: '🍳', desc: "Sautéing, Boiling, Sous Vide, soda bilan go'shtni yumshatish hamda tarozida un tortish" },
    { id: 'oshxona_sirlari', label: 'Oshxona sirlari', icon: '🧂', desc: "Leidenfrost effekti, Toum, palov damlash, Tahini va yog'dagi piyoz filtri sirlari" },
    { id: 'mahsulotlarni_saqlash', label: 'Mahsulotlarni saqlash', icon: '🌿', desc: "Nonni saqlash, bulyon uchun paket, ko'katlarni guldasta va nam sochiqda saqlash" },
    { id: 'tezkor_usullar', label: 'Tezkor usullar', icon: '⚡', desc: "Buttermilk tayyorlash, archilgan sarimsoq va protivenda tezkor pishirish" },
    { id: 'masalliqlarni_tejash', label: 'Masalliqlarni tejash', icon: '♻️', desc: "Akvafaba, tuxum o'rinbosarlari (zig'ir urug'i, banan), feta suvi va sitrus zest" },
    { id: 'karving', label: 'Karving', icon: '🎨', desc: "Sabzavot va mevalardan bayramona bezaklar yasash" },
    { id: 'oyinchoq_yasash', label: "O'yinchoq yasash", icon: '🧸', desc: "Farzandlar bilan qiziqarli o'yinchoqlar yasash" },
    { id: 'uy_ishlari', label: 'Uy ishlari', icon: '🏠', desc: "Xonani tartiblash, tozalash va ro'zg'or sirlari" },
    { id: 'boshqa', label: 'Boshqa', icon: '📦', desc: "Boshqa turli xil foydali maslahatlar" },
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
    setExpandedId(prev => (prev === id ? null : id));
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
              <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shadow-xs backdrop-blur-xs flex-shrink-0">
                {lifehackBannerConfig?.icon_or_url && (lifehackBannerConfig.icon_or_url.startsWith('http') || lifehackBannerConfig.icon_or_url.startsWith('/') || lifehackBannerConfig.icon_or_url.startsWith('data:')) ? (
                  <img src={lifehackBannerConfig.icon_or_url} alt="Banner" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span>{lifehackBannerConfig?.icon_or_url || '📁'}</span>
                )}
              </div>
            </div>


            {/* Barchasi All Folder Card */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCat('barchasi')}
              className="card-pink p-3.5 rounded-2xl border border-pink-200 hover:border-[#DB2777] cursor-pointer shadow-2xs transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white flex items-center justify-center text-xl shadow-xs flex-shrink-0">
                  📁
                </div>
                <div>
                  <h3 className="font-extrabold text-[#2E121D] text-sm leading-tight">
                    {t("Barcha Maslahatlar")}
                  </h3>
                  <p className="text-xs text-[#9D4C6C] mt-0.5">
                    {t("Barcha kategoriyalardagi barcha foydali sirlarni ko'rish")}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-pink-100 text-[#DB2777] border border-pink-200 flex-shrink-0">
                {getCategoryCount('barchasi')} {t("ta")}
              </span>
            </motion.div>

            {/* Section Header */}
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-extrabold text-[#6B4E5B] uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-[#DB2777]" />
                {t("Mavzuiy Papkalar Katalogi")}
              </h3>
            </div>

            {/* Smartphone Folder Cards Grid (Uzunchoq papkalar ro'yxati) */}
            <div className="grid grid-cols-1 gap-3">
              {categories.map(cat => {
                const count = getCategoryCount(cat.id);
                const coverImg = categoryCovers ? categoryCovers[cat.id] : null;

                return (
                  <motion.div
                    key={cat.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCat(cat.id)}
                    className="card-pink p-3.5 rounded-2xl border border-pink-200/90 hover:border-[#DB2777] cursor-pointer shadow-2xs transition-all flex items-center justify-between group active:bg-pink-50/60"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Folder Cover Image or Icon */}
                      {coverImg && (coverImg.startsWith('http') || coverImg.startsWith('/') || coverImg.startsWith('data:')) ? (
                        <img
                          src={coverImg}
                          alt={cat.label}
                          className="w-13 h-13 object-cover rounded-xl flex-shrink-0 border border-pink-200 shadow-2xs group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border border-pink-200 flex items-center justify-center text-2xl flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          {coverImg || cat.icon}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="w-4 h-4 text-[#DB2777] flex-shrink-0" />
                          <h4 className="font-extrabold text-[#2E121D] text-sm leading-snug truncate">
                            {t(cat.label)}
                          </h4>
                        </div>
                        <p className="text-xs text-[#9D4C6C] mt-0.5 line-clamp-1 leading-normal">
                          {t(cat.desc)}
                        </p>
                      </div>
                    </div>

                    {/* Count Tag Badge */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-pink-100 text-[#DB2777] border border-pink-200 shadow-2xs">
                        {count} {t("ta")}
                      </span>
                    </div>
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
            className="space-y-4"
          >
            {/* Top Navigation Bar: Back Button & Folder Title */}
            <div className="card-burgundy-banner p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
              <button
                onClick={() => setSelectedCat(null)}
                className="flex items-center gap-2 text-xs font-extrabold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all active:scale-95 border border-white/25"
              >
                <ArrowLeft className="w-4 h-4 text-amber-200" />
                <span>{t("Papkalarga Qaytish")}</span>
              </button>

              <div className="text-right">
                <span className="badge-gold text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block mb-0.5">
                  📁 {getCategoryCount(selectedCat)} {t("ta maslahat")}
                </span>
                <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5 justify-end">
                  <span>{activeCategoryObj ? activeCategoryObj.icon : '📁'}</span>
                  <span>{selectedCat === 'barchasi' ? t("Barcha Maslahatlar") : t(activeCategoryObj?.label || '')}</span>
                </h3>
              </div>
            </div>

            {/* Lifehack Cards Inside This Folder */}
            <div className="space-y-3">
              {filteredHacks.length === 0 ? (
                <div className="text-center py-12 bg-white/80 rounded-2xl border border-pink-200">
                  <div className="text-4xl mb-2">📭</div>
                  <h4 className="font-extrabold text-[#2E121D] text-sm">
                    {t("Ushbu papkada hozircha maslahatlar yo'q")}
                  </h4>
                  <p className="text-xs text-[#9D4C6C] mt-1">
                    {t("Tez orada yangi sirlar joylashtiriladi")}
                  </p>
                </div>
              ) : (
                filteredHacks.map(lh => {
                  const isExpanded = expandedId === lh.id;
                  return (
                    <motion.div
                      key={lh.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleExpand(lh.id)}
                      className="card-pink p-3.5 rounded-2xl hover:border-[#DB2777] transition-all cursor-pointer select-none active:bg-pink-50/50"
                    >
                      <div className="flex gap-3 items-start">
                        {lh.rasm_url && (lh.rasm_url.startsWith('http') || lh.rasm_url.startsWith('/') || lh.rasm_url.startsWith('data:')) ? (
                          <img
                            src={lh.rasm_url}
                            alt={lh.sarlavha}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0 shadow-2xs border border-pink-100"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border border-pink-200 flex items-center justify-center text-3xl shrink-0 shadow-2xs">
                            {lh.rasm_url || '💡'}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-extrabold text-[#DB2777] bg-pink-100 px-2 py-0.5 rounded-md border border-pink-200 uppercase">
                            {t(lh.kategoriya)}
                          </span>
                          <h3 className="font-extrabold text-[#2E121D] text-sm mt-1 leading-snug">
                            {t(lh.sarlavha)}
                          </h3>
                          <p className="text-xs text-[#9D4C6C] mt-1 line-clamp-2 leading-relaxed">
                            {t(lh.tavsif_matni)}
                          </p>
                        </div>
                      </div>

                      {/* Expand Action Indicator */}
                      <div className="w-full mt-2.5 pt-2 border-t border-[#F5F0E6] flex items-center justify-between text-xs font-bold text-[#059669]">
                        <span>{isExpanded ? t("Bosqichlarni yashirish") : t("Batafsil bosqichlarni ko'rish")}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>

                      {/* Step-by-step content */}
                      {isExpanded && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 pt-3 border-t border-dashed border-[#E5DEC3] space-y-2 animate-fadeIn"
                        >
                          <h4 className="font-extrabold text-xs text-[#2D2A26] uppercase tracking-wider mb-2">
                            {t("Ketma-ketlik bosqichlari")}:
                          </h4>
                          {lh.bosqichlar?.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-[#374151] bg-[#F7F5F0] p-3 rounded-xl border border-[#ECE5D8]">
                              <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{t(step)}</span>
                            </div>
                          ))}
                        </div>
                      )}
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


