import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Recipe, Tale } from '../types';
import { compressImage, uploadImageToSupabase, uploadImageWithStatus } from '../utils/imageCompressor';
import {
  Shield,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  ArrowLeft,
  Database,
  Sparkles,
  Trash2,
  Edit3,
  Download,
  Users,
  BookOpen,
  Utensils,
  Zap,
  HelpCircle,
  Award,
  Search,
  Filter,
  Check,
  TrendingUp,
  DollarSign,
  X,
  Clock,
  Layers,
  Image,
  Upload
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    user,
    progress,
    paymentProofs,
    verifyPaymentProof,
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleRecipeStatus,
    tales,
    addTale,
    lifehacks,
    addLifehack,
    deleteLifehack,
    toggleLifehackStatus,
    addRiddle,
    ingredients,
    addIngredient,
    grantUserPremium,
    exportBackupData,
    setActiveTab,
    bannerConfig,
    updateBannerConfig,
    isAdmin,
    t
  } = useApp();

  // Sub-tabs navigation
  const [activeAdminTab, setActiveAdminTab] = useState<'recipes' | 'banner' | 'lifehacks' | 'users' | 'dashboard'>('recipes');
  const [searchTerm, setSearchTerm] = useState('');

  // Recipe editor state
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeTime, setRecipeTime] = useState(25);
  const [recipeDiff, setRecipeDiff] = useState<Recipe['qiyinlik']>('oson');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeDesc, setRecipeDesc] = useState('');
  const [recipeIngredientsText, setRecipeIngredientsText] = useState('');
  const [recipeInstructionsText, setRecipeInstructionsText] = useState('');

  // Content editor state
  const [showTaleModal, setShowTaleModal] = useState(false);
  const [taleTitle, setTaleTitle] = useState('');
  const [taleAgeGroup, setTaleAgeGroup] = useState<Tale['yosh_toifasi']>('3-5');
  const [taleCover, setTaleCover] = useState('');
  const [taleContentText, setTaleContentText] = useState('');
  const [showLifehackModal, setShowLifehackModal] = useState(false);
  const [lifehackTitle, setLifehackTitle] = useState('');
  const [lifehackDesc, setLifehackDesc] = useState('');
  const [lifehackImage, setLifehackImage] = useState('');
  const [lifehackCategory, setLifehackCategory] = useState<'pishirish_asoslari' | 'karving' | 'oyinchoq_yasash' | 'uy_ishlari' | 'boshqa'>('pishirish_asoslari');

  const [riddleQuestion, setRiddleQuestion] = useState('');
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [riddleOptions, setRiddleOptions] = useState('');
  const [riddleAgeGroup, setRiddleAgeGroup] = useState<'3-5' | '6-8' | '9-12'>('3-5');
  const [, setShowRiddleModal] = useState(false);

  // Banner Form State
  const [bannerTitleInput, setBannerTitleInput] = useState<string>(bannerConfig?.title || '');
  const [bannerSubtitleInput, setBannerSubtitleInput] = useState<string>(bannerConfig?.subtitle || '');
  const [bannerBadgeInput, setBannerBadgeInput] = useState<string>(bannerConfig?.badge || '');
  const [bannerButtonTextInput, setBannerButtonTextInput] = useState<string>(bannerConfig?.button_text || '');
  const [bannerActionType, setBannerActionType] = useState<'pazanda' | 'recipes' | 'lifehacklar' | 'premium' | 'external_link'>(bannerConfig?.action_type || 'pazanda');
  const [bannerExternalUrl, setBannerExternalUrl] = useState<string>(bannerConfig?.external_url || '');
  const [bannerImageUrl, setBannerImageUrl] = useState<string>(bannerConfig?.image_url || '');
  const [isUploadingBanner, setIsUploadingBanner] = useState<boolean>(false);
  const [bannerSuccessToast, setBannerSuccessToast] = useState<string | null>(null);


  const processBannerFile = async (file: File) => {
    try {
      setIsUploadingBanner(true);
      const compressed = await compressImage(file, 1600, 0.8);
      const result = await uploadImageWithStatus(compressed, `banner_${Date.now()}`);
      setBannerImageUrl(result.url);
      setBannerSuccessToast(`✅ ${result.statusMessage} (${result.compressedSizeKB} KB)`);
      setTimeout(() => setBannerSuccessToast(null), 4000);
    } catch (err) {
      alert("Rasmni yuklashda xatolik yuz berdi");
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processBannerFile(file);
  };

  const handleBannerPaste = async (e: React.ClipboardEvent | ClipboardEvent) => {
    const clipboardData = 'clipboardData' in e ? e.clipboardData : null;
    if (!clipboardData) return;
    const items = clipboardData.items as DataTransferItemList;
    let handled = false;
    if (items) {
      for (const item of Array.from(items) as DataTransferItem[]) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const blob = item.getAsFile();
          if (blob) {
            await processBannerFile(blob);
            handled = true;
            break;
          }
        }
      }
    }
    if (!handled) {
      const text = clipboardData.getData('text/plain')?.trim();
      if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
        e.preventDefault();
        setBannerImageUrl(text);
      }
    }
  };

  /** Generic Ctrl+V paste handler — compresses and uploads, then calls setter */
  const handleImagePasteFor = (setter: (url: string) => void) => async (e: React.ClipboardEvent | ClipboardEvent) => {
    const clipboardData = 'clipboardData' in e ? e.clipboardData : null;
    if (!clipboardData) return;
    const items = clipboardData.items as DataTransferItemList;
    let handled = false;
    if (items) {
      for (const item of Array.from(items) as DataTransferItem[]) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const blob = item.getAsFile();
          if (!blob) return;
          try {
            const compressed = await compressImage(blob, 1600, 0.8);
            const result = await uploadImageWithStatus(compressed, `paste_${Date.now()}`);
            setter(result.url);
            handled = true;
          } catch {
            alert("Rasmni yuklashda xatolik yuz berdi");
          }
          break;
        }
      }
    }
    if (!handled) {
      const text = clipboardData.getData('text/plain')?.trim();
      if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
        e.preventDefault();
        setter(text);
      }
    }
  };

  /** Direct clipboard button click helper */
  const handleClipboardButtonClick = (setter: (url: string) => void, isBanner = false) => async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find(t => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const file = new File([blob], `clipboard_${Date.now()}.${imageType.split('/')[1] || 'png'}`, { type: imageType });
            if (isBanner) {
              await processBannerFile(file);
            } else {
              const compressed = await compressImage(file, 1600, 0.8);
              const result = await uploadImageWithStatus(compressed, `paste_${Date.now()}`);
              setter(result.url);
            }
            return;
          }
        }
      }
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        const trimmed = text?.trim();
        if (trimmed && (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/'))) {
          setter(trimmed);
          return;
        }
      }
      alert("Buferda rasm topilmadi. Avval rasmni nusxalang (Ctrl+C).");
    } catch {
      alert("Rasm nusxalangan bo'lsa, Ctrl+V tugmalarini bosing");
    }
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateBannerConfig({
      image_url: bannerImageUrl.trim(),
      title: bannerTitleInput.trim(),
      subtitle: bannerSubtitleInput.trim(),
      badge: bannerBadgeInput.trim(),
      button_text: bannerButtonTextInput.trim(),
      action_type: bannerActionType,
      external_url: bannerExternalUrl.trim()
    });
    setBannerSuccessToast('Banner sozlamalari saqlandi');
    window.setTimeout(() => setBannerSuccessToast(null), 2500);
  };


  // Recipe Handlers
  const handleOpenRecipeModal = (recipeToEdit?: Recipe) => {
    if (recipeToEdit) {
      setEditingRecipeId(recipeToEdit.id);
      setRecipeTitle(recipeToEdit.nomi);
      setRecipeTime(recipeToEdit.tayyorlash_vaqti_daq);
      setRecipeDiff(recipeToEdit.qiyinlik);
      setRecipeImage(recipeToEdit.rasm_url);
      setRecipeDesc(recipeToEdit.tarif_matni);
      setRecipeIngredientsText(recipeToEdit.masalliqlar_matni || '');
      setRecipeInstructionsText(recipeToEdit.korsatmalari?.join('\n') || '');
    } else {
      setEditingRecipeId(null);
      setRecipeTitle('');
      setRecipeTime(25);
      setRecipeDiff('oson');
      setRecipeImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
      setRecipeDesc('');
      setRecipeIngredientsText('Kartoshka, Sabzi, Piyoz, Ziravorlar');
      setRecipeInstructionsText('1. Masalliqlarni to`g`rang.\n2. Past olovda pishiring.');
    }
    setShowRecipeModal(true);
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeTitle.trim()) return;

    const instructionsArray = recipeInstructionsText
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean);

    if (editingRecipeId) {
      const existing = recipes.find(r => r.id === editingRecipeId);
      if (existing) {
        updateRecipe({
          ...existing,
          nomi: recipeTitle.trim(),
          tayyorlash_vaqti_daq: Number(recipeTime),
          qiyinlik: recipeDiff,
          rasm_url: recipeImage || existing.rasm_url,
          tarif_matni: recipeDesc || existing.tarif_matni,
          masalliqlar_matni: recipeIngredientsText,
          korsatmalari: instructionsArray.length > 0 ? instructionsArray : existing.korsatmalari
        });
      }
    } else {
      const newRec: Recipe = {
        id: `rec_${Date.now()}`,
        nomi: recipeTitle.trim(),
        tayyorlash_vaqti_daq: Number(recipeTime),
        qiyinlik: recipeDiff,
        rasm_url: recipeImage,
        tarif_matni: recipeDesc || 'Admin tomonidan qo`shilgan retsept.',
        masalliqlar_matni: recipeIngredientsText || 'Barcha ziravor va masalliqlar',
        korsatmalari: instructionsArray.length > 0 ? instructionsArray : ['Masalliqlarni tayyorlang', 'Past olovda 30 daqiqa dimlang'],
        holat: 'nashr',
        required_ingredient_ids: ['ing_kartoshka', 'ing_piyoz']
      };
      addRecipe(newRec);
    }
    setShowRecipeModal(false);
  };

  // Tale Save Handler
  const handleSaveTale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taleTitle.trim()) return;

    const newTale: Tale = {
      id: `tale_${Date.now()}`,
      sarlavha: taleTitle.trim(),
      yosh_toifasi: taleAgeGroup,
      muqova_rasm_url: taleCover,
      holat: 'nashr',
      muallif: 'Pazanda AI Jamoasi',
      sahifalar: [
        {
          id: `p1_${Date.now()}`,
          ertak_id: `tale_${Date.now()}`,
          tartib_raqami: 1,
          rasm_url: taleCover,
          matn: taleContentText || 'Bir bor ekan, bir yo`q ekan...'
        }
      ],
      created_at: new Date().toISOString()
    };

    addTale(newTale);
    setTaleTitle('');
    setTaleContentText('');
    setShowTaleModal(false);
  };

  // Lifehack Save Handler
  const handleSaveLifehack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lifehackTitle.trim()) return;

    addLifehack({
      id: `lh_${Date.now()}`,
      sarlavha: lifehackTitle.trim(),
      tavsif_matni: lifehackDesc || 'Foydali oilaviy maslahat.',
      rasm_url: lifehackImage,
      kategoriya: lifehackCategory,
      holat: 'nashr'
    });

    setLifehackTitle('');
    setLifehackDesc('');
    setShowLifehackModal(false);
  };

  // Riddle Save Handler
  const handleSaveRiddle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riddleQuestion.trim() || !riddleAnswer.trim()) return;

    const optionsArray = riddleOptions.split(',').map(o => o.trim()).filter(Boolean);
    if (!optionsArray.includes(riddleAnswer.trim())) {
      optionsArray.push(riddleAnswer.trim());
    }

    addRiddle({
      id: `rid_${Date.now()}`,
      savol: riddleQuestion.trim(),
      javob: riddleAnswer.trim(),
      variantlar: optionsArray,
      yosh_toifasi: riddleAgeGroup,
      qiyinlik: 'oson'
    });

    setRiddleQuestion('');
    setRiddleAnswer('');
    setShowRiddleModal(false);
  };

  // This component can only be used from the owner's authenticated Telegram
  // Mini App session. Public browser/PIN access is intentionally unavailable.
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-[#EFE8DC] shadow-xl max-w-sm w-full text-center space-y-4">
          <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto shadow-inner text-2xl">
            🔒
          </div>
          <div>
            <h3 className="text-lg font-black text-[#2D2A26]">Admin panel faqat Telegram MiniApp’da</h3>
            <p className="text-xs text-[#7C746B] mt-1">
              Boshqaruv uchun botni Telegram ichidan, egasi akkaunti bilan oching.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="w-full py-3 bg-gradient-to-r from-[#FF6B4A] to-[#FF8E72] text-white font-extrabold rounded-2xl shadow-md active:scale-[0.98] transition-transform"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const pendingPaymentsCount = paymentProofs.filter(p => p.holat === 'kutilmoqda').length;
  const totalApprovedPaymentsSum = paymentProofs
    .filter(p => p.holat === 'tasdiqlangan')
    .reduce((sum, p) => sum + p.summa, 0);

  return (
    <div className="space-y-6 pb-28 pt-2">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1A1816] via-[#2D2A26] to-[#433E38] p-5 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
          <Shield className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                <Database className="w-3 h-3" />
                Supabase Sync Ready
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                v2.0 Admin Hub
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Boshqaruv Markazi
            </h2>
            <p className="text-xs text-[#D1C9BD] mt-1 max-w-md">
              Barcha kontentlar, to'lovlar va foydalanuvchilar ma'lumotlarini real vaqt rejimida boshqaring.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportBackupData}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-xs"
              title="Barcha ma'lumotlarni JSON faylda yuklab olish"
            >
              <Download className="w-4 h-4 text-amber-400" />
              Backup (JSON)
            </button>

            <button
              onClick={() => setActiveTab('profil')}
              className="p-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-200 rounded-2xl text-xs font-bold transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Chiqish
            </button>
          </div>
        </div>
      </div>

      {/* Main Sub-Navigation Bar */}
      <div className="grid grid-cols-5 gap-1 bg-[#FAF6EF] p-1.5 rounded-2xl border border-[#EFE8DC] shadow-inner">
        <button
          onClick={() => setActiveAdminTab('recipes')}
          className={`py-2.5 px-1.5 text-[11px] font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'recipes'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          Retseptlar
        </button>

        <button
          onClick={() => setActiveAdminTab('banner')}
          className={`py-2.5 px-1.5 text-[11px] font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'banner'
              ? 'bg-[#DB2777] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          Banner (21:9)
        </button>

        <button
          onClick={() => setActiveAdminTab('lifehacks')}
          className={`py-2.5 px-1.5 text-[11px] font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'lifehacks'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Lifehacklar
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`py-2.5 px-1.5 text-[11px] font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'users'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Obunachilar
        </button>

        <button
          onClick={() => setActiveAdminTab('dashboard')}
          className={`py-2.5 px-1.5 text-[11px] font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'dashboard'
              ? 'bg-[#2D2A26] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Metrikalar
        </button>
      </div>

      {/* SECTION BANNER MANAGEMENT (21:9 Aspect Ratio) */}
      {activeAdminTab === 'banner' && (
        <div className="bg-white p-5 rounded-3xl border border-[#EFE8DC] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-pink-100 pb-3">
            <div>
              <h3 className="text-base font-black text-[#2E121D] flex items-center gap-2">
                <Image className="w-5 h-5 text-[#DB2777]" />
                <span>21:9 Hero Banner Sozlamalari</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Bosh sahifa yuqori qismidagi zamonaviy ingichka (21:9) bannerni va matnlarini boshqaring.
              </p>
            </div>
          </div>

          {bannerSuccessToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl animate-in fade-in">
              {bannerSuccessToast}
            </div>
          )}

          {/* Live 21:9 Banner Preview */}
          <div className="space-y-2">
            <span className="text-xs font-black text-stone-700 uppercase tracking-wider">
              📱 Bosh Sahifadagi Ko'rinishi (21:9 Aspect Ratio Live Preview):
            </span>
            <div className="w-full aspect-[21/9] relative overflow-hidden rounded-2xl shadow-lg border border-pink-200/60 bg-stone-900">
              {bannerImageUrl ? (
                <img
                  src={bannerImageUrl}
                  alt="Banner preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : null}

              <div className="absolute inset-0 bg-gradient-to-r from-rose-950/85 via-rose-900/65 to-transparent p-4 flex flex-col justify-between z-10">
                <div className="space-y-1 max-w-[70%]">
                  <span className="bg-amber-400/90 text-amber-950 text-[9.5px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    {bannerBadgeInput || "AQL-IDROK PAZANDA"}
                  </span>
                  <h2 className="text-sm font-black tracking-tight leading-tight text-white line-clamp-1 drop-shadow-xs">
                    {bannerTitleInput || "Pazanda AI — Mazali Retseptlar"}
                  </h2>
                  <p className="text-[10px] text-rose-100 line-clamp-1">
                    {bannerSubtitleInput || "Uydagi masalliqlardan milliy va mazali taomlar tayyorlang."}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="bg-amber-400 text-amber-950 font-black px-3 py-1 text-[11px] rounded-full flex items-center gap-1 shadow-md">
                    <span>{bannerButtonTextInput || "Retseptlarni Ko'rish"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleSaveBanner} className="space-y-4 pt-2">
            
            {/* Image upload field */}
            <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 space-y-2" onPaste={handleBannerPaste}>
              <label className="text-xs font-black text-[#2E121D] flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-[#DB2777]" />
                <span>Banner Rasmi (21:9 O'lchamga mos):</span>
              </label>
              
              <div className="flex items-center gap-3">
                <label className="px-4 py-2.5 bg-[#DB2777] hover:bg-[#BE185D] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>{isUploadingBanner ? "Yuklanmoqda..." : "Rasm Tanlash / Yuklash"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerImageUpload}
                    disabled={isUploadingBanner}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleClipboardButtonClick(setBannerImageUrl, true)}
                  className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                  title="Telegram Desktop / Buferdan rasmni joylash"
                >
                  <span>📋 Joylash (Paste)</span>
                </button>

                {bannerImageUrl && (
                  <button
                    type="button"
                    onClick={() => setBannerImageUrl('')}
                    className="px-3 py-2 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl hover:bg-rose-200 transition-colors"
                  >
                    Rasmni Olib Tashlash
                  </button>
                )}
              </div>

              <input
                type="text"
                value={bannerImageUrl}
                onChange={e => setBannerImageUrl(e.target.value)}
                onPaste={handleBannerPaste}
                placeholder="URL yoki Ctrl+V (📋 rasm qo'yish)"
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 bg-white focus:outline-none focus:border-[#DB2777]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Banner Sarlavhasi (Title):</label>
                <input
                  type="text"
                  value={bannerTitleInput}
                  onChange={e => setBannerTitleInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DB2777]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Beyj (Badge) Matni:</label>
                <input
                  type="text"
                  value={bannerBadgeInput}
                  onChange={e => setBannerBadgeInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DB2777]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Kichik Tavsif (Subtitle):</label>
                <input
                  type="text"
                  value={bannerSubtitleInput}
                  onChange={e => setBannerSubtitleInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DB2777]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Tugma Matni (Button Text):</label>
                <input
                  type="text"
                  value={bannerButtonTextInput}
                  onChange={e => setBannerButtonTextInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DB2777]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Tugma Harakati (CTA Action):</label>
              <select
                value={bannerActionType}
                onChange={e => setBannerActionType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#DB2777] font-semibold"
              >
                <option value="pazanda">🍲 Pazanda AI / Retseptlar Bo'limi</option>
                <option value="lifehacklar">💡 Lifehacklar Bo'limi</option>
                <option value="premium">👑 Premium Obuna Oynasi</option>
                <option value="external_link">🔗 Tashqi Havola (Telegram Link / Vebsayt)</option>
              </select>
            </div>

            {bannerActionType === 'external_link' && (
              <div className="space-y-1 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
                <label className="text-xs font-bold text-amber-900">Tashqi URL / Telegram Link:</label>
                <input
                  type="url"
                  value={bannerExternalUrl}
                  onChange={e => setBannerExternalUrl(e.target.value)}
                  placeholder="https://t.me/Pazandaaibot"
                  className="w-full text-xs p-2.5 rounded-xl border border-amber-300 bg-white focus:outline-none focus:border-[#DB2777]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#DB2777] to-[#F472B6] hover:from-[#BE185D] hover:to-[#DB2777] text-white text-xs font-black rounded-2xl shadow-md transition-all active:scale-98"
            >
              ✅ Banner Sozlamalarini Saqlash
            </button>

          </form>
        </div>
      )}

      {/* SECTION 1: DASHBOARD METRICS */}
      {activeAdminTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Foydalanuvchilar</span>
              <div className="text-2xl font-black text-[#2D2A26] flex items-center justify-between">
                <span>1,420</span>
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12% bu hafta
              </p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Kutilayotgan Cheklar</span>
              <div className="text-2xl font-black text-[#2D2A26] flex items-center justify-between">
                <span>{pendingPaymentsCount}</span>
                <Clock className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-[11px] text-[#7C746B] font-bold">
                Ko'rib chiqish kutilmoqda
              </p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Tasdiqlangan Tushum</span>
              <div className="text-xl font-black text-emerald-700 flex items-center justify-between">
                <span>{totalApprovedPaymentsSum.toLocaleString()} so'm</span>
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-[11px] text-emerald-600 font-bold">
                Jami obuna to'lovlari
              </p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Jami Kontentlar</span>
              <div className="text-2xl font-black text-[#2D2A26] flex items-center justify-between">
                <span>{recipes.length + tales.length + lifehacks.length}</span>
                <Layers className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-[11px] text-purple-600 font-bold">
                Retsept, Ertak va Hacklar
              </p>
            </div>
          </div>

          {/* Quick System Action Cards */}
          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-3">
            <h3 className="text-sm font-black text-[#2D2A26] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6B4A]" />
              Tezkor Boshqaruv Buyruqlari
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => handleOpenRecipeModal()}
                className="p-3 bg-[#FAF6EF] hover:bg-[#F3ECE0] rounded-2xl border border-[#EFE8DC] text-left transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                  ➕
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2D2A26]">Yangi Retsept Qo'shish</h4>
                  <p className="text-[10px] text-[#7C746B]">Pazanda AI va qidiruvga qo'shiladi</p>
                </div>
              </button>

              <button
                onClick={() => setShowTaleModal(true)}
                className="p-3 bg-[#FAF6EF] hover:bg-[#F3ECE0] rounded-2xl border border-[#EFE8DC] text-left transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center font-bold">
                  📖
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2D2A26]">Yangi Ertak Nashr Etish</h4>
                  <p className="text-[10px] text-[#7C746B]">Sehrli bolajon bo'limiga tushadi</p>
                </div>
              </button>

              <button
                onClick={() => grantUserPremium(30)}
                className="p-3 bg-[#FAF6EF] hover:bg-[#F3ECE0] rounded-2xl border border-[#EFE8DC] text-left transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                  👑
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2D2A26]">1 Oy Premium Berish</h4>
                  <p className="text-[10px] text-[#7C746B]">Hozirgi foydalanuvchiga obuna aktivlash</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PAYMENTS VERIFICATION INBOX */}
      {activeAdminTab === 'recipes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8C8479]" />
              <input
                type="text"
                placeholder="Retsept nomini qidirish..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#EFE8DC] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>
            <button
              onClick={() => handleOpenRecipeModal()}
              className="px-3.5 py-2 bg-[#FF6B4A] hover:bg-[#E55A39] text-white text-xs font-extrabold rounded-2xl flex items-center gap-1 shadow-xs transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Yangi retsept
            </button>
          </div>

          {/* Uploaded Images Inspector Box */}
          {(() => {
            const uploadedRecipes = recipes.filter(r => r.rasm_url.startsWith('data:') || r.rasm_url.startsWith('http') || r.rasm_url.startsWith('/assets/'));
            if (uploadedRecipes.length === 0) return null;

            return (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                    <span>🖼️</span> Yuklangan Rasmlar Inspektori ({uploadedRecipes.length} ta retsept)
                  </h4>
                  <span className="text-[10px] text-amber-800 font-bold bg-amber-200/60 px-2 py-0.5 rounded-full">
                    Avto-siqilgan WebP/JPEG
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {uploadedRecipes.map(rec => {
                    const isData = rec.rasm_url.startsWith('data:');
                    const approxKb = isData ? Math.round((rec.rasm_url.length * 0.75 / 1024) * 10) / 10 : 45;
                    return (
                      <div key={rec.id} className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-center gap-3">
                        <img src={rec.rasm_url} alt={rec.nomi} className="w-12 h-12 rounded-lg object-contain bg-stone-100 flex-shrink-0" />
                        <div className="min-w-0 flex-1 text-[11px]">
                          <h5 className="font-bold text-gray-900 truncate">{rec.nomi}</h5>
                          <p className="text-[10px] text-gray-500 font-medium">Hajmi: <strong className="text-emerald-600">{approxKb || 45} KB</strong> ({isData ? 'Siqilgan Base64' : 'URL rasm'})</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          <div className="space-y-2">
            {recipes
              .filter(r => r.nomi.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(recipe => (
                <div
                  key={recipe.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EFE8DC] flex items-center justify-between gap-3 text-xs shadow-2xs hover:border-[#FF6B4A]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={recipe.rasm_url}
                      alt={recipe.nomi}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EFE8DC]"
                    />
                    <div>
                      <h4 className="font-extrabold text-[#2D2A26]">{recipe.nomi}</h4>
                      <p className="text-[11px] text-[#7C746B] mt-0.5">
                        ⏱️ {recipe.tayyorlash_vaqti_daq} daq • Qiyinlik: {recipe.qiyinlik}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleRecipeStatus(recipe.id)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition-colors ${
                        recipe.holat === 'nashr'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {recipe.holat === 'nashr' ? 'Nashr qilingan' : 'Qoralama'}
                    </button>

                    <button
                      onClick={() => handleOpenRecipeModal(recipe)}
                      className="p-1.5 bg-[#FAF6EF] hover:bg-amber-100 text-amber-800 rounded-xl transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SECTION 5: LIFEHACKS & RIDDLES */}
      {activeAdminTab === 'lifehacks' && (
        <div className="space-y-6">
          {/* Lifehacks Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#2D2A26] text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Foydali Lifehacklar
              </h3>
              <button
                onClick={() => setShowLifehackModal(true)}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold rounded-2xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Hack qo'shish
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {lifehacks.map(lh => (
                <div key={lh.id} className="bg-white p-3.5 rounded-2xl border border-[#EFE8DC] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-[#2D2A26] block">{lh.sarlavha}</span>
                    <span className="text-[10px] text-[#8C8479]">Kategoriya: {lh.kategoriya}</span>
                  </div>
                  <button
                    onClick={() => deleteLifehack(lh.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: USER MANAGEMENT */}
      {activeAdminTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] space-y-3">
            <h3 className="font-extrabold text-[#2D2A26] text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Bosh foydalanuvchi profil ma'lumotlari
            </h3>

            <div className="p-3 bg-[#FAF6EF] rounded-2xl border border-[#EFE8DC] text-xs space-y-1">
              <p><strong>Ismi:</strong> {user.ism}</p>
              <p><strong>Telegram ID:</strong> {user.telegram_id}</p>
              <p><strong>Premium Status:</strong> {user.is_premium ? '👑 Aktiv (Premium)' : 'Standart (Bepul)'}</p>
              <p><strong>Jami To'plagan Ballari:</strong> {progress.jami_ball} ball</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => grantUserPremium(30)}
                className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                +30 Kun Premium Bepul Berish
              </button>

              <button
                onClick={() => grantUserPremium(365)}
                className="px-3 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                +1 Yillik VIP Obuna Berish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECIPE MODAL EDITOR */}
      {showRecipeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-md w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-sm text-[#2D2A26]">
                {editingRecipeId ? "Retseptni Tahrirlash" : "Yangi Retsept Qo'shish"}
              </h3>
              <button onClick={() => setShowRecipeModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecipe} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Retsept nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Qovurma Shurva"
                  value={recipeTitle}
                  onChange={e => setRecipeTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#2D2A26] block mb-1">Vaqti (daq)</label>
                  <input
                    type="number"
                    value={recipeTime}
                    onChange={e => setRecipeTime(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#2D2A26] block mb-1">Qiyinlik</label>
                  <select
                    value={recipeDiff}
                    onChange={e => setRecipeDiff(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="oson">Oson</option>
                    <option value="orta">O'rta</option>
                    <option value="qiyin">Qiyin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Rasm URL / Clipboard:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={recipeImage}
                    onChange={e => setRecipeImage(e.target.value)}
                    onPaste={handleImagePasteFor(setRecipeImage)}
                    placeholder="URL yoki Ctrl+V (📋 rasm qo'yish)"
                    className="flex-1 px-3 py-2 border rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleClipboardButtonClick(setRecipeImage)}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs shrink-0 flex items-center gap-1"
                  >
                    <span>📋 Joylash</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Masalliqlar (Vergul bilan)</label>
                <input
                  type="text"
                  value={recipeIngredientsText}
                  onChange={e => setRecipeIngredientsText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Pishirish Yo'riqnomasi (Har bir qatorda bitta bosqich)</label>
                <textarea
                  rows={3}
                  value={recipeInstructionsText}
                  onChange={e => setRecipeInstructionsText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6B4A] hover:bg-[#E55A39] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
              >
                Saqlash va Nashr Etish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TALE MODAL EDITOR */}
      {showTaleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-sm text-[#2D2A26]">Yangi Sehrli Ertak Qo'shish</h3>
              <button onClick={() => setShowTaleModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTale} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Ertak Sarlavhasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Zumrad va Qimmat"
                  value={taleTitle}
                  onChange={e => setTaleTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Yosh Toifasi</label>
                <select
                  value={taleAgeGroup}
                  onChange={e => setTaleAgeGroup(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="3-5">3-5 yosh</option>
                  <option value="6-8">6-8 yosh</option>
                  <option value="9-12">9-12 yosh</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Ertak Matni (1-sahifa)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Bir bor ekan, bir yo'q ekan..."
                  value={taleContentText}
                  onChange={e => setTaleContentText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
              >
                Ertakni Nashr Qilish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LIFEHACK MODAL */}
      {showLifehackModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-sm text-[#2D2A26]">Yangi Lifehack Qo'shish</h3>
              <button onClick={() => setShowLifehackModal(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLifehack} className="space-y-3">
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Sarlavha</label>
                <input
                  type="text"
                  required
                  placeholder="Sabzavotlarni tez va chiroyli to'g'rash"
                  value={lifehackTitle}
                  onChange={e => setLifehackTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Kategoriya</label>
                <select
                  value={lifehackCategory}
                  onChange={e => setLifehackCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="pishirish_asoslari">Pishirish asoslari</option>
                  <option value="karving">Karving</option>
                  <option value="oyinchoq_yasash">O'yinchoq yasash</option>
                  <option value="uy_ishlari">Uy ishlari</option>
                  <option value="boshqa">Boshqa</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Maslahat matni</label>
                <textarea
                  rows={3}
                  value={lifehackDesc}
                  onChange={e => setLifehackDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl"
              >
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      
    </div>
  );
};
