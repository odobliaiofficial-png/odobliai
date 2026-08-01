import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Lifehack, LifehackCategory } from '../types';
import { Lightbulb, Sparkles, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const Lifehacklar: React.FC = () => {
  const { lifehacks, t, selectedLifehackId, setSelectedLifehackId } = useApp();
  const [selectedCat, setSelectedCat] = useState<LifehackCategory | 'barchasi'>('barchasi');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLifehackId) {
      setExpandedId(selectedLifehackId);
      setSelectedLifehackId(null);
    }
  }, [selectedLifehackId]);

  const categories: { id: LifehackCategory | 'barchasi'; label: string }[] = [
    { id: 'barchasi', label: 'Barchasi' },
    { id: 'pishirish_asoslari', label: 'Pishirish asoslari' },
    { id: 'oshxona_sirlari', label: 'Oshxona sirlari' },
    { id: 'mahsulotlarni_saqlash', label: 'Mahsulotlarni saqlash' },
    { id: 'tezkor_usullar', label: 'Tezkor usullar' },
    { id: 'masalliqlarni_tejash', label: 'Masalliqlarni tejash' },
    { id: 'karving', label: 'Karving' },
    { id: 'oyinchoq_yasash', label: "O'yinchoq yasash" },
    { id: 'uy_ishlari', label: 'Uy ishlari' },
    { id: 'boshqa', label: 'Boshqa' },
  ];



  const filteredHacks = lifehacks.filter(lh => {
    if (lh.holat !== 'nashr') return false;
    if (selectedCat === 'barchasi') return true;
    return lh.kategoriya === selectedCat;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 pb-36 pt-1">
      
      {/* Header Banner */}
      <div className="card-burgundy-banner p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <div>
          <span className="badge-gold text-xs font-extrabold px-2.5 py-0.5 rounded-full inline-block mb-1">
            💡 {t("Foydali Maslahatlar")}
          </span>
          <h2 className="text-base font-extrabold text-white tracking-tight leading-tight">
            {t("Oila & Ro'zg'or Lifehacklari")}
          </h2>
          <p className="text-xs text-white/90 mt-1 max-w-[240px]">
            {t("Oshxona, hunarmandchilik va ro'zg'or uchun tezkor yechimlar")}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-xs">
          💡
        </div>
      </div>

      {/* Category Chips with solid background styles */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 pr-6">
        {categories.map(cat => {
          const isActive = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap min-h-[38px] transition-all shadow-2xs active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-[#DB2777] to-[#EC4899] text-white shadow-md border border-pink-400'
                  : 'bg-white text-[#6B4E5B] border border-pink-200 hover:bg-pink-50'
              }`}
            >
              {t(cat.label)}
            </button>
          );
        })}
      </div>


      {/* Lifehack Cards - Entire card is clickable for seamless touch UX */}
      <div className="space-y-3">
        {filteredHacks.map(lh => {
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
        })}
      </div>

    </div>
  );
};

