import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Sparkles,
  CheckCircle2,
  Heart,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  X,
  ChefHat,
  Lightbulb,
  Utensils,
  ChevronRight
} from 'lucide-react';

export const BoshSahifa: React.FC = () => {
  const {
    setActiveTab,
    t,
    recipes,
    lifehacks,
    openRecipeModal,
    openLifehackModal,
    bannerConfig
  } = useApp();

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const featuredRecipe1 = recipes[0];
  const featuredRecipe2 = recipes[1] || recipes[0];
  const featuredLifehack1 = lifehacks[0];
  const featuredLifehack2 = lifehacks[1] || lifehacks[0];

  const categories = [
    { 
      id: 'pazanda', 
      label: 'Pazanda AI', 
      icon: <ChefHat className="w-5 h-5 text-amber-600 drop-shadow-xs" />, 
      gradient: 'from-amber-100 to-orange-100 border-amber-200/80 shadow-amber-500/10' 
    },
    { 
      id: 'lifehacklar', 
      label: 'Lifehacklar', 
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 drop-shadow-xs" />, 
      gradient: 'from-emerald-100 to-teal-100 border-emerald-200/80 shadow-emerald-500/10' 
    },
    { 
      id: 'pazanda', 
      label: "Bo'limlar", 
      icon: <Utensils className="w-5 h-5 text-rose-600 drop-shadow-xs" />, 
      gradient: 'from-rose-100 to-pink-100 border-rose-200/80 shadow-rose-500/10' 
    },
  ];

  return (
    <div className="space-y-4 pb-28 pt-1">
      
      {/* STICKY SEARCH BAR */}
      <div className="sticky top-14 z-30 pt-1 bg-[#FFF5F7]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilterModal(true)}
            className="flex-1 bg-white border border-[#FCE7F3] rounded-full px-4 py-2.5 shadow-xs flex items-center gap-2.5 cursor-pointer hover:border-[#DB2777]/40 transition-colors"
          >
            <Search className="w-4 h-4 text-[#DB2777]" />
            <span className="text-xs font-medium text-[#9D4C6C] line-clamp-1">
              {t("Masalliq, retsept yoki lifehack qidiring...")}
            </span>
          </motion.div>
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowFilterModal(true)}
            className="w-10 h-10 rounded-full bg-[#DB2777] text-white flex items-center justify-center shadow-md shrink-0 hover:bg-[#BE185D] transition-colors"
            title="Qidirish"
          >
            <Search className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* CATEGORIES ROW */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {categories.map((cat, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setActiveTab(cat.id as any)}
            className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-2xl border border-[#FCE7F3] shadow-xs hover:shadow-md transition-all group"
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.gradient} border shadow-xs group-hover:scale-105 transition-transform`}>
              {cat.icon}
            </div>
            <span className="text-[11px] font-extrabold text-[#2E121D] truncate w-full text-center tracking-tight">
              {t(cat.label)}
            </span>
          </motion.button>
        ))}
      </div>

      {/* ULTRA-SLEEK 21:9 HERO BANNER WITH CUSTOM IMAGE SUPPORT */}
      <div className="w-full aspect-[21/9] relative overflow-hidden rounded-2xl shadow-lg group border border-pink-200/60">
        {bannerConfig.image_url ? (
          <img
            src={bannerConfig.image_url}
            alt={bannerConfig.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-950/85 via-rose-900/65 to-transparent p-3.5 flex flex-col justify-between z-10 backdrop-blur-[1px]">
          <div className="space-y-0.5 max-w-[70%]">
            <span className="bg-amber-400/90 text-amber-950 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-950" />
              {t(bannerConfig.badge || "AQL-IDROK PAZANDA")}
            </span>
            <h2 className="text-xs sm:text-sm font-black tracking-tight leading-tight text-white line-clamp-1 drop-shadow-xs">
              {t(bannerConfig.title || "Pazanda AI — Mazali Retseptlar")}
            </h2>
            <p className="text-[10px] text-rose-100 line-clamp-1 hidden sm:block">
              {t(bannerConfig.subtitle || "Uydagi masalliqlardan milliy va mazali taomlar tayyorlang.")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab('pazanda')}
              className="btn-gold-pill px-3 py-1 text-[10.5px] font-black flex items-center gap-1 shadow-md active:scale-95 transition-all"
            >
              <span>{t(bannerConfig.button_text || "Retseptlarni Ko'rish")}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* KUNLIK TAVSIYALAR SECTION */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="font-bold text-[#831843] text-xs uppercase tracking-wider">
            {t("Kunlik Sara Tavsiyalar")}
          </h3>
          <button 
            onClick={() => setActiveTab('pazanda')}
            className="text-xs font-bold text-[#DB2777] hover:underline"
          >
            {t("Hammasi >")}
          </button>
        </div>

        {/* 2-Column Recipe & Lifehack Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Card 1: Recipe 1 */}
          {featuredRecipe1 && (
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => openRecipeModal(featuredRecipe1)}
              className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
            >
              <button
                onClick={(e) => toggleFavorite(featuredRecipe1.id, e)}
                className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                  favorites[featuredRecipe1.id] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2 bg-pink-50 relative">
                  <img
                    src={featuredRecipe1.rasm_url}
                    alt={featuredRecipe1.nomi}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-pink-100 text-[8px] flex items-center justify-center font-bold text-pink-800">
                      👨‍🍳
                    </span>
                    <span className="truncate max-w-[50px]">Pazanda</span>
                    <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500 text-white" />
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>

                <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                  {t(featuredRecipe1.nomi)}
                </h4>
              </div>

              <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
                <span className="text-[#DB2777] font-bold text-[11px]">
                  {featuredRecipe1.tayyorlash_vaqti_daq} {t("daq")}
                </span>
                <span className="bg-pink-50 text-[#DB2777] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-pink-100 capitalize">
                  {t(featuredRecipe1.qiyinlik)}
                </span>
              </div>
            </motion.div>
          )}

          {/* Card 2: Recipe 2 */}
          {featuredRecipe2 && (
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => openRecipeModal(featuredRecipe2)}
              className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
            >
              <button
                onClick={(e) => toggleFavorite(featuredRecipe2.id, e)}
                className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                  favorites[featuredRecipe2.id] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2 bg-pink-50 relative">
                  <img
                    src={featuredRecipe2.rasm_url}
                    alt={featuredRecipe2.nomi}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-orange-100 text-[8px] flex items-center justify-center font-bold text-orange-800">
                      🍲
                    </span>
                    <span className="truncate max-w-[50px]">Retsept</span>
                    <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500 text-white" />
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>5.0</span>
                  </div>
                </div>

                <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                  {t(featuredRecipe2.nomi)}
                </h4>
              </div>

              <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
                <span className="text-[#DB2777] font-bold text-[11px]">
                  {featuredRecipe2.tayyorlash_vaqti_daq} {t("daq")}
                </span>
                <span className="bg-pink-50 text-[#DB2777] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-pink-100 capitalize">
                  {t(featuredRecipe2.qiyinlik)}
                </span>
              </div>
            </motion.div>
          )}

          {/* Card 3: Lifehack 1 */}
          {featuredLifehack1 && (
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => openLifehackModal(featuredLifehack1)}
              className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
            >
              <button
                onClick={(e) => toggleFavorite(featuredLifehack1.id, e)}
                className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                  favorites[featuredLifehack1.id] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2 bg-emerald-50 relative">
                  <img
                    src={featuredLifehack1.rasm_url}
                    alt={featuredLifehack1.sarlavha}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'; }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-[8px] flex items-center justify-center font-bold text-emerald-800">
                      💡
                    </span>
                    <span>{t("Lifehack")}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>

                <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                  {t(featuredLifehack1.sarlavha)}
                </h4>
              </div>

              <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
                <span className="text-[#059669] font-bold text-[11px]">
                  {t("Maslahat")}
                </span>
                <span className="bg-emerald-50 text-[#059669] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {t("O'tish")}
                </span>
              </div>
            </motion.div>
          )}

          {/* Card 4: Lifehack 2 */}
          {featuredLifehack2 && (
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => openLifehackModal(featuredLifehack2)}
              className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
            >
              <button
                onClick={(e) => toggleFavorite(featuredLifehack2.id, e)}
                className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                  favorites[featuredLifehack2.id] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2 bg-emerald-50 relative">
                  <img
                    src={featuredLifehack2.rasm_url}
                    alt={featuredLifehack2.sarlavha}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'; }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-[8px] flex items-center justify-center font-bold text-emerald-800">
                      💡
                    </span>
                    <span>{t("Lifehack")}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>4.8</span>
                  </div>
                </div>

                <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                  {t(featuredLifehack2.sarlavha)}
                </h4>
              </div>

              <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
                <span className="text-[#059669] font-bold text-[11px]">
                  {t("Maslahat")}
                </span>
                <span className="bg-emerald-50 text-[#059669] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {t("O'tish")}
                </span>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* FILTER & SEARCH OVERLAY MODAL */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 pt-12 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md max-h-[85vh] rounded-3xl p-4 border border-[#FCE7F3] shadow-2xl flex flex-col space-y-3">
            
            <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-2.5">
              <span className="text-xs font-bold text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#DB2777]" />
                {t("Qidiruv va Filtr")}
              </span>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 rounded-full hover:bg-pink-50 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-[#DB2777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                placeholder={t("Retsept yoki lifehack nomini yozing...")}
                className="w-full pl-9 pr-4 py-2 rounded-2xl bg-pink-50/50 border border-[#FCE7F3] text-xs focus:outline-none focus:border-[#DB2777]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pt-1">
              {!filterSearch.trim() ? (
                <p className="text-center text-xs text-[#9D4C6C] py-8">
                  {t("Ilovadagi barcha retseptlar va lifehacklarni tezda toping.")}
                </p>
              ) : (
                <div className="space-y-2">
                  {/* Recipes */}
                  {recipes
                    .filter(r => r.nomi.toLowerCase().includes(filterSearch.toLowerCase()))
                    .map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setShowFilterModal(false);
                          setFilterSearch('');
                          openRecipeModal(r);
                        }}
                        className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#FCE7F3] hover:border-[#FF6B4A] cursor-pointer flex items-center justify-between text-xs font-semibold text-[#2E121D]"
                      >
                        <div className="flex items-center gap-2">
                          <span>🍲</span>
                          <span>{t(r.nomi)}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#FF6B4A]" />
                      </div>
                    ))}

                  {/* Lifehacks */}
                  {lifehacks
                    .filter(l => l.sarlavha.toLowerCase().includes(filterSearch.toLowerCase()))
                    .map(lh => (
                      <div
                        key={lh.id}
                        onClick={() => {
                          setShowFilterModal(false);
                          setFilterSearch('');
                          openLifehackModal(lh);
                        }}
                        className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#FCE7F3] hover:border-[#059669] cursor-pointer flex items-center justify-between text-xs font-semibold text-[#2E121D]"
                      >
                        <div className="flex items-center gap-2">
                          <span>💡</span>
                          <span>{t(lh.sarlavha)}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#059669]" />
                      </div>
                    ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
