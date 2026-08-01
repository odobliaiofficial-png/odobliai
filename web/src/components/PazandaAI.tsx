import { compressImage, uploadImageToSupabase } from '../utils/imageCompressor';
import { fuzzyMatchSearch } from '../utils/searchNormalizer';
import React, { useState, useMemo, useEffect } from 'react';

import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Recipe, IngredientCategory } from '../types';
import {
  Sparkles,
  Check,
  Clock,
  ChefHat,
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Search,
  Book,
  Utensils,
  ShoppingCart,
  PlusCircle,
  CheckCircle2,
  Trash2,
  Share2,
  Heart,
  Timer as TimerIcon,
  Play,
  Pause,
  RotateCcw,
  Users,
  Flame,
  Copy,
  Plus,
  Square,
  ChevronDown,
  ChevronRight,
  X,
  Pencil,
  Upload,
  Save,
  SlidersHorizontal,
  Filter
} from 'lucide-react';



const FOLDER_CATEGORIES = [
  { id: 'Milliy Taomlar', title: "Milliy Taomlar", emoji: "🍚", color: "from-amber-500 to-orange-600", desc: "Palov, Manti, Somsa, Dimlama..." },
  { id: 'Salatlar', title: "Salatlar", emoji: "🥗", color: "from-emerald-500 to-teal-600", desc: "Toshkent salati, Achichuk..." },
  { id: 'Tortlar va Chizkeyklar', title: "Tortlar va Chizkeyklar", emoji: "🍰", color: "from-pink-500 to-rose-600", desc: "Medovik, Chizkeyklar, Tortlar..." },
  { id: 'Piroglar va Tartlar', title: "Piroglar va Tartlar", emoji: "🥧", color: "from-amber-600 to-yellow-700", desc: "Mevali galetta, Tartlar, Piroglar..." },
  { id: 'Pechenye va Biskvitlar', title: "Pechenye va Biskvitlar", emoji: "🍪", color: "from-yellow-500 to-amber-600", desc: "Şekerpare, Biskvit, Pechenyelar..." },
  { id: 'Kekslar va Mafinlar', title: "Kekslar va Mafinlar", emoji: "🧁", color: "from-purple-500 to-pink-500", desc: "Mafinlar, Keks, Noni..." },
  { id: 'Shirinliklar', title: "Shirinliklar", emoji: "🍩", color: "from-red-500 to-pink-600", desc: "Loqum, Sütlaç, Baqlava, Brauni..." },
  { id: 'Nonushta va Pishiriqlar', title: "Nonushta va Pishiriqlar", emoji: "🍞", color: "from-orange-400 to-amber-500", desc: "Vafli, Mochi, Pishiriqlar..." },
  { id: 'Go\'sht va Parranda Taomlari', title: "Go'sht va Parranda Taomlari", emoji: "🍗", color: "from-red-600 to-amber-700", desc: "Tovuq, Gratin, Baliq taomlari..." },
  { id: 'Garnirlar va Sabzavotli Taomlar', title: "Garnirlar va Sabzavotli Taomlar", emoji: "🥔", color: "from-green-600 to-lime-600", desc: "Pyure, Lobiya, Bouli..." },
  { id: 'Ichimliklar', title: "Ichimliklar", emoji: "🍹", color: "from-cyan-500 to-blue-600", desc: "Agua Freska, Salqin ichimliklar..." },
  { id: 'Muzqaymoq va Sovuq Desertlar', title: "Muzqaymoq va Sovuq Desertlar", emoji: "🍨", color: "from-indigo-500 to-purple-600", desc: "Muzqaymoq, Sovuq desertlar..." },
];

export const PazandaAI: React.FC = () => {
  const {
    ingredients,
    recipes,
    t,
    shoppingList,
    addToShoppingList,
    addMultipleToShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearShoppingList,
    favoriteRecipeIds,
    toggleFavoriteRecipe,
    timerSeconds,
    initialTimerSeconds,
    isTimerRunning,
    startGlobalTimer,
    pauseGlobalTimer,
    resumeGlobalTimer,
    stopGlobalTimer,
    setCustomTimer,
    selectedRecipeModal,
    setSelectedRecipeModal,
    isAdmin,
    updateRecipe,
    deleteRecipe,
    categoryCovers,
    updateCategoryCover,
    selectedFolderCategory,
    setSelectedFolderCategory,
    searchQuery,
    setSearchQuery,
    timeFilter,
    setTimeFilter,
    diffFilter,
    setDiffFilter,
    resetPazandaFilters
  } = useApp();

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Category Cover Edit State (4:3 ratio)
  const [editingCatCoverId, setEditingCatCoverId] = useState<string | null>(null);
  const [catCoverUrlInput, setCatCoverUrlInput] = useState('');
  const [isUploadingCatCover, setIsUploadingCatCover] = useState(false);

  // Admin In-Place Recipe Edit State
  const [adminEditingRecipe, setAdminEditingRecipe] = useState<Recipe | null>(null);
  const [editNomi, setEditNomi] = useState('');
  const [editKategoriya, setEditKategoriya] = useState('');
  const [editVaqti, setEditVaqti] = useState(30);
  const [editQiyinlik, setEditQiyinlik] = useState<'oson' | 'orta' | 'qiyin'>('oson');
  const [editRasmUrl, setEditRasmUrl] = useState('');
  const [editTarif, setEditTarif] = useState('');
  const [editMasalliqlar, setEditMasalliqlar] = useState('');
  const [editKorsatmalar, setEditKorsatmalar] = useState('');
  const [isCompressingImage, setIsCompressingImage] = useState(false);

  // Active Recipe modal & matchmaking
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [showMatchedRecipesModal, setShowMatchedRecipesModal] = useState<boolean>(false);

  // Tab mode: 'catalog' (Retseptlar) | 'match' (Masalliqlardan) | 'bozorlik' | 'timer'
  const [customMinutesInput, setCustomMinutesInput] = useState<string>('20');
  const [viewMode, setViewMode] = useState<'match' | 'catalog' | 'bozorlik' | 'timer'>('catalog');

  // Search queries & Advanced Recipe Filters
  const [ingredientSearch, setIngredientSearch] = useState<string>('');
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);


  // Selected ingredient IDs for match mode
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory | 'barchasi'>('barchasi');

  // Automatic dish ingredient generator in Bozorlik tab
  const [selectedDishRecipeId, setSelectedDishRecipeId] = useState<string>('');
  const [dishPortions, setDishPortions] = useState<number>(4);
  const [showDishSelectModal, setShowDishSelectModal] = useState<boolean>(false);
  const [dishSearch, setDishSearch] = useState<string>('');

  // Portion scaler and saved recipe IDs
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [portions, setPortions] = useState<number>(4);
  const [selectedRecipeIngredients, setSelectedRecipeIngredients] = useState<string[]>([]);


  useEffect(() => {
    setActiveRecipe(selectedRecipeModal);
  }, [selectedRecipeModal]);



  const processImageFile = async (file: File) => {
    try {
      setIsCompressingImage(true);
      const compressed = await compressImage(file);
      const url = await uploadImageToSupabase(compressed);
      setEditRasmUrl(url);
    } catch (error) {
      showToast("❌ Rasmni yuklashda xatolik yuz berdi");
    } finally {
      setIsCompressingImage(false);
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processImageFile(file);
  };

  const handleImagePaste = async (e: ClipboardEvent | React.ClipboardEvent) => {
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
            await processImageFile(blob);
            handled = true;
            break;
          }
        }
      }
    }

    if (!handled) {
      const pastedText = clipboardData.getData('text/plain')?.trim();
      if (pastedText && (pastedText.startsWith('http://') || pastedText.startsWith('https://') || pastedText.startsWith('data:image/'))) {
        e.preventDefault();
        setEditRasmUrl(pastedText);
        showToast("✅ Rasm havolasi buferdan qo'yildi!");
      }
    }
  };

  const [selectedShopCategory, setSelectedShopCategory] = useState<string>('barchasi');

  const getShoppingItemCategory = (nomi: string): string => {
    const name = nomi.toLowerCase();
    if (
      name.includes('olma') || name.includes('nok') || name.includes('qulupnay') || 
      name.includes('avokado') || name.includes('limon') || name.includes('laym') || 
      name.includes('uzum') || name.includes('orik') || name.includes('o\'rik') || 
      name.includes('shoftoli') || name.includes('behi') || name.includes('anor') || 
      name.includes('banan') || name.includes('apelsin') || name.includes('mandarin') || 
      name.includes('malina') || name.includes('chernika') || name.includes('klukva')
    ) {
      return 'meva';
    }
    if (
      name.includes('yog') || name.includes('yog\'') || name.includes('paxta yog') || 
      name.includes('zaytun yog') || name.includes('kunjut yog') || name.includes('sous') || 
      name.includes('tomat') || name.includes('mayonez') || name.includes('ketchup') || name.includes('sirka')
    ) {
      return 'yogi';
    }
    if (
      name.includes('kakao') || name.includes('shokolad') || name.includes('shakar') || 
      name.includes('vanil') || name.includes('razraxlitel') || name.includes('soda') || 
      name.includes('sgushchenka') || name.includes('djem') || name.includes('pechenye') || 
      name.includes('kraxmal') || name.includes('ekstrakt') || name.includes('asal') || name.includes('qand')
    ) {
      return 'qandolat';
    }
    if (
      name.includes('kartoshka') || name.includes('sabzi') || name.includes('piyoz') || 
      name.includes('pomidor') || name.includes('bodring') || name.includes('karam') || 
      name.includes('sarimsoq') || name.includes('ko\'kat') || name.includes('kashnich') || 
      name.includes('shivit') || name.includes('baqlajon') || name.includes('bulg\'or') || 
      name.includes('sholgom') || name.includes('qovoq') || name.includes('ismaloq') || 
      name.includes('rayhon') || name.includes('yalpiz') || name.includes('zanjabil') || 
      name.includes('qo\'ziqorin') || name.includes('qabachki') || name.includes('lavlagi') || 
      name.includes('rediska') || name.includes('rukola') || name.includes('zaytun') || name.includes('oliva') || name.includes('zukkini')
    ) {
      return 'sabzavot';
    }
    if (
      name.includes('go\'sht') || name.includes('tovuq') || name.includes('qoy') || 
      name.includes('qo\'y') || name.includes('mol') || name.includes('qiyma') || 
      name.includes('lahm') || name.includes('kalla') || name.includes('suyak') || 
      name.includes('o\'rdak') || name.includes('ordak') || name.includes('g\'oz') || 
      name.includes('goz') || name.includes('kurka') || name.includes('bedana') || 
      name.includes('quyon') || name.includes('ot go\'shti') || name.includes('qazi') || 
      name.includes('jigar') || name.includes('til') || name.includes('baliq')
    ) {
      return 'gosht';
    }
    if (
      name.includes('sut') || name.includes('qatiq') || name.includes('qaymoq') || 
      name.includes('pishloq') || name.includes('sariyog') || name.includes('suzma') || 
      name.includes('tvorog') || name.includes('slivki') || name.includes('chakka') || 
      name.includes('ayron') || name.includes('brinza') || name.includes('qurut') || name.includes('tuxum')
    ) {
      return 'sut_mahsuloti';
    }
    if (
      name.includes('guruch') || name.includes('mosh') || name.includes('noxot') || 
      name.includes('no\'xat') || name.includes('loviya') || name.includes('un') || 
      name.includes('makaron') || name.includes('grechka') || name.includes('manniy') || 
      name.includes('ugra') || name.includes('lag\'mon') || name.includes('lagmon') || 
      name.includes('noodle') || name.includes('somsa') || name.includes('manti') || 
      name.includes('yasmiq') || name.includes('bulgur') || name.includes('kuskus') || name.includes('gerkules') || name.includes('bodom uni')
    ) {
      return 'dukkakli';
    }
    if (
      name.includes('zira') || name.includes('murch') || name.includes('tuz') || 
    name.includes('ziravor') || name.includes('lavr') || 
      name.includes('kunjut') || name.includes('paprika') || name.includes('zirk') || 
      name.includes('mayiz') || name.includes('dolchin') || name.includes('zafron') || 
      name.includes('yongoq') || name.includes('bodom') || name.includes('pista') || name.includes('turshak') || name.includes('kardamon') || name.includes('funtuk')
    ) {
      return 'ziravor';
    }
    return 'boshqa';
  };

  const categoryLabels: { id: IngredientCategory | 'barchasi'; label: string }[] = [
    { id: 'barchasi', label: '✨ Barchasi' },
    { id: 'sabzavot', label: '🥦 Sabzavotlar' },
    { id: 'meva', label: '🍎 Mevalar' },
    { id: 'gosht', label: "🥩 Go'sht" },
    { id: 'sut_mahsuloti', label: '🥛 Sut & Tuxum' },
    { id: 'dukkakli', label: '🌾 Dukkakli & Don' },
    { id: 'qandolat', label: '🍫 Qandolat & Pishiriq' },
    { id: 'yogi', label: "🫗 Yog'lar & Souslar" },
    { id: 'ziravor', label: "🧂 Ziravor & Yong'oq" },
    { id: 'boshqa', label: '📦 Boshqa' },
  ];

  const filteredShoppingList = useMemo(() => {
    if (selectedShopCategory === 'barchasi') return shoppingList;
    return shoppingList.filter(item => getShoppingItemCategory(item.nomi) === selectedShopCategory);
  }, [shoppingList, selectedShopCategory]);

  // Toggle ingredient selection
  const toggleIngredient = (id: string) => {
    setSelectedIngredientIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtered ingredients with Smart Typo Tolerance & Fuzzy Search
  const filteredIngredients = useMemo(() => {
    let list = ingredients;
    if (selectedCategory !== 'barchasi') {
      list = list.filter(i => i.kategoriya === selectedCategory);
    }
    if (ingredientSearch.trim()) {
      list = list.filter(i => fuzzyMatchSearch(i.nomi, ingredientSearch));
    }
    return list;
  }, [ingredients, selectedCategory, ingredientSearch]);

  // Matchmaking Algorithm (Ranks 100% full matches, missing 1, and all partial matches)
  const matchingResults = useMemo(() => {
    const publishedRecipes = recipes.filter(r => r.holat !== 'qoralama');
    
    const fullMatch: { recipe: Recipe; missingNames: string[]; matchPercent: number }[] = [];
    const missingOne: { recipe: Recipe; missingNames: string[]; matchPercent: number }[] = [];
    const partialMatch: { recipe: Recipe; missingNames: string[]; matchPercent: number }[] = [];

    if (selectedIngredientIds.length === 0) {
      return { fullMatch: [], missingOne: [], partialMatch: [], allMatches: [] };
    }

    publishedRecipes.forEach(recipe => {
      const required = recipe.required_ingredient_ids || [];
      if (required.length === 0) return;

      const matchedIds = required.filter(id => selectedIngredientIds.includes(id));
      const missingIds = required.filter(id => !selectedIngredientIds.includes(id));

      if (matchedIds.length === 0) return;

      const matchPercent = Math.round((matchedIds.length / required.length) * 100);

      const resolveIngredientName = (id: string): string => {
        const found = ingredients.find(ing => ing.id === id);
        if (found) return found.nomi;
        return id;
      };

      const missingNames = missingIds.map(id => resolveIngredientName(id));
      const matchItem = { recipe, missingNames, matchPercent };

      if (missingIds.length === 0) {
        fullMatch.push(matchItem);
      } else if (missingIds.length === 1) {
        missingOne.push(matchItem);
      } else {
        partialMatch.push(matchItem);
      }
    });

    partialMatch.sort((a, b) => b.matchPercent - a.matchPercent);
    const allMatches = [...fullMatch, ...missingOne, ...partialMatch];

    return { fullMatch, missingOne, partialMatch, allMatches };
  }, [recipes, selectedIngredientIds, ingredients]);


  // Lock body scroll whenever any modal is open — bulletproof iOS Safari / Telegram WebView fix
  useEffect(() => {
    const isModalOpen = Boolean(activeRecipe || showMatchedRecipesModal || showDishSelectModal);
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [activeRecipe, showMatchedRecipesModal, showDishSelectModal]);

  // Catalog Recipes with Folder Category, Search, Time & Difficulty filters
  const catalogRecipes = useMemo(() => {
    let published = recipes.filter(r => r.holat !== 'qoralama');

    if (selectedFolderCategory && selectedFolderCategory !== 'all') {
      published = published.filter(r => {
        const cat = r.kategoriya || 'Milliy Taomlar';
        return cat.toLowerCase().trim() === selectedFolderCategory.toLowerCase().trim();
      });
    }

    if (searchQuery.trim()) {
      published = published.filter(r =>
        fuzzyMatchSearch(r.nomi, searchQuery) ||
        (r.tarif_matni && fuzzyMatchSearch(r.tarif_matni, searchQuery)) ||
        (r.masalliqlar_matni && fuzzyMatchSearch(r.masalliqlar_matni, searchQuery))
      );
    }

    if (timeFilter !== 'all') {
      published = published.filter(r => {
        const minutes = r.tayyorlash_vaqti_daq || 30;
        if (timeFilter === 'quick') return minutes < 30;
        if (timeFilter === 'medium') return minutes >= 30 && minutes <= 60;
        if (timeFilter === 'long') return minutes > 60;
        return true;
      });
    }

    if (diffFilter !== 'all') {
      published = published.filter(r => {
        const diff = (r.qiyinlik || 'orta').toLowerCase();
        return diff === diffFilter.toLowerCase();
      });
    }

    return published;
  }, [recipes, searchQuery, selectedFolderCategory, timeFilter, diffFilter]);

  // Parsed ingredient items for active recipe modal
  const recipeIngredientItems = useMemo(() => {
    if (!activeRecipe) return [];
    const items = activeRecipe.masalliqlar_matni
      .split(/,|\n/)
      .map(str => str.trim())
      .filter(Boolean);
    return items;
  }, [activeRecipe]);

  useEffect(() => {

    if (activeRecipe) {
      const items = activeRecipe.masalliqlar_matni
        .split(/,|\n/)
        .map(str => str.trim())
        .filter(Boolean);
      setSelectedRecipeIngredients(items);
      setPortions(4);
    }
  }, [activeRecipe]);

  // Helper to scale portion quantities in string (e.g., "1 kg" -> "2 kg", "500 g" -> "1000 g")
  const scaleIngredientString = (ingStr: string, basePortions: number, targetPortions: number) => {
    const factor = targetPortions / basePortions;
    if (factor === 1) return ingStr;

    return ingStr.replace(/(\d+(?:[.,]\d+)?)/g, (match) => {
      const num = parseFloat(match.replace(',', '.'));
      if (isNaN(num)) return match;
      const scaled = Math.round(num * factor * 10) / 10;
      return scaled.toString();
    });
  };

  // (State declarations for Bozorlik tab moved above useEffect to avoid TDZ)

  // Add parsed ingredients to shopping list
  const addRecipeIngredientsToShoppingList = (itemsToAdd: string[]) => {
    if (!activeRecipe || itemsToAdd.length === 0) return;
    
    // Check if already saved
    if (savedRecipeIds.includes(activeRecipe.id)) {
      showToast(`✅ ${t(activeRecipe.nomi)} masalliqlari allaqachon saqlangan!`);
      return;
    }

    const formatted = itemsToAdd.map(item => {
      const scaled = scaleIngredientString(item, 4, portions);
      return {
        nomi: scaled,
        miqdori: `${t(activeRecipe.nomi)} (${portions} kishilik)`
      };
    });

    addMultipleToShoppingList(formatted);
    setSavedRecipeIds(prev => [...prev, activeRecipe.id]);
    showToast(`🛒 ${itemsToAdd.length} ta masalliq Bozorlik ro'yxatiga saqlandi!`);
  };

  // Add ingredients by dish selection in Bozorlik tab
  const handleAddDishToShoppingList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDishRecipeId) return;

    const targetRecipe = recipes.find(r => r.id === selectedDishRecipeId);
    if (!targetRecipe) return;

    const items = targetRecipe.masalliqlar_matni
      .split(/,|\n/)
      .map(str => str.trim())
      .filter(Boolean);

    const formatted = items.map(item => {
      const scaled = scaleIngredientString(item, 4, dishPortions);
      return {
        nomi: scaled,
        miqdori: `${t(targetRecipe.nomi)} (${dishPortions} kishilik)`
      };
    });

    addMultipleToShoppingList(formatted);
    setSelectedDishRecipeId('');
    showToast(`✅ ${t(targetRecipe.nomi)} uchun ${items.length} ta masalliq avtomatik qo'shildi!`);
  };

  // Copy recipe details for Telegram
  const copyRecipeForTelegram = () => {
    if (!activeRecipe) return;
    const text = `🍲 *${t(activeRecipe.nomi)}* (${portions} kishilik)\n\n` +
      `⏱ Tayyorlash vaqti: ${activeRecipe.tayyorlash_vaqti_daq} daqiqa\n` +
      `📊 Qiyinlik: ${t(activeRecipe.qiyinlik)}\n\n` +
      `🛒 *Kerakli masalliqlar:*\n` +
      recipeIngredientItems.map(item => `• ${t(scaleIngredientString(item, 4, portions))}`).join('\n') +
      `\n\n📖 *Tayyorlanishi:*\n` +
      activeRecipe.korsatmalari.map((k, i) => `${i + 1}. ${t(k)}`).join('\n') +
      `\n\n✨ _Pazanda AI orqali tayyorlandi_\n👉 Botimiz: @Pazandaaibot`;

    navigator.clipboard.writeText(text);
    showToast("📋 Retsept va bozorlik ro'yxati nusxalandi! Telegramga joylashingiz mumkin.");
  };

  // Shopping List state in bozorlik tab
  const [newShopName, setNewShopName] = useState('');
  const [newShopQty, setNewShopQty] = useState('');

  const handleAddCustomShopItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShopName.trim()) return;
    addToShoppingList(newShopName, newShopQty);
    setNewShopName('');
    setNewShopQty('');
    showToast("✅ Bozorlik ro'yxatiga qo'shildi!");
  };

  const pendingCount = shoppingList.filter(s => !s.bajarildi).length;

  return (
    <div className="space-y-5 pb-28 pt-1">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{t(toastMessage)}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="card-rose-banner p-4 rounded-2xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1 bg-white/20 text-[#FBBF24] text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1 border border-white/20">
            <Sparkles className="w-3 h-3 text-[#FBBF24]" />
            {t("O'zbek Milliy Taomlar Bazi")}
          </div>
          <h2 className="text-base font-extrabold text-white tracking-tight mt-1">
            {t("Pazanda AI Retseptlar")}
          </h2>
          <p className="text-[11px] text-white/90 mt-0.5 max-w-[240px] leading-snug">
            {t("Bor masalliqlardan taom toping, bozorlik ro'yxatini shakllantiring va taymerdan foydalaning")}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-xs">
          🍳
        </div>
      </div>

      {/* Main Navigation Modes (4 Tabs) */}
      <div className="card-pink p-1 rounded-2xl grid grid-cols-4 gap-1 bg-white">
        <button
          onClick={() => setViewMode('catalog')}
          className={`py-2 rounded-xl text-[11px] font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[46px] ${
            viewMode === 'catalog'
              ? 'bg-[#DB2777] text-white shadow-xs'
              : 'text-[#9D4C6C] hover:bg-pink-50'
          }`}
        >
          <Book className="w-4 h-4" />
          <span className="truncate">{t("Retseptlar")} ({recipes.length})</span>
        </button>

        <button
          onClick={() => setViewMode('match')}
          className={`py-2 rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5 min-h-[46px] relative overflow-hidden active:scale-97 ${
            viewMode === 'match'
              ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-rose-600 text-white shadow-md ring-2 ring-pink-300'
              : 'bg-gradient-to-r from-amber-50 to-pink-50 text-[#DB2777] border border-amber-200 hover:bg-pink-100'
          }`}
        >
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="truncate">Pazanda AI</span>
            <span className="text-amber-300 text-xs">👑</span>
          </div>
          <span className="text-[8px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-black uppercase tracking-wider">✨ Premium</span>
        </button>

        <button
          onClick={() => setViewMode('bozorlik')}
          className={`py-2 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[44px] relative ${
            viewMode === 'bozorlik'
              ? 'bg-[#DB2777] text-white shadow-xs'
              : 'text-[#9D4C6C] hover:bg-pink-50'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            {pendingCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#F59E0B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </div>
          <span className="truncate">{t("Bozorlik")}</span>
        </button>

        <button
          onClick={() => setViewMode('timer')}
          className={`py-2 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[44px] ${
            viewMode === 'timer'
              ? 'bg-[#DB2777] text-white shadow-xs'
              : 'text-[#9D4C6C] hover:bg-pink-50'
          }`}
        >
          <TimerIcon className="w-4 h-4" />
          <span>{t("Taymer")}</span>
        </button>
      </div>

      {/* MODE 1: INGREDIENT MATCHMAKING */}
      {viewMode === 'match' && (
        <div className="space-y-4">

          {/* 1. Live Search & Clear Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ingredientSearch}
              onChange={e => setIngredientSearch(e.target.value)}
              placeholder={t("Masalliq nomini qidirish (kartoshka, tovuq, zira...)...")}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-[#EFE8DC] text-xs font-bold text-[#2E121D] focus:outline-none focus:border-[#DB2777] shadow-2xs"
            />
            {ingredientSearch && (
              <button
                onClick={() => setIngredientSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 2. Quick Dish Presets (1-tap setup) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-[#831843] uppercase tracking-wider block px-1">
              ⚡ {t("Tezkor To'plamlar (1-bosishda tanlash)")}:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                { 
                  label: "🥘 Palov", 
                  ids: ['ing_guruch', 'ing_sabzi', 'ing_piyoz', 'ing_qoy', 'ing_mol', 'ing_zira', 'ing_paxsa_yog'] 
                },
                { 
                  label: "🥟 Somsa", 
                  ids: ['ing_un', 'ing_piyoz', 'ing_mol', 'ing_qiyma', 'ing_dumba', 'ing_zira'] 
                },
                { 
                  label: "🍲 Sho'rva", 
                  ids: ['ing_mol', 'ing_qoy', 'ing_kartoshka', 'ing_sabzi', 'ing_piyoz', 'ing_pomidor'] 
                },
                { 
                  label: "🥣 Manti", 
                  ids: ['ing_un', 'ing_mol', 'ing_qiyma', 'ing_piyoz', 'ing_murch'] 
                },
                { 
                  label: "🥗 Salat", 
                  ids: ['ing_pomidor', 'ing_bodring', 'ing_kokatlar', 'ing_piyoz', 'ing_zaytun_yog'] 
                }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedIngredientIds(prev => {
                      const combined = new Set([...prev, ...preset.ids]);
                      return Array.from(combined);
                    });
                    showToast(`${preset.label} ${t("masalliqlari tanlandi!")}`);
                  }}
                  className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-pink-50 text-[#DB2777] border border-pink-200 hover:bg-pink-100 transition-all shrink-0 active:scale-95 flex items-center gap-1"
                >
                  <span>{preset.label}</span>
                  <Plus className="w-3 h-3 text-[#DB2777]" />
                </button>
              ))}
            </div>
          </div>

          {/* 3. Selected Ingredients Badge Chips Bar */}
          {selectedIngredientIds.length > 0 && (
            <div className="bg-[#FFF5F7] p-2.5 rounded-2xl border border-[#FCE7F3] space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-[#831843] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DB2777]" />
                  {t("Tanlangan masalliqlar")}: <strong className="text-[#DB2777]">{selectedIngredientIds.length} {t("ta")}</strong>
                </span>
                <button
                  onClick={() => setSelectedIngredientIds([])}
                  className="text-[11px] font-extrabold text-[#DB2777] hover:underline bg-white px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs"
                >
                  {t("Barchasini tozalash")} ✕
                </button>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {selectedIngredientIds.map(id => {
                  const ing = ingredients.find(i => i.id === id);
                  if (!ing) return null;
                  return (
                    <span
                      key={id}
                      onClick={() => toggleIngredient(id)}
                      className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-white text-[#2E121D] border border-pink-300 shadow-2xs flex items-center gap-1 shrink-0 cursor-pointer hover:bg-pink-100 transition-colors"
                    >
                      <span>{ing.icon}</span>
                      <span>{t(ing.nomi)}</span>
                      <span className="text-[#DB2777] font-black ml-0.5">✕</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categoryLabels.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#DB2777] text-white shadow-xs'
                    : 'bg-white text-[#6B6359] border border-[#EFE8DC] hover:bg-[#F9F5EE]'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>

          {/* 5. Ingredient Selection Chips Grid */}
          <div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filteredIngredients.map(ing => {
                const isSelected = selectedIngredientIds.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    className={`p-2.5 rounded-2xl border transition-all text-left flex flex-col items-center justify-center text-center relative min-h-[72px] ${
                      isSelected
                        ? 'bg-[#FFF0EC] border-[#FF6B4A] text-[#2D2A26] font-extrabold shadow-xs scale-98 ring-2 ring-[#FF6B4A]/30'
                        : 'bg-white border-[#EFE8DC] text-[#6B6359] hover:border-[#DCD4C7]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    <span className="text-2xl mb-1">{ing.icon || '🥦'}</span>
                    <span className="text-[11px] leading-tight line-clamp-1">{t(ing.nomi)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipe Match Results View */}
          <div id="recipe-results" className="space-y-5 pt-2">
            
            {/* Group 1: To'liq mos retseptlar */}
            <div>
              <h3 className="font-bold text-[#0B4F2C] text-sm mb-2.5 flex items-center gap-2 tracking-tight">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {t("To'liq mos keladigan taomlar")} ({matchingResults.fullMatch.length})
              </h3>

              {matchingResults.fullMatch.length === 0 ? (
                <div className="bg-white p-4 rounded-2xl border border-dashed border-[#EFEBE0] text-center text-xs text-[#7C8D82]">
                  {t("Hozircha tanlangan masalliqlarga 100% mos retsept topilmadi. Yana bir nechta masalliq belgilang.")}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {matchingResults.fullMatch.map(({ recipe }) => (
                    <div
                      key={recipe.id}
                      onClick={() => setActiveRecipe(recipe)}
                      className="card-instacart p-3 rounded-2xl bg-white border border-[#EFEBE0] hover:border-[#0B4F2C]/40 transition-all cursor-pointer flex items-center gap-3 shadow-xs group relative pr-9"
                    >
                      <img
                        src={recipe.rasm_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                        alt={recipe.nomi}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                        }}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          100% {t("tayyorlanadi")}
                        </span>
                        <h4 className="font-bold text-[#1C2B22] text-xs sm:text-sm leading-snug line-clamp-2">
                          {t(recipe.nomi)}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#5A6E60] font-medium pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#0B4F2C]" />
                            {recipe.tayyorlash_vaqti_daq} {t("daq")}
                          </span>
                          <span>•</span>
                          <span className="capitalize text-emerald-800 font-bold">{t(recipe.qiyinlik)}</span>
                        </div>
                      </div>

                      {/* Favorite bookmark icon */}
                      <button
                        onClick={(e) => toggleFavorite(recipe.id, e)}
                        className="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                        title={t("Sevimliga saqlash")}
                      >
                        <Heart className={`w-4 h-4 ${favoriteRecipeIds.includes(recipe.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Group 2: Yana 1 ta mahsulot kerak */}
            <div>
              <h3 className="font-bold text-[#0B4F2C] text-sm mb-2.5 flex items-center gap-2 tracking-tight">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                {t("Yana 1 ta mahsulot yetmaydi")} ({matchingResults.missingOne.length})
              </h3>

              {matchingResults.missingOne.length === 0 ? (
                <div className="bg-white p-4 rounded-2xl border border-dashed border-[#EFEBE0] text-center text-xs text-[#7C8D82]">
                  {t("Bu bo'limda retseptlar mavjud emas.")}
                </div>
              ) : (
                <div className="space-y-3">
                  {matchingResults.missingOne.map(({ recipe, missingNames }) => (
                    <div
                      key={recipe.id}
                      className="card-instacart p-3 rounded-2xl bg-white border border-[#EFEBE0] hover:border-amber-400 transition-all space-y-2.5 shadow-xs group relative"
                    >
                      {/* Top row: Image + Details + Favorite */}
                      <div
                        onClick={() => setActiveRecipe(recipe)}
                        className="flex items-start gap-3 cursor-pointer min-w-0 pr-8"
                      >
                        <img
                          src={recipe.rasm_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                          alt={recipe.nomi}
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                          }}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-bold text-[#1C2B22] text-xs sm:text-sm leading-snug line-clamp-2">
                            {t(recipe.nomi)}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#5A6E60] font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              {recipe.tayyorlash_vaqti_daq} {t("daq")}
                            </span>
                            <span>•</span>
                            <span className="capitalize text-stone-700">{t(recipe.qiyinlik)}</span>
                          </div>
                        </div>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(recipe.id, e)}
                          className="absolute top-2.5 right-2.5 p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                          title={t("Sevimliga saqlash")}
                        >
                          <Heart className={`w-4 h-4 ${favoriteRecipeIds.includes(recipe.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Missing Items Pill Notice */}
                      <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200/60 flex items-center justify-between text-xs text-amber-900 font-medium">
                        <span className="flex items-center gap-1.5 line-clamp-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{t("Yetishmaydi")}: <strong className="font-bold">{missingNames.map(m => t(m)).join(', ')}</strong></span>
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          addMultipleToShoppingList(missingNames.map(m => ({ nomi: t(m), miqdori: t(recipe.nomi) })));
                          showToast(`🛒 ${missingNames.map(m => t(m)).join(', ')} ${t("bozorlikka qo'shildi!")}`);
                        }}
                        className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t("Bozorlikka qo'shish")}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODE 1 (MAIN): CATALOG WITH GRID CATEGORY FOLDERS & SEARCH */}
      {viewMode === 'catalog' && (
        <div className="space-y-3.5">
          
          {/* Search Bar Input & Filter Button */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t("Retsept yoki masalliq nomini yozing...")}
                  className="w-full pl-10 pr-9 py-3 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#DB2777] shadow-2xs font-bold text-[#2E121D]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Expandable Filter Toggle Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterExpanded(prev => !prev)}
                className={`px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-1.5 border transition-all shadow-2xs shrink-0 ${
                  isFilterExpanded || (selectedFolderCategory !== null || timeFilter !== 'all' || diffFilter !== 'all')
                    ? 'bg-[#DB2777] text-white border-[#DB2777] shadow-md'
                    : 'bg-white text-[#2E121D] border-[#EFE8DC] hover:border-pink-300'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t("Filtrlar")}</span>
                {(selectedFolderCategory !== null || timeFilter !== 'all' || diffFilter !== 'all') && (
                  <span className="w-5 h-5 rounded-full bg-white text-[#DB2777] text-[10px] font-black flex items-center justify-center shadow-2xs">
                    {(selectedFolderCategory !== null ? 1 : 0) + (timeFilter !== 'all' ? 1 : 0) + (diffFilter !== 'all' ? 1 : 0)}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isFilterExpanded ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>

            {/* Active Filters Pill Bar (When collapsed but active) */}
            {!isFilterExpanded && (selectedFolderCategory !== null || timeFilter !== 'all' || diffFilter !== 'all' || searchQuery) && (
              <div className="flex items-center justify-between px-3 py-2 bg-pink-50/90 rounded-2xl border border-pink-200 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-[#DB2777]">{t("Filtr")}:</span>
                  {selectedFolderCategory && (
                    <span className="bg-white text-[#DB2777] px-2 py-0.5 rounded-lg font-black border border-pink-200 text-[10.5px]">
                      📂 {t(selectedFolderCategory)}
                    </span>
                  )}
                  {timeFilter !== 'all' && (
                    <span className="bg-white text-[#DB2777] px-2 py-0.5 rounded-lg font-black border border-pink-200 text-[10.5px]">
                      {timeFilter === 'quick' ? '⚡ <30m' : timeFilter === 'medium' ? '⏱️ 30-60m' : '🍲 >60m'}
                    </span>
                  )}
                  {diffFilter !== 'all' && (
                    <span className="bg-white text-[#DB2777] px-2 py-0.5 rounded-lg font-black border border-pink-200 text-[10.5px] capitalize">
                      {t(diffFilter)}
                    </span>
                  )}
                </div>
                <button
                  onClick={resetPazandaFilters}
                  className="text-[#DB2777] font-black hover:underline shrink-0 text-[10.5px] ml-2"
                >
                  {t("Filtrni tozalash")} ✕
                </button>
              </div>
            )}

            {/* Expanded Stacked Tagma-Tag Filter Panel */}
            {isFilterExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white rounded-3xl p-4 border border-pink-200 shadow-xl space-y-4 text-left"
              >
                <div className="flex items-center justify-between border-b border-pink-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#DB2777] flex items-center justify-center shadow-2xs">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-xs text-[#2E121D]">{t("Retsept Filtrlari va Saralash")}</h3>
                      <p className="text-[10px] text-[#7C746B] font-medium">{t("Tagma-tag bo'limlardan tanlang")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFilterExpanded(false)}
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-black flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>

                {/* 1. KATEGORIYA / PAPKA FILTRI (Tagma-tag stacked list) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-[#DB2777] block">
                    📂 {t("Kategoriya (Papka)")}
                  </label>
                  <div className="space-y-1.5 max-h-52 overflow-y-auto no-scrollbar pr-1">
                    <button
                      onClick={() => setSelectedFolderCategory(null)}
                      className={`w-full p-2.5 rounded-2xl border text-left text-xs font-extrabold flex items-center justify-between transition-all ${
                        selectedFolderCategory === null
                          ? 'bg-pink-50 border-[#DB2777] text-[#DB2777] shadow-xs ring-1 ring-[#DB2777]'
                          : 'bg-stone-50/70 border-stone-200 text-[#2E121D] hover:bg-pink-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🍽️</span>
                        <span>{t("Barcha Kategoriyalar")}</span>
                      </div>
                      {selectedFolderCategory === null && <Check className="w-4 h-4 text-[#DB2777]" />}
                    </button>

                    {FOLDER_CATEGORIES.map(folder => {
                      const isSel = selectedFolderCategory?.toLowerCase().trim() === folder.id.toLowerCase().trim();
                      const count = recipes.filter(r => r.kategoriya?.toLowerCase().trim() === folder.id.toLowerCase().trim()).length;
                      return (
                        <button
                          key={folder.id}
                          onClick={() => setSelectedFolderCategory(folder.id)}
                          className={`w-full p-2.5 rounded-2xl border text-left text-xs font-extrabold flex items-center justify-between transition-all ${
                            isSel
                              ? 'bg-pink-50 border-[#DB2777] text-[#DB2777] shadow-xs ring-1 ring-[#DB2777]'
                              : 'bg-stone-50/70 border-stone-200 text-[#2E121D] hover:bg-pink-50/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-base shrink-0">{folder.emoji}</span>
                            <span className="truncate">{t(folder.title)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] text-gray-500 font-extrabold bg-white px-2 py-0.5 rounded-lg border">{count} {t("ta")}</span>
                            {isSel && <Check className="w-4 h-4 text-[#DB2777]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. TAYYORLASH VAQTI (Tagma-tag stacked cards) */}
                <div className="space-y-1.5 border-t border-pink-100 pt-3">
                  <label className="text-[11px] font-black text-[#DB2777] block">
                    ⏱️ {t("Tayyorlash Vaqti")}
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', icon: '🌐', label: 'Barcha vaqtlar (Har qanday)' },
                      { id: 'quick', icon: '⚡', label: 'Tezkor retseptlar (30 daqiqadan kam)' },
                      { id: 'medium', icon: '⏱️', label: "O'rtacha retseptlar (30-60 daqiqa)" },
                      { id: 'long', icon: '🍲', label: "Uzoq pishadigan taomlar (60 daqiqadan ko'p)" },
                    ].map(f => {
                      const isSel = timeFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setTimeFilter(f.id as any)}
                          className={`w-full p-2.5 rounded-2xl border text-left text-xs font-extrabold flex items-center justify-between transition-all ${
                            isSel
                              ? 'bg-pink-50 border-[#DB2777] text-[#DB2777] shadow-xs ring-1 ring-[#DB2777]'
                              : 'bg-stone-50/70 border-stone-200 text-[#2E121D] hover:bg-pink-50/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{f.icon}</span>
                            <span>{t(f.label)}</span>
                          </div>
                          {isSel && <Check className="w-4 h-4 text-[#DB2777]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. QIYINLIK DARAJASI (Tagma-tag stacked cards) */}
                <div className="space-y-1.5 border-t border-pink-100 pt-3">
                  <label className="text-[11px] font-black text-[#DB2777] block">
                    📊 {t("Qiyinlik Darajasi")}
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', icon: '🌐', label: 'Barcha qiyinlik darajalari' },
                      { id: 'oson', icon: '🟢', label: 'Oson (Boshlovchilar uchun)' },
                      { id: 'orta', icon: '🟡', label: "O'rtacha (Oshxona tajribasi borlar)" },
                      { id: 'qiyin', icon: '🔴', label: "Murakkab (Professional oshpazlar)" },
                    ].map(f => {
                      const isSel = diffFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setDiffFilter(f.id as any)}
                          className={`w-full p-2.5 rounded-2xl border text-left text-xs font-extrabold flex items-center justify-between transition-all ${
                            isSel
                              ? 'bg-pink-50 border-[#DB2777] text-[#DB2777] shadow-xs ring-1 ring-[#DB2777]'
                              : 'bg-stone-50/70 border-stone-200 text-[#2E121D] hover:bg-pink-50/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{f.icon}</span>
                            <span>{t(f.label)}</span>
                          </div>
                          {isSel && <Check className="w-4 h-4 text-[#DB2777]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-pink-100 gap-2">
                  <button
                    onClick={resetPazandaFilters}
                    className="px-4 py-2.5 rounded-2xl bg-pink-100/70 hover:bg-pink-200 text-[#DB2777] text-xs font-black transition-colors"
                  >
                    {t("Filtrni tozalash")} ↺
                  </button>

                  <button
                    onClick={() => setIsFilterExpanded(false)}
                    className="flex-1 py-2.5 rounded-2xl bg-[#DB2777] hover:bg-[#BE185D] text-white text-xs font-black shadow-md transition-colors text-center"
                  >
                    {t("Filtrni qo'llash")} ✓
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* FOLDERS GRID MODE (When no folder, no active search query, and default time/diff filters) */}
          {selectedFolderCategory === null && !searchQuery.trim() && timeFilter === 'all' && diffFilter === 'all' ? (
            <div className="space-y-4">
              
              {/* Glowing Highlighted Banner for Pazanda AI Premium Search */}
              <div
                onClick={() => setViewMode('match')}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-600 to-rose-600 text-white shadow-lg cursor-pointer flex items-center justify-between group hover:scale-[1.01] active:scale-[0.98] transition-all relative overflow-hidden ring-2 ring-pink-400/50"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shadow-xs">
                    👑
                  </div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-white tracking-tight flex items-center gap-1.5">
                      <span>Pazanda AI</span>
                      <span className="bg-amber-300 text-amber-950 font-black text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider">👑 Premium</span>
                    </h4>
                    <p className="text-[10px] text-pink-100 mt-0.5">
                      Muzlatgichingizda bor masalliqlarni tanlang, mos taomlarni darhol topamiz!
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-white bg-white/20 px-2.5 py-1 rounded-xl group-hover:translate-x-1 transition-transform shrink-0">
                  Ochish →
                </span>
              </div>

              {/* Folders Section Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="font-black text-[#2E121D] text-sm">
                    📂 Retseptlar Papkalari (12 ta Kategoriya)
                  </h3>
                  <p className="text-[10px] text-[#7C746B]">
                    Kategoriyani tanlab, kerakli taomlarni toping
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFolderCategory('all')}
                  className="text-[11px] font-extrabold text-[#DB2777] bg-white hover:bg-pink-50 px-2.5 py-1 rounded-xl border border-pink-200 shadow-2xs transition-colors flex items-center gap-1 active:scale-95"
                >
                  <span>Barchasi ({recipes.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of 12 Folder Cards in 4:3 Aspect Ratio */}
              <div className="grid grid-cols-2 gap-3">
                {FOLDER_CATEGORIES.map(folder => {
                  const count = recipes.filter(r => r.kategoriya?.toLowerCase().trim() === folder.id.toLowerCase().trim()).length;
                  const coverImg = categoryCovers[folder.id];

                  return (
                    <motion.div
                      key={folder.id}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedFolderCategory(folder.id)}
                      className="rounded-2xl bg-white border border-[#EFE8DC] hover:border-pink-400 shadow-xs cursor-pointer flex flex-col justify-between overflow-hidden group transition-all relative"
                    >
                      {/* 4:3 Aspect Ratio Cover Box */}
                      <div className="w-full aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-amber-100 to-pink-100 flex items-center justify-center">
                        {coverImg ? (
                          <img
                            src={coverImg}
                            alt={folder.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${folder.color} flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                            <span className="filter drop-shadow-md">{folder.emoji}</span>
                          </div>
                        )}

                        <span className="absolute top-2 right-2 text-[10px] font-black text-white bg-black/60 backdrop-blur px-2 py-0.5 rounded-full border border-white/20 shadow-xs">
                          {count} ta
                        </span>

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCatCoverId(folder.id);
                              setCatCoverUrlInput(categoryCovers[folder.id] || '');
                            }}
                            className="absolute bottom-2 right-2 bg-amber-500 hover:bg-amber-600 text-white text-[9px] font-black px-2 py-1 rounded-lg border border-amber-300 shadow-md flex items-center gap-1 active:scale-90 z-20"
                            title="Kategoriya rasmini o'zgartirish (4:3)"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Rasm 4:3</span>
                          </button>
                        )}
                      </div>

                      <div className="p-2.5 space-y-0.5">
                        <h4 className="font-extrabold text-[#2E121D] text-xs leading-tight group-hover:text-[#DB2777] transition-colors line-clamp-1">
                          {t(folder.title)}
                        </h4>
                        <p className="text-[9px] text-[#7C746B] line-clamp-1">
                          {t(folder.desc)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* SELECTED FOLDER / ACTIVE SEARCH RECIPES GRID VIEW */
            <div className="space-y-3">
              {/* Navigation Header with Back Button */}
              <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-[#EFE8DC] shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={resetPazandaFilters}
                    className="px-2.5 py-1 rounded-xl bg-pink-50 text-[#DB2777] hover:bg-pink-100 transition-colors flex items-center gap-1 text-xs font-bold shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t("Papkalar")}</span>
                  </button>
                  <div className="h-4 w-[1px] bg-gray-200 shrink-0" />
                  <span className="font-black text-xs text-[#2E121D] truncate">
                    {searchQuery
                      ? `🔍 "${searchQuery}"`
                      : (selectedFolderCategory
                          ? (selectedFolderCategory === 'all' ? t("🍽️ Barcha Retseptlar") : `📂 ${t(selectedFolderCategory)}`)
                          : t("🔍 Filtrlangan Retseptlar"))} ({catalogRecipes.length})
                  </span>
                </div>

                <button
                  onClick={resetPazandaFilters}
                  className="text-[10px] font-extrabold text-[#DB2777] hover:underline shrink-0"
                >
                  {t("Chiqish ✕")}
                </button>
              </div>

              {/* Empty State when no recipes found in category */}
              {catalogRecipes.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-dashed border-[#EFE8DC] text-center space-y-2">
                  <span className="text-4xl block">🍲</span>
                  <p className="text-xs font-bold text-[#6B6359]">
                    {t("Ushbu papkada hozircha retseptlar mavjud emas.")}
                  </p>
                  <button
                    onClick={() => setSelectedFolderCategory(null)}
                    className="px-3 py-1.5 bg-[#DB2777] text-white text-xs font-bold rounded-xl"
                  >
                    Boshqa papkani tanlash
                  </button>
                </div>
              ) : (
                /* Recipes Catalog Cards Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {catalogRecipes.map(recipe => (
                    <motion.div
                      key={recipe.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setSelectedRecipeModal(recipe)}
                      className="card-3d p-2.5 cursor-pointer flex flex-col justify-between group relative bg-white rounded-2xl border border-[#EFE8DC]"
                    >
                      <div>
                        <div className="relative overflow-hidden rounded-lg mb-2">
                          {(!recipe.rasm_url.startsWith('/') && !recipe.rasm_url.startsWith('http') && !recipe.rasm_url.startsWith('data:') && recipe.rasm_url.length <= 10) ? (
                            <div className="w-full h-32 bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 flex items-center justify-center rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                              <span className="text-5xl filter drop-shadow-sm">{recipe.rasm_url}</span>
                            </div>
                          ) : (
                            <div className="w-full h-32 bg-stone-900/5 rounded-xl overflow-hidden flex items-center justify-center border border-[#EFE8DC]">
                              <img
                                src={recipe.rasm_url}
                                alt={recipe.nomi}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const parent = e.currentTarget.parentElement;
                                  if (parent && !parent.querySelector('.emoji-fallback')) {
                                    const fallback = document.createElement('div');
                                    fallback.className = "emoji-fallback w-full h-32 bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 flex items-center justify-center rounded-xl";
                                    fallback.innerHTML = `<span class="text-4xl">🍲</span>`;
                                    parent.appendChild(fallback);
                                  }
                                }}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <span className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-amber-300" />
                            {recipe.tayyorlash_vaqti_daq} {t("daq")}
                          </span>

                          {isAdmin && (
                            <button
                              onClick={(e) => handleOpenAdminEdit(recipe, e)}
                              className="absolute bottom-1.5 right-1.5 bg-amber-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-amber-300 z-10 active:scale-90"
                              title="Tahrirlash"
                            >
                              <Pencil className="w-2.5 h-2.5" />
                              Tahrir
                            </button>
                          )}

                          <button
                            onClick={(e) => toggleFavorite(recipe.id, e)}
                            className="absolute top-1.5 left-1.5 p-1 rounded-full bg-white/90 backdrop-blur text-gray-600 hover:text-red-500 transition-colors shadow-2xs"
                          >
                            <Heart className={`w-3 h-3 ${favoriteRecipeIds.includes(recipe.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                        </div>

                        <h4 className="font-extrabold text-[#2D2A26] text-xs">
                          {t(recipe.nomi)}
                        </h4>
                        <p className="text-[10px] text-[#7C746B] mt-0.5 line-clamp-2 leading-snug">
                          {t(recipe.tarif_matni)}
                        </p>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-[#F5EFE6] flex items-center justify-between">
                        <span className="text-[9px] text-[#8C8479] font-extrabold bg-[#FAF6EF] px-1.5 py-0.2 rounded-md border border-[#EFE8DC] capitalize">
                          {t(recipe.qiyinlik)}
                        </span>
                        <span className="text-[11px] text-[#FF6B4A] font-black group-hover:underline">
                          {t("Retseptni ko'rish")} →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* MODE 3: BOZORLIK RO'YXATI (SMART SHOPPING LIST IN PAZANDA AI) */}
      {viewMode === 'bozorlik' && (
        <div className="space-y-4">
          
          <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FFF5EE] p-4.5 rounded-3xl border border-[#FFD8C8] shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#FFD8C8] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-[#FF6B4A] text-white flex items-center justify-center shadow-xs">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-[#2D2A26] text-base">
                    {t("Aql-idrokli Bozorlik Ro'yxati")} 🛒
                  </h3>
                  <p className="text-xs text-[#7C746B]">
                    {t("Retseptlardan yoki o'zingiz kiritgan masalliqlar ro'yxati")}
                  </p>
                </div>
              </div>

              {shoppingList.length > 0 && (
                <button
                  onClick={() => {
                    clearShoppingList();
                    showToast("Bozorlik ro'yxati tozalandi");
                  }}
                  className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t("Tozalash")}
                </button>
              )}
            </div>

            {/* Automatic Recipe Ingredient Generator Form */}
            <div className="card-pink p-3.5 rounded-2xl space-y-3">
              <p className="text-xs font-extrabold text-[#2E121D] flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#DB2777]" />
                {t("Taom nomi bo'yicha masalliqlarni avtomatik qo'shish")}:
              </p>

              <form onSubmit={handleAddDishToShoppingList} className="space-y-3">
                {/* Custom Dish Selector Trigger */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowDishSelectModal(true)}
                    className="w-full px-3.5 py-3 rounded-2xl bg-[#FFFDF9] border border-pink-200 text-xs font-bold text-[#2E121D] flex items-center justify-between shadow-2xs hover:border-[#DB2777] active:scale-[0.99] transition-all"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <span className="text-base">🍲</span>
                      <span className="truncate font-extrabold">
                        {selectedDishRecipeId
                          ? t(recipes.find(r => r.id === selectedDishRecipeId)?.nomi || '')
                          : `-- ${t("Taomni tanlang")} (${recipes.length} ta retsept) --`}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#DB2777] flex-shrink-0 ml-2" />
                  </button>
                </div>

                {/* Custom Portion Selector Pills */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-[#9D4C6C] flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#DB2777]" />
                      {t("Kishilar soni (Porsiya)")}:
                    </span>
                    <span className="text-xs font-extrabold text-[#DB2777]">
                      {dishPortions} {t("kishilik")}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {[2, 4, 6, 8, 12].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setDishPortions(num)}
                        className={`py-2 rounded-xl text-xs font-extrabold transition-all border ${
                          dishPortions === num
                            ? 'bg-[#DB2777] text-white border-[#DB2777] shadow-2xs scale-105'
                            : 'bg-white text-[#2E121D] border-pink-100 hover:bg-pink-50'
                        }`}
                      >
                        {num} {t("kishi")}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedDishRecipeId}
                  className="w-full py-3 bg-[#DB2777] hover:bg-[#BE185D] disabled:opacity-40 text-white rounded-2xl text-xs font-black shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t("Avtomatik Bozorlikka Qo'shish")}</span>
                </button>
              </form>
            </div>

            {/* Form to add custom shopping item */}
            <form onSubmit={handleAddCustomShopItem} className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={newShopName}
                onChange={e => setNewShopName(e.target.value)}
                placeholder={t("Masalliq nomi (masalan: Murch, Sarimsoq, Guruch)...")}
                className="flex-1 px-3 py-2.5 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#FF6B4A]"
              />
              <input
                type="text"
                value={newShopQty}
                onChange={e => setNewShopQty(e.target.value)}
                placeholder={t("Miqdori (1 kg)...")}
                className="w-24 px-2.5 py-2.5 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#FF6B4A]"
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 bg-[#FF6B4A] text-white rounded-2xl text-xs font-black flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Preset quick buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] text-[#8C8479] font-bold uppercase tracking-wider whitespace-nowrap">
                {t("Tezkor qo'shish")}:
              </span>
              {['Sabzi (2 kg)', 'Piyoz (3 kg)', 'Kartoshka (5 kg)', 'Go\'sht (1 kg)', 'Lazer Guruch (2 kg)', 'Osimlik yogi (1 l)', 'Zira va murch'].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const [nom, miq] = preset.split('(');
                    addToShoppingList(nom.trim(), miq ? miq.replace(')', '').trim() : '');
                    showToast(`${nom} qo'shildi!`);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-[#FFF0EC] text-[#2D2A26] border border-[#EFE8DC] rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors"
                >
                  + {t(preset)}
                </button>
              ))}
            </div>

            {/* Category chips for Bozorlik */}
            {shoppingList.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 pt-2">
                {[
                  { id: 'barchasi', label: 'Barchasi', icon: '🛒' },
                  { id: 'sabzavot', label: 'Sabzavot', icon: '🥬' },
                  { id: 'gosht', label: "Go'sht", icon: '🥩' },
                  { id: 'sut_mahsuloti', label: 'Sut', icon: '🥛' },
                  { id: 'dukkakli', label: 'Dukkakli', icon: '🌾' },
                  { id: 'ziravor', label: 'Ziravor', icon: '🌶️' },
                  { id: 'boshqa', label: 'Boshqa', icon: '📦' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedShopCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedShopCategory === cat.id
                        ? 'bg-[#DB2777] text-white shadow-2xs'
                        : 'bg-white text-[#9D4C6C] border border-pink-100 hover:bg-pink-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{t(cat.label)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Shopping items list */}
            {shoppingList.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-3xl">🛍️</p>
                <p className="text-xs font-bold text-[#6B5A50]">
                  {t("Bozorlik ro'yxati hozircha bo'sh")}
                </p>
                <p className="text-[11px] text-[#8C8479] max-w-xs mx-auto">
                  {t("Masalliqlar bo'limidan retseptlarni ochib, 1 ta tugma bilan barcha kerakli masalliqlarni bu yerga saqlashingiz mumkin.")}
                </p>
              </div>
            ) : filteredShoppingList.length === 0 ? (
              <div className="py-8 text-center space-y-2 bg-white/50 rounded-2xl border border-dashed border-pink-100">
                <p className="text-2xl">📦</p>
                <p className="text-xs font-bold text-[#9D4C6C]">
                  {t("Ushbu toifada mahsulot yo'q")}
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                {filteredShoppingList.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleShoppingItem(item.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      item.bajarildi
                        ? 'bg-gray-50/80 border-gray-200 text-gray-400 line-through opacity-80'
                        : 'bg-white border-pink-100 text-[#2D2A26] font-bold hover:border-[#DB2777] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center text-white transition-all flex-shrink-0 ${
                          item.bajarildi ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-[#C2BBAF]'
                        }`}
                      >
                        {item.bajarildi && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs">{t(item.nomi)}</p>
                        {item.miqdori && (
                          <p className="text-[10px] text-[#8C8479] font-normal">
                            {t(item.miqdori)}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeShoppingItem(item.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* MODE 4: OSHXONA TAYMERI (KITCHEN TIMER IN PAZANDA AI) */}
      {viewMode === 'timer' && (
        <div className="space-y-4">
          
          <div className="bg-gradient-to-b from-[#2E121D] via-[#4C1D2F] to-[#2E121D] text-white p-5 rounded-3xl border border-pink-500/20 shadow-xl text-center space-y-4">
            
            <div className="inline-flex items-center gap-1.5 bg-[#DB2777] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              <TimerIcon className="w-4 h-4 text-[#FBBF24]" />
              {t("Pazanda Oshxona Taymeri")}
            </div>

            {/* Countdown display */}
            <div className="space-y-1">
              <div className="text-5xl font-black tracking-widest font-mono text-[#FBBF24] drop-shadow-md">
                {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:
                {String(timerSeconds % 60).padStart(2, '0')}
              </div>
              <p className="text-xs text-pink-200">
                {isTimerRunning ? t("Taymer ketmoqda...") : t("O'zingiz moslagan vaqtni kiriting va ishga tushiring")}
              </p>
            </div>

            {/* Controls: Start / Resume, Pause, Stop */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {!isTimerRunning ? (
                <button
                  onClick={() => {
                    if (timerSeconds > 0) resumeGlobalTimer();
                    else {
                      const mins = parseInt(customMinutesInput) || 15;
                      startGlobalTimer(mins);
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#DB2777] to-[#EC4899] hover:from-[#BE185D] hover:to-[#DB2777] text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Play className="w-4 h-4 fill-white" />
                  {t("Boshlash")}
                </button>
              ) : (
                <button
                  onClick={pauseGlobalTimer}
                  className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  {t("Pauza (Vaqtincha to'xtatish)")}
                </button>
              )}

              <button
                onClick={stopGlobalTimer}
                className="px-4 py-2.5 bg-rose-950 hover:bg-rose-900 text-rose-200 text-xs font-bold rounded-2xl border border-rose-800 flex items-center gap-1.5 active:scale-95 transition-transform"
                title={t("To'xtatish")}
              >
                <Square className="w-3.5 h-3.5 fill-rose-200" />
                <span>{t("To'xtatish")}</span>
              </button>
            </div>

            {/* CUSTOM TIMER DURATION INPUT */}
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10 space-y-2 text-left">
              <label className="text-xs font-bold text-pink-100 block">
                ⏱️ {t("O'zingiz taymer vaqtini belgila qiling (daqiqa)")}:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customMinutesInput}
                  onChange={e => setCustomMinutesInput(e.target.value)}
                  placeholder="20"
                  className="w-24 bg-white text-[#2E121D] font-extrabold text-sm px-3 py-1.5 rounded-xl border border-pink-200 focus:outline-none focus:border-[#DB2777]"
                />
                <span className="text-xs text-white/80 font-bold">{t("daqiqa")}</span>
                <button
                  onClick={() => {
                    const mins = parseInt(customMinutesInput);
                    if (mins > 0) startGlobalTimer(mins);
                  }}
                  className="ml-auto px-4 py-1.5 bg-[#FBBF24] text-[#5B210B] hover:bg-[#F59E0B] text-xs font-extrabold rounded-xl shadow-xs active:scale-95 transition-all"
                >
                  {t("O'rnatish va Boshlash")}
                </button>
              </div>
            </div>

            {/* Standard Presets for Uzbek Cooking */}
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs font-bold text-pink-200 mb-2.5 text-left">
                {t("O'zbek taomlari uchun tezkor taymerlar")}:
              </p>

              <div className="grid grid-cols-2 gap-2 text-left">
                <button
                  onClick={() => startGlobalTimer(15)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🧅 {t("Piyoz qovurish")}</span>
                  <span className="text-[#FBBF24] font-extrabold">15 daq</span>
                </button>

                <button
                  onClick={() => startGlobalTimer(20)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🥩 {t("Go'sht qizartirish")}</span>
                  <span className="text-[#FBBF24] font-extrabold">20 daq</span>
                </button>

                <button
                  onClick={() => startGlobalTimer(30)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🍚 {t("Osh damlash")}</span>
                  <span className="text-[#FBBF24] font-extrabold">30 daq</span>
                </button>

                <button
                  onClick={() => startGlobalTimer(45)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🥟 {t("Manti pishirish")}</span>
                  <span className="text-[#FBBF24] font-extrabold">45 daq</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Recipe Detail Modal Mounted via React Portal */}
      {activeRecipe && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-5 space-y-4 border border-[#EFE8DC] shadow-2xl relative">
            
            {/* STICKY TOP MODAL HEADER */}
            <div className="sticky top-0 z-30 flex items-center justify-between bg-[#FFFDF9]/95 backdrop-blur-md pb-3 pt-1 -mt-2 -mx-2 px-2 border-b border-[#EFE8DC]">
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => setActiveRecipe(null)}
                className="px-3.5 py-1.5 text-[#DB2777] bg-pink-50 hover:bg-pink-100 rounded-full transition-colors flex items-center gap-1.5 text-xs font-extrabold border border-pink-200 shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("Orqaga")}
              </motion.button>

              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={(e) => handleOpenAdminEdit(activeRecipe, e)}
                    className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-extrabold text-xs flex items-center gap-1 shadow-xs border border-amber-300 active:scale-95 transition-all"
                    title="Admin sifatida tahrirlash"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>
                )}

                <button
                  onClick={() => copyRecipeForTelegram()}
                  className="p-1.5 text-[#FF6B4A] hover:bg-[#FFF0EC] rounded-xl border border-[#FFD5C8] transition-colors flex items-center gap-1 text-xs font-extrabold"
                  title="Telegramga nusxalash"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Nusxalash</span>
                </button>

                <button
                  onClick={(e) => toggleFavorite(activeRecipe.id, e)}
                  className="p-1.5 rounded-xl border border-[#EFE8DC] hover:bg-gray-50 text-gray-600"
                >
                  <Heart className={`w-4 h-4 ${favoriteRecipeIds.includes(activeRecipe.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>

            {(!activeRecipe.rasm_url.startsWith('/') && !activeRecipe.rasm_url.startsWith('http') && !activeRecipe.rasm_url.startsWith('data:') && activeRecipe.rasm_url.length <= 10) ? (
              <div className="w-full h-52 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center rounded-2xl shadow-md">
                <span className="text-7xl filter drop-shadow-md">{activeRecipe.rasm_url}</span>
              </div>
            ) : (
              <div className="w-full h-56 bg-stone-900/5 rounded-2xl overflow-hidden flex items-center justify-center p-1 border border-[#EFE8DC] relative">
                <img
                  src={activeRecipe.rasm_url}
                  alt={activeRecipe.nomi}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.emoji-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className = "emoji-fallback w-full h-56 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center rounded-2xl shadow-md";
                      fallback.innerHTML = `<span class="text-7xl">🍲</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-xl shadow-xs transition-all"
                />
              </div>
            )}

            <div>
              <h3 className="font-black text-[#2D2A26] text-xl">
                {t(activeRecipe.nomi)}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-1 leading-relaxed">
                {t(activeRecipe.tarif_matni)}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#6B6359] mt-2">
                <span className="bg-orange-100 text-orange-900 font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-orange-200">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  {activeRecipe.tayyorlash_vaqti_daq} {t("daqiqa")}
                </span>
                <span className="bg-emerald-100 text-emerald-900 font-extrabold px-2.5 py-1 rounded-full capitalize border border-emerald-200">
                  {t(activeRecipe.qiyinlik)}
                </span>
              </div>
            </div>

            {/* PORTION SCALER */}
            <div className="bg-[#FAF6EF] p-3 rounded-2xl border border-[#EFE8DC] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#2D2A26] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#FF6B4A]" />
                  {t("Porsiya Madori (Kishilar soni)")}:
                </span>
                <span className="text-xs font-black text-[#FF6B4A]">
                  {portions} {t("kishilik")}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {[2, 4, 6, 12].map(num => (
                  <button
                    key={num}
                    onClick={() => setPortions(num)}
                    className={`py-1.5 rounded-xl text-xs font-black transition-all ${
                      portions === num
                        ? 'bg-[#FF6B4A] text-white shadow-xs'
                        : 'bg-white text-[#6B6359] border border-[#EFE8DC] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {num} {num === 12 ? t("To'y/Oila") : t("kishi")}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Specification Box with Checkboxes */}
            <div className="bg-[#FFF9F3] p-4 rounded-2xl border border-[#FFD8C8] space-y-3">
              <div className="flex items-center justify-between border-b border-[#FFD8C8] pb-2">
                <h4 className="font-black text-[#2D2A26] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[#FF6B4A]" />
                  {t("Masalliqlar reestri")} ({portions} {t("kishi uchun")})
                </h4>

                {savedRecipeIds.includes(activeRecipe.id) ? (
                  <span className="text-xs font-black bg-emerald-600 text-white px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    {t("Saqlandi ✓")}
                  </span>
                ) : (
                  <button
                    onClick={() => addRecipeIngredientsToShoppingList(selectedRecipeIngredients)}
                    className="text-xs font-extrabold bg-[#FF6B4A] text-white px-2.5 py-1 rounded-xl shadow-2xs hover:bg-[#E8593A] transition-colors flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {t("Bozorlikka saqlash")}
                  </button>
                )}
              </div>

              {/* Itemized check list */}
              <div className="space-y-1.5">
                {recipeIngredientItems.map((itemStr, idx) => {
                  const scaledStr = scaleIngredientString(itemStr, 4, portions);
                  const isChecked = selectedRecipeIngredients.includes(itemStr);
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedRecipeIngredients(prev =>
                          prev.includes(itemStr)
                            ? prev.filter(i => i !== itemStr)
                            : [...prev, itemStr]
                        );
                      }}
                      className={`p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-2 ${
                        isChecked
                          ? 'bg-white border-[#FF6B4A] text-[#2D2A26]'
                          : 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center text-white transition-all flex-shrink-0 ${
                          isChecked ? 'bg-[#FF6B4A] border-[#FF6B4A]' : 'bg-white border-stone-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{t(scaledStr)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step by Step Instructions */}
            <div>
              <h4 className="font-black text-[#2D2A26] text-sm mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF6B4A]" />
                {t("Bosqichma-bosqich tayyorlanishi")}
              </h4>
              <div className="space-y-2">
                {activeRecipe.korsatmalari.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-xs text-[#2D2A26] bg-white p-3 rounded-2xl border border-[#EFE8DC] shadow-2xs">
                    <span className="w-6 h-6 rounded-full bg-[#FF6B4A] text-white font-black flex items-center justify-center text-xs flex-shrink-0 shadow-2xs">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed font-medium">{t(step)}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveRecipe(null)}
              className="w-full py-3.5 bg-[#2D2A26] hover:bg-[#433E38] text-white text-xs font-black rounded-2xl mt-2 shadow-xs transition-colors min-h-[44px]"
            >
              {t("Yopish")}
            </button>

          </div>
        </div>,
        document.body
      )}

      {/* Custom Dish Selector Sheet Modal */}
      {showDishSelectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-md max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl p-5 space-y-3 border border-pink-100 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <h3 className="font-extrabold text-[#2E121D] text-base flex items-center gap-2">
                <span>🍲</span>
                <span>{t("Taomni Tanlang")}</span>
              </h3>
              <button
                onClick={() => setShowDishSelectModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-pink-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dish Search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dishSearch}
                onChange={e => setDishSearch(e.target.value)}
                placeholder={t("Taom nomini qidirish...")}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-pink-200 text-xs font-bold text-[#2E121D] focus:outline-none focus:border-[#DB2777]"
              />
            </div>

            {/* Dish List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar pt-1">
              {recipes
                .filter(r => r.holat !== 'qoralama' && r.nomi.toLowerCase().includes(dishSearch.toLowerCase()))
                .map(r => {
                  const isSelected = selectedDishRecipeId === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => {
                        setSelectedDishRecipeId(r.id);
                        setShowDishSelectModal(false);
                      }}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-pink-50 border-[#DB2777] shadow-2xs'
                          : 'bg-white border-pink-100 hover:border-pink-300'
                      }`}
                    >
                      <img
                        src={r.rasm_url}
                        alt={r.nomi}
                        className="w-12 h-12 object-cover rounded-xl flex-shrink-0 shadow-2xs border border-pink-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#2E121D] text-xs truncate">
                          {t(r.nomi)}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-[#9D4C6C] mt-0.5 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#F59E0B]" />
                            {r.tayyorlash_vaqti_daq} {t("daq")}
                          </span>
                          <span className="capitalize">• {t(r.qiyinlik)}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#DB2777] flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
            </div>

            <button
              onClick={() => setShowDishSelectModal(false)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#2E121D] text-xs font-black rounded-2xl transition-colors min-h-[44px]"
            >
              {t("Yopish")}
            </button>

          </div>
        </div>
      )}

      {/* ALWAYS-FIXED FLOATING BOTTOM DOCK FOR MATCHED RECIPES */}
      {viewMode === 'match' && selectedIngredientIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-[74px] left-3 right-3 z-40 max-w-md mx-auto shadow-2xl"
        >
          <div className="bg-[#1E1B18]/95 text-white p-3 rounded-2xl border border-amber-400/40 shadow-2xl flex items-center justify-between gap-3 backdrop-blur-xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                🍲
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-amber-300 leading-tight">
                  {matchingResults.allMatches.length} {t("ta mos taom topildi")}
                </p>
                <p className="text-[10px] text-gray-300 truncate mt-0.5">
                  {matchingResults.fullMatch.length} {t("ta 100% tayyor")} • {selectedIngredientIds.length} {t("ta masalliq")}
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setShowMatchedRecipesModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#DB2777] to-[#F472B6] hover:from-[#BE185D] hover:to-[#DB2777] text-white text-xs font-black rounded-xl shadow-md shrink-0 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{t("Taomlarni Ko'rish")}</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* MATCHED RECIPES SHEET MODAL MOUNTED VIA PORTAL */}
      {showMatchedRecipesModal && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-md max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-5 space-y-4 border border-pink-100 shadow-2xl relative">
            
            <div className="sticky top-0 z-30 flex items-center justify-between bg-[#FFFDF9]/95 backdrop-blur-md pb-3 pt-1 -mt-2 -mx-2 px-2 border-b border-pink-100">
              <span className="text-xs font-black text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#DB2777]" />
                {t("Mos Kelgan Taomlar")} ({matchingResults.allMatches.length})
              </span>
              <button
                onClick={() => setShowMatchedRecipesModal(false)}
                className="p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-[#DB2777] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 pt-1">
              
              {/* Group 1: 100% tayyorlanadi */}
              {matchingResults.fullMatch.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                    ✅ 100% {t("tayyorlanadigan taomlar")} ({matchingResults.fullMatch.length})
                  </span>

                  {matchingResults.fullMatch.map(({ recipe }) => (
                    <div
                      key={recipe.id}
                      onClick={() => {
                        setShowMatchedRecipesModal(false);
                        setActiveRecipe(recipe);
                      }}
                      className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs hover:border-emerald-400 flex items-center gap-3 cursor-pointer transition-all"
                    >
                      <img src={recipe.rasm_url} alt={recipe.nomi} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }} className="w-14 h-14 rounded-xl object-cover shadow-2xs" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-xs text-[#2E121D] truncate">{t(recipe.nomi)}</h4>
                        <p className="text-[11px] text-emerald-700 font-bold mt-0.5">⏱️ {recipe.tayyorlash_vaqti_daq} {t("daq")}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                    </div>
                  ))}
                </div>
              )}

              {/* Group 2: Yana 1 ta mahsulot kerak */}
              {matchingResults.missingOne.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-pink-100">
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-block">
                    ⚠️ {t("Yana 1 ta mahsulot kerak")} ({matchingResults.missingOne.length})
                  </span>

                  {matchingResults.missingOne.map(({ recipe, missingNames }) => (
                    <div
                      key={recipe.id}
                      onClick={() => {
                        setShowMatchedRecipesModal(false);
                        setActiveRecipe(recipe);
                      }}
                      className="p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs hover:border-amber-400 flex items-center gap-3 cursor-pointer transition-all"
                    >
                      <img src={recipe.rasm_url} alt={recipe.nomi} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }} className="w-14 h-14 rounded-xl object-cover shadow-2xs" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-xs text-[#2E121D] truncate">{t(recipe.nomi)}</h4>
                        <p className="text-[10px] text-amber-700 font-bold mt-0.5 truncate">
                          {t("Yetmaydi")}: {missingNames.map(m => t(m)).join(', ')}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-600" />
                    </div>
                  ))}
                </div>
              )}

              {/* Group 3: Boshqa mos taomlar */}
              {matchingResults.partialMatch.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-pink-100">
                  <span className="text-xs font-black text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-200 inline-block">
                    💡 {t("Qisman mos kelgan taomlar")} ({matchingResults.partialMatch.length})
                  </span>

                  {matchingResults.partialMatch.map(({ recipe, missingNames, matchPercent }) => (
                    <div
                      key={recipe.id}
                      onClick={() => {
                        setShowMatchedRecipesModal(false);
                        setActiveRecipe(recipe);
                      }}
                      className="p-3 bg-white rounded-2xl border border-pink-200 shadow-2xs hover:border-pink-400 flex items-center gap-3 cursor-pointer transition-all"
                    >
                      <img src={recipe.rasm_url} alt={recipe.nomi} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }} className="w-14 h-14 rounded-xl object-cover shadow-2xs" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-xs text-[#2E121D] truncate">{t(recipe.nomi)}</h4>
                          <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100">
                            {matchPercent}% {t("mos")}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5 truncate">
                          {t("Yetmaydi")}: {missingNames.map(m => t(m)).join(', ')}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-rose-400" />
                    </div>
                  ))}
                </div>
              )}

              {matchingResults.allMatches.length === 0 && (
                <div className="text-center py-8 space-y-2">
                  <p className="text-xs font-bold text-[#831843]">{t("Mos keladigan taom topilmadi")}</p>
                  <p className="text-[11px] text-gray-500">{t("Ko'proq masalliq tanlang yoki tezkor to'plamlardan foydalaning.")}</p>
                </div>
              )}

            </div>

            <button
              onClick={() => setShowMatchedRecipesModal(false)}
              className="w-full py-3 bg-[#2D2A26] hover:bg-[#433E38] text-white text-xs font-black rounded-2xl shadow-xs transition-colors min-h-[44px]"
            >
              {t("Yopish")}
            </button>

          </div>
        </div>,
        document.body
      )}

    
      {/* Admin Inline Recipe Edit Modal */}
      {adminEditingRecipe && createPortal(
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 overscroll-contain animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl p-5 space-y-4 border border-amber-300 shadow-2xl relative text-left">
            
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <div>
                  <h3 className="font-extrabold text-[#2D2A26] text-base">Retseptni Tahrirlash (Admin)</h3>
                  <p className="text-xs text-gray-500">ID: {adminEditingRecipe.id}</p>
                </div>
              </div>

              <button
                onClick={() => setAdminEditingRecipe(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdminEdit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Taom Nomi (Uzbek):</label>
                <input
                  type="text"
                  value={editNomi}
                  onChange={(e) => setEditNomi(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Kategoriya:</label>
                  <select
                    value={editKategoriya}
                    onChange={(e) => setEditKategoriya(e.target.value)}
                    className="w-full px-2 py-2 text-[11px] font-bold rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Pishiriqlar & Shirinliklar">Pishiriqlar & Shirinliklar</option>
                    <option value="Milliy Quyuq Taomlar">Milliy Quyuq Taomlar</option>
                    <option value="Turk Oshxonasi">Turk Oshxonasi</option>
                    <option value="Garnirlar & Yengil Taomlar">Garnirlar & Yengil Taomlar</option>
                    <option value="Salatlar & Gazaklar">Salatlar & Gazaklar</option>
                    <option value="Pishiriqlar & Xamirlar">Pishiriqlar & Xamirlar</option>
                    <option value="Pishiriqlar & Tuzli Piroglar">Pishiriqlar & Tuzli Piroglar</option>
                    <option value="Ichimliklar & Kokteyllar">Ichimliklar & Kokteyllar</option>
                    <option value="Quyuq Taomlar">Quyuq Taomlar</option>
                    <option value="Koreys & Dunyo Oshxonasi">Koreys & Dunyo Oshxonasi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Vaqt (Daqiqa):</label>
                  <input
                    type="number"
                    value={editVaqti}
                    onChange={(e) => setEditVaqti(Number(e.target.value))}
                    className="w-full px-2 py-2 text-xs font-bold rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Qiyinlik:</label>
                  <select
                    value={editQiyinlik}
                    onChange={(e) => setEditQiyinlik(e.target.value as any)}
                    className="w-full px-2 py-2 text-[11px] font-bold rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="oson">Oson</option>
                    <option value="orta">O'rta</option>
                    <option value="qiyin">Qiyin</option>
                  </select>
                </div>
              </div>

              {/* Image URL & Compressed Upload with Live Preview — supports Ctrl+V paste */}
              <div className="space-y-1.5" onPaste={handleImagePaste}>
                <label className="block text-xs font-bold text-gray-700">Rasm / Emoji:</label>
                
                {/* Live Preview Box / Drag & Drop Target */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`w-full h-40 rounded-xl overflow-hidden flex flex-col items-center justify-center border-2 border-dashed p-1 mb-2 transition-colors cursor-pointer ${
                    editRasmUrl ? 'border-gray-200 bg-stone-900/5' : 'border-amber-300 bg-amber-50/50'
                  }`}
                  tabIndex={0}
                  title="Ctrl+V bosib rasm qo'ying yoki sudrab keling"
                >
                  {editRasmUrl ? (
                    (editRasmUrl.startsWith('/') || editRasmUrl.startsWith('http') || editRasmUrl.startsWith('data:') || editRasmUrl.length > 10) ? (
                      <img src={editRasmUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                      <span className="text-5xl">{editRasmUrl}</span>
                    )
                  ) : (
                    <div className="text-center p-2">
                      <span className="text-xs text-amber-600 font-bold block mb-1">📋 Ctrl+V bosing yoki rasmni shu yerga sudrang</span>
                      <span className="text-[10px] text-gray-400">Telegram Desktop yoki Brauzerdan rasm nusxalang (Ctrl+C)</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editRasmUrl}
                    onChange={(e) => setEditRasmUrl(e.target.value)}
                    onPaste={handleImagePaste}
                    placeholder="URL, Emoji yoki Ctrl+V (📋)"
                    className="flex-1 px-3 py-2 text-xs font-bold rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handlePasteFromClipboardButton}
                    title="Buferdan rasmni yuklash"
                    className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 transition-colors shadow-2xs shrink-0"
                  >
                    <span>📋 Joylash</span>
                  </button>
                  <label className="cursor-pointer px-3 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-600 transition-colors shadow-2xs shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Yuklash</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {isCompressingImage && (
                  <p className="text-[10px] text-amber-600 font-bold animate-pulse">📷 Rasm avtomatik siqilmoqda (WebP/JPEG ~50KB)...</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Qisqa Tarif:</label>
                <input
                  type="text"
                  value={editTarif}
                  onChange={(e) => setEditTarif(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Masalliqlar Matni:</label>
                <textarea
                  rows={4}
                  value={editMasalliqlar}
                  onChange={(e) => setEditMasalliqlar(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tayyorlanishi (Har bir qadam yangi qatorda):</label>
                <textarea
                  rows={6}
                  value={editKorsatmalar}
                  onChange={(e) => setEditKorsatmalar(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setAdminEditingRecipe(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-300 transition-colors"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Saqlash</span>
                </button>
              </div>
            </form>

          </div>
        </div>,
        document.body
      )}

      {/* 4:3 CATEGORY COVER EDITOR MODAL */}
      {editingCatCoverId && createPortal(
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[999] flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="font-black text-sm text-[#2D2A26]">🖼️ Kategoriya Papka Rasmi (4:3)</h3>
                <p className="text-[10px] text-gray-500 font-bold">{editingCatCoverId}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingCatCoverId(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4:3 Aspect Ratio Preview */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-gray-600 block">4:3 O'lchamdagi Ko'rinishi (Live Preview):</label>
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-gray-200 relative shadow-inner">
                {catCoverUrlInput ? (
                  <img
                    src={catCoverUrlInput}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                    Rasm qo'yilmagan
                  </div>
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Rasm URL yoki Telegram Desktop / Bufer:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={catCoverUrlInput}
                    onChange={e => setCatCoverUrlInput(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 border rounded-xl text-xs font-bold"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        if (navigator.clipboard && navigator.clipboard.read) {
                          const items = await navigator.clipboard.read();
                          for (const item of items) {
                            const imageType = item.types.find(t => t.startsWith('image/'));
                            if (imageType) {
                              const blob = await item.getType(imageType);
                              const file = new File([blob], `clipboard_${Date.now()}.${imageType.split('/')[1] || 'png'}`, { type: imageType });
                              const compressed = await compressImage(file, 800, 0.75);
                              const publicUrl = await uploadImageToSupabase(compressed, `cat_cover_${Date.now()}`);
                              setCatCoverUrlInput(publicUrl);
                              return;
                            }
                          }
                        }
                        if (navigator.clipboard && navigator.clipboard.readText) {
                          const txt = await navigator.clipboard.readText();
                          if (txt && (txt.startsWith('http') || txt.startsWith('data:'))) {
                            setCatCoverUrlInput(txt.trim());
                            return;
                          }
                        }
                        alert("Buferda rasm topilmadi. Ctrl+V bosing");
                      } catch {
                        alert("Rasm nusxalangan bo'lsa, Ctrl+V bosing");
                      }
                    }}
                    className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shrink-0"
                  >
                    📋 Joylash
                  </button>
                </div>
              </div>

              <label className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                <Upload className="w-4 h-4" />
                <span>{isUploadingCatCover ? "Yuklanmoqda..." : "Kompyuter / Telegramdan Rasm Yuklash"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setIsUploadingCatCover(true);
                      const compressed = await compressImage(file, 800, 0.75);
                      const publicUrl = await uploadImageToSupabase(compressed, `cat_cover_${Date.now()}`);
                      setCatCoverUrlInput(publicUrl);
                    } catch {
                      alert("Rasmni yuklashda xatolik yuz berdi");
                    } finally {
                      setIsUploadingCatCover(false);
                    }
                  }}
                  className="hidden"
                />
              </label>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingCatCoverId(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
                >
                  Bekor Qilish
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (editingCatCoverId && catCoverUrlInput.trim()) {
                      updateCategoryCover(editingCatCoverId, catCoverUrlInput.trim());
                      setEditingCatCoverId(null);
                    }
                  }}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-md"
                >
                  Saqlash (4:3)
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
