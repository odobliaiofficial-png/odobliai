# Odobli.ai — Yangilangan Kodebase Nusxasi (Claude Audit uchun)

> **Eslatma**: Barcha API kalitlari va tokenlar maxfiylikni ta'minlash uchun `[REDACTED_...]` shaklida to'liqligicha yashirilgan.


## `bot\config.py`

```python
"""
Odobli.ai Bot — Konfiguratsiya
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Telegram credentials loaded securely from environment
    BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
    ADMIN_ID: int = int(os.getenv("ADMIN_ID", "0"))
    
    # Supabase credentials
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_KEY", ""))
    
    # Mini App
    WEBAPP_URL: str = os.getenv("WEBAPP_URL", os.getenv("MINI_APP_URL", "https://odobli-ai-web.vercel.app"))
    
    # Premium
    PREMIUM_PRICE: int = int(os.getenv("PREMIUM_PRICE", "25000"))
    PREMIUM_DAYS: int = 30
    TRIAL_DAYS: int = 7
    CARD_NUMBER: str = os.getenv("CARD_NUMBER", "8600 0000 0000 0000")
    CARD_TYPE: str = os.getenv("CARD_TYPE", "Humo / Uzcard")
    PAYMENT_CARD: str = os.getenv("PAYMENT_CARD", f"{CARD_NUMBER} ({CARD_TYPE})")
    
    # Webhook
    WEBHOOK_HOST: str = os.getenv("WEBHOOK_HOST", "")
    WEBHOOK_PATH: str = f"/webhook/{os.getenv('WEBHOOK_SECRET', 'odobli_sec_wh_path')}"
    WEBHOOK_URL: str = f"{WEBHOOK_HOST}{WEBHOOK_PATH}"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", "8080"))
    
    # Daily reminder
    REMINDER_HOUR: int = 9
    REMINDER_MINUTE: int = 0

config = Config()

# Export top-level variables for backwards compatibility across all modules
BOT_TOKEN = config.BOT_TOKEN
ADMIN_ID = config.ADMIN_ID
SUPABASE_URL = config.SUPABASE_URL
SUPABASE_KEY = config.SUPABASE_KEY
MINI_APP_URL = config.WEBAPP_URL
CARD_NUMBER = config.CARD_NUMBER
PAYMENT_CARD = config.PAYMENT_CARD
PREMIUM_PRICE = config.PREMIUM_PRICE

PREMIUM_DAYS = config.PREMIUM_DAYS
TRIAL_DAYS = config.TRIAL_DAYS
SUBSCRIPTION_PRICE_SOM = config.PREMIUM_PRICE

```

## `bot\main.py`

```python
"""
Odobli.ai Bot — Main Entrypoint
"""
import os
import sys

# Ensure bot folder is at head of sys.path BEFORE any local imports
BOT_DIR = os.path.dirname(os.path.abspath(__file__))
if BOT_DIR not in sys.path:
    sys.path.insert(0, BOT_DIR)

import asyncio
import logging
from config import config
from middlewares.throttling import ThrottlingMiddleware
from middlewares.ban_check import BanCheckMiddleware
from handlers import setup_routers
from services.scheduler import setup_scheduler
from aiogram import Bot, Dispatcher
from aiogram.types import BotCommand

logging.basicConfig(level=logging.INFO)

from aiohttp import web

async def handle_health_check(request):
    return web.Response(text="🤖 Odobli.ai Telegram Bot is Live and Running!", status=200)

async def start_web_server():
    port = config.PORT
    app = web.Application()
    app.router.add_get("/", handle_health_check)
    app.router.add_get("/health", handle_health_check)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", port)
    await site.start()
    logging.info(f"🌐 Health check HTTP server listening on port {port}")


async def main():
    if not config.BOT_TOKEN or config.BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("⚠️ BOT_TOKEN sozlanmagan! Iltimos, config.py yoki .env faylini sozlang.")
        return

    # Start HTTP Health Check server for Render Web Service
    await start_web_server()

    bot = Bot(token=config.BOT_TOKEN)
    dp = Dispatcher()

    # Register Middlewares
    ban_check = BanCheckMiddleware()
    throttling = ThrottlingMiddleware(rate_limit=0.5)

    dp.message.outer_middleware(ban_check)
    dp.callback_query.outer_middleware(ban_check)
    dp.message.middleware(throttling)
    dp.callback_query.middleware(throttling)

    # Register Routers
    dp.include_router(setup_routers())

    # Setup Scheduler
    setup_scheduler(bot)

    # Set Default Bot Commands
    try:
        await bot.set_my_commands([
            BotCommand(command="start", description="Botni ishga tushirish"),
            BotCommand(command="profil", description="Mening profilim"),
            BotCommand(command="premium", description="Premium obuna"),
            BotCommand(command="leaderboard", description="Peshqadamlar jadvallari"),
            BotCommand(command="feedback", description="Fikr bildirish va bog'lanish")
        ])
    except Exception as e:
        logging.warning(f"Could not set bot commands: {e}")

    print("🤖 Odobli.ai Telegram boti muvaffaqiyatli ishga tushirildi...")
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())


```

## `api\upload.js`

```javascript
import { createHmac, timingSafeEqual } from 'node:crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
]);

function getR2Config() {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } = process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    throw new Error('R2 storage is not configured');
  }
  return { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME };
}

function getS3Client(config) {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${config.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.R2_ACCESS_KEY_ID,
      secretAccessKey: config.R2_SECRET_ACCESS_KEY,
    },
  });
}

function isValidTelegramInitData(initData) {
  const botToken = process.env.BOT_TOKEN;
  if (!botToken || !initData) return false;

  const params = new URLSearchParams(initData);
  const receivedHash = params.get('hash');
  const authDate = Number(params.get('auth_date'));
  if (!receivedHash || !authDate || Date.now() / 1000 - authDate > 86400) return false;

  params.delete('hash');
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  const secret = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const expectedHash = createHmac('sha256', secret).update(dataCheckString).digest('hex');

  const expected = Buffer.from(expectedHash, 'hex');
  const actual = Buffer.from(receivedHash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export const config = {
  api: {
    bodyParser: { sizeLimit: '4mb' },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const initData = req.headers.authorization?.replace(/^tma\s+/i, '');
  if (!isValidTelegramInitData(initData)) {
    return res.status(401).json({ error: 'Telegram authorization is required' });
  }

  try {
    const { imageBase64, filename } = req.body || {};
    const match = typeof imageBase64 === 'string'
      ? imageBase64.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/)
      : null;
    if (!match) {
      return res.status(400).json({ error: 'Only JPEG, PNG, and WebP images are accepted' });
    }

    const [, contentType, b64Data] = match;
    const buffer = Buffer.from(b64Data, 'base64');
    if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) {
      return res.status(413).json({ error: 'Image must be between 1 byte and 3 MB' });
    }

    const extension = IMAGE_TYPES.get(contentType);
    const safeName = String(filename || 'photo').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);
    const objectKey = `${safeName}_${Date.now()}.${extension}`;
    const config = getR2Config();

    const command = new PutObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: objectKey,
      Body: buffer,
      ContentType: contentType,
    });

    await getS3Client(config).send(command);

    const publicUrl = `/api/image?key=${encodeURIComponent(objectKey)}`;
    console.log('✅ Cloudflare R2 Upload Success:', objectKey);
    return res.status(200).json({ url: publicUrl, key: objectKey });
  } catch (err) {
    console.error('Cloudflare R2 upload failed:', err);
    return res.status(500).json({ error: 'Image upload failed' });
  }
}

```

## `web\src\types.ts`

```typescript

export type ScriptType = 'lotin' | 'kirill';

export interface BannerConfig {
  image_url: string;
  title: string;
  subtitle: string;
  badge: string;
  button_text: string;
  action_type?: 'pazanda' | 'recipes' | 'lifehacklar' | 'premium' | 'external_link';
  external_url?: string;
  is_active?: boolean;
}

export interface Child {
  id: string;
  ism: string;
  yosh: number;
}

export interface User {

  id: string;
  telegram_id: number;
  username: string;
  ism: string;
  til_skripti: ScriptType;
  bolalar: Child[];
  trial_ends_at: string;
  is_premium: boolean;
  premium_until: string | null;
  created_at: string;
  is_admin?: boolean;
  role?: string;
}

export interface UserProgress {
  user_id: string;
  jami_ball: number;
  joriy_streak: number;
  eng_uzun_streak: number;
  oxirgi_faollik_sanasi: string;
}

export type IngredientCategory = 'sabzavot' | 'meva' | 'gosht' | 'sut_mahsuloti' | 'dukkakli' | 'qandolat' | 'yogi' | 'ziravor' | 'boshqa';

export interface Ingredient {
  id: string;
  nomi: string;
  kategoriya: IngredientCategory;
  rasm_url?: string;
  icon?: string;
}

export interface RecipeIngredient {
  recipe_id: string;
  ingredient_id: string;
  majburiymi: boolean;
}

export interface Recipe {
  id: string;
  nomi: string;
  tayyorlash_vaqti_daq: number;
  qiyinlik: 'oson' | 'orta' | 'qiyin';
  rasm_url: string;
  tarif_matni: string;
  masalliqlar_matni: string;
  korsatmalari: string[];
  holat: 'qoralama' | 'nashr';
  required_ingredient_ids: string[];
  optional_ingredient_ids?: string[];
  kategoriya?: string;
  source?: string;
}

export type RecipeSeed = Omit<Recipe, 'rasm_url' | 'required_ingredient_ids'> & {
  rasm_url?: string;
  required_ingredient_ids?: string[];
};

export interface TalePage {
  id: string;
  ertak_id: string;
  tartib_raqami: number;
  rasm_url: string;
  matn: string;
  kategoriya?: string;
}

export interface Tale {
  id: string;
  sarlavha: string;
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  muqova_rasm_url: string;
  holat: 'qoralama' | 'nashr';
  muallif?: string;
  sahifalar: TalePage[];
  created_at: string;
  kategoriya?: string;
}

export type LifehackCategory = 'pishirish_asoslari' | 'oshxona_sirlari' | 'mahsulotlarni_saqlash' | 'tezkor_usullar' | 'masalliqlarni_tejash' | 'karving' | 'oyinchoq_yasash' | 'uy_ishlari' | 'boshqa';



export interface Lifehack {
  id: string;
  sarlavha: string;
  tavsif_matni: string;
  rasm_url: string;
  kategoriya: LifehackCategory;
  bosqichlar?: string[];
  holat: 'qoralama' | 'nashr';
}

export interface Riddle {
  id: string;
  savol: string;
  javob: string;
  variantlar: string[];
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  qiyinlik: 'oson' | 'orta' | 'qiyin';
  izoh?: string;
  kategoriya?: string;
}

export interface MathProblem {
  id: string;
  savol: string;
  togri_javob: string;
  notogri_variantlar: string[];
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  tushuntirish?: string;
  kategoriya?: string;
}

export interface PaymentProof {
  id: string;
  user_id: string;
  summa: number;
  screenshot_file_id: string;
  screenshot_preview_url?: string;
  holat: 'kutilmoqda' | 'tasdiqlangan' | 'rad_etilgan';
  created_at: string;
  tasdiqlangan_at?: string | null;
}

export interface RoutineTask {
  id: string;
  sarlavha: string;
  vaqt: string;
  kategoriya: 'ona' | 'bola';
  ball: number;
  bajarildi: boolean;
  icon: string;
}

export interface Badge {
  id: string;
  nomi: string;
  tavsif: string;
  icon: string;
  ochilgan: boolean;
  talab: string;
}

export interface ShoppingItem {
  id: string;
  nomi: string;
  miqdori?: string;
  bajarildi: boolean;
}

export type ActiveTab = 'home' | 'pazanda' | 'lifehacklar' | 'profil' | 'admin';

// Type Aliases for compatibility
export type Ertak = Tale;
export type Topishmoq = Riddle;
export type MatematikMasala = MathProblem;
export type UserProfile = User;

```

## `web\src\utils\imageCompressor.ts`

```typescript
import { supabase } from '../lib/supabase';

const BUCKET = 'recipe-images';

export interface UploadResult {
  url: string;
  storageType: 'r2' | 'supabase' | 'base64';
  statusMessage: string;
  compressedSizeKB?: number;
}

/** Convert a data URL (base64) to a Blob */
const dataUrlToBlob = (dataUrl: string): Blob => {
  const [meta, b64] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
};

/** Compress an image file on the client (Canvas → JPEG/WebP with max dimension limit 1600px) */
export const compressImage = (
  file: File,
  maxDimension = 1600,
  quality = 0.8,
  format: 'image/jpeg' | 'image/webp' = 'image/jpeg'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Limit longest side to maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL(format, quality);
          resolve(compressedDataUrl);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

/**
 * Upload a compressed data-URL image directly to Cloudflare R2 Storage via /api/upload.
 * Primary: Cloudflare R2 (100% Enterprise Reliability, 10GB Free Storage, 0$ Egress Fees).
 * Fallback: Supabase Storage, and lastly Data URL.
 * Returns UploadResult with explicit storageType and statusMessage for Admin UI visibility.
 */
export const uploadImageWithStatus = async (
  dataUrl: string,
  recipeId: string,
  onProgress?: (status: string) => void
): Promise<UploadResult> => {
  const sizeInBytes = Math.round((dataUrl.length * 3) / 4);
  const compressedSizeKB = Math.round(sizeInBytes / 1024);

  onProgress?.("Rasm siqilmoqda...");

  // 1. Primary: Upload to Cloudflare R2 via /api/upload
  try {
    onProgress?.("Cloudflare R2 ga yuklanmoqda...");
    const telegramInitData = (window as any).Telegram?.WebApp?.initData;
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(telegramInitData ? { Authorization: `tma ${telegramInitData}` } : {}),
      },
      body: JSON.stringify({
        imageBase64: dataUrl,
        filename: `${recipeId}_${Date.now()}.jpg`,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.url && (json.url.startsWith('/api/') || json.url.startsWith('http'))) {
        console.log('✅ Uploaded to Cloudflare R2 Storage:', json.url);
        onProgress?.("✅ Rasm R2 ga saqlandi!");
        return {
          url: json.url,
          storageType: 'r2',
          statusMessage: 'Cloudflare R2 ga saqlandi (CDN Active)',
          compressedSizeKB,
        };
      }
    } else {
      console.warn('/api/upload Cloudflare R2 status:', res.status);
    }
  } catch (err) {
    console.warn('Cloudflare R2 proxy upload failed, attempting Supabase fallback:', err);
  }

  // 2. Fallback: Upload to Supabase Storage
  try {
    onProgress?.("Supabase zaxira xotirasiga yuklanmoqda...");
    const blob = dataUrlToBlob(dataUrl);
    const ext = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/png' ? 'png' : 'jpg';
    const path = `${recipeId}_${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, blob, {
        contentType: blob.type,
        upsert: true,
      });

    if (!error) {
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

      console.log('✅ Uploaded to Supabase Storage (Fallback):', urlData.publicUrl);
      onProgress?.("✅ Rasm Supabase ga saqlandi!");
      return {
        url: urlData.publicUrl,
        storageType: 'supabase',
        statusMessage: 'Supabase Storage ga saqlandi (Fallback)',
        compressedSizeKB,
      };
    }
    console.warn('Supabase upload error:', error.message);
  } catch (err) {
    console.warn('Supabase storage fallback error:', err);
  }

  // 3. Final Fallback: Base64 data URL
  onProgress?.("⚠️ Bulutga ulanib bo'lmadi, lokal saqlandi");
  return {
    url: dataUrl,
    storageType: 'base64',
    statusMessage: '⚠️ Bulutga ulanib bo\'lmadi, vaqtincha lokal keshda saqlandi',
    compressedSizeKB,
  };
};

/** Backward compatible helper function */
export const uploadImageToSupabase = async (
  dataUrl: string,
  recipeId: string
): Promise<string> => {
  const result = await uploadImageWithStatus(dataUrl, recipeId);
  return result.url;
};


```

## `web\src\utils\cropIconMapper.ts`

```typescript
import cropIcons from 'open-crop-icons';

/**
 * Uzbek ingredient / crop name dictionary mapping to Open Crop Icons keys
 */
const uzbekToCropKeyMap: Record<string, string> = {
  // Sabzavotlar
  'pomidor': 'cherryTomato',
  'tomati': 'cherryTomato',
  'bodring': 'cucumber',
  'sabzi': 'carrot',
  'piyoz': 'shirazOnion',
  'sharlot': 'shallot',
  'sarimsoq': 'garlic',
  'baqlajon': 'eggplant',
  'kartoshka': 'potato',
  'qovoq': 'butternutSquash',
  'karam': 'cabbage',
  'brokkoli': 'broccoli',
  'cauliflower': 'cauliflower',
  'qalampir': 'chiliPepper',
  'bulgori': 'bellPepper',
  'bulg\'or': 'bellPepper',

  // Ko'kat va ziravorlar
  'rayhon': 'basil',
  'kashnich': 'cilantro',
  'petrushka': 'parsley',
  'yalpiz': 'mint',
  'rukkola': 'arugula',
  'selderash': 'celery',

  // Mevalar va Donlar
  'olma': 'apple',
  'limon': 'lemon',
  'uzum': 'grape',
  'qovun': 'cantaloupe',
  'tarvuz': 'watermelon',
  'bodom': 'almond',
  'makkajoxori': 'corn',
  'makkajo\'xori': 'corn',
  'suli': 'oats',
  'bug\'doy': 'wheat',
  'qo\'ziqorin': 'chantrelle',
  'shampinyon': 'cremini',
  'veshenka': 'blueOyster',
};

/**
 * Resolves an Uzbek ingredient/crop term to an Open Crop Icon SVG URL string.
 * Returns null if no matching crop icon is found.
 */
export function getCropIconUrl(term: string): string | null {
  if (!term) return null;
  const lower = term.toLowerCase().trim();

  for (const [key, iconName] of Object.entries(uzbekToCropKeyMap)) {
    if (lower.includes(key)) {
      const src = (cropIcons as Record<string, string>)[iconName];
      if (src) return src;
    }
  }

  if ((cropIcons as Record<string, string>)[lower]) {
    return (cropIcons as Record<string, string>)[lower];
  }

  return null;
}

export default cropIcons;

```

## `web\src\utils\searchNormalizer.ts`

```typescript
/**
 * Smart Uzbek Culinary Search Normalizer & Typo Tolerant Fuzzy Matcher
 * Maps common typos, variations, and regional spelling variants to canonical search terms.
 */
export function normalizeSearchQuery(query: string): string {
  if (!query) return '';
  let q = query.toLowerCase().trim();

  const synonymMap: [RegExp, string][] = [
    // Avokado variations (avacado, avakado, avokada, avokod, abokado, avocado)
    [/\b(avacado|avakado|avokada|avokod|abokado|avocado)\b/gi, 'avokado'],
    
    // Pomidor variations (pamidor, pamdor, pamido, tomati, tomato)
    [/\b(pamidor|pamdor|pamido|tomati|tomato)\b/gi, 'pomidor'],
    
    // Kartoshka variations (kartoska, kartochka, kartofel, batat)
    [/\b(kartoska|kartochka|kartofel)\b/gi, 'kartoshka'],
    
    // Piyoz variations (pyoz, poyoz, pioz, onion)
    [/\b(pyoz|poyoz|pioz|onion)\b/gi, 'piyoz'],
    
    // Sarimsoq variations (sarimsok, chesnok, sarimsoqpiyoz, garlic)
    [/\b(sarimsok|chesnok|sarimsoqpiyoz|garlic)\b/gi, 'sarimsoq'],
    
    // Go'sht variations (gosht, g'osht, gusht, meat)
    [/\b(gosht|g'osht|gusht|meat)\b/gi, "go'sht"],
    
    // Sabzi variations (sabze, sabzy, carrot)
    [/\b(sabze|sabzy|carrot)\b/gi, 'sabzi'],
    
    // Bodring variations (bodrin, badring, cucumber)
    [/\b(bodrin|badring|cucumber)\b/gi, 'bodring'],

    // Karam variations (kram, qaram, cabbage)
    [/\b(kram|qaram|cabbage)\b/gi, 'karam'],

    // Tovuq variations (tavuk, tavuq, chicken)
    [/\b(tavuk|tavuq|chicken)\b/gi, 'tovuq'],

    // Sariyog' variations (sariyog|saryog|butter)
    [/\b(sariyog|saryog|butter)\b/gi, "sariyog'"],
  ];

  for (const [regex, replacement] of synonymMap) {
    q = q.replace(regex, replacement);
  }

  return q;
}

/**
 * Checks if a target text matches the user's search query, accounting for typos and variations.
 */
export function fuzzyMatchSearch(text: string, searchQuery: string): boolean {
  if (!searchQuery) return true;
  if (!text) return false;

  const textLower = text.toLowerCase();
  const rawQ = searchQuery.toLowerCase().trim();
  const normQ = normalizeSearchQuery(searchQuery);

  // Direct match or normalized match
  if (textLower.includes(rawQ) || textLower.includes(normQ)) {
    return true;
  }

  return false;
}

```

## `web\src\components\Lifehacklar.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Lifehack, LifehackCategory } from '../types';
import { Lightbulb, Sparkles, ChevronDown, ChevronUp, CheckCircle2, Folder, FolderOpen, ArrowLeft, Loader2 } from 'lucide-react';

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

            {/* Barchasi All Folder Card */}
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSelectCat('barchasi')}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-4 rounded-2xl text-white shadow-md cursor-pointer transition-all flex items-center justify-between group active:scale-98"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center p-2 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Category3DIcon icon3d="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Folder.png" emoji="📁" alt="3D Folder" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm leading-tight">
                    {t("Barcha Maslahatlar")}
                  </h3>
                  <p className="text-xs text-white/90 mt-0.5">
                    {t("Barcha kategoriyalardagi sirlarni ko'rish")}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white border border-white/30 backdrop-blur-xs flex-shrink-0">
                {getCategoryCount('barchasi')} {t("ta")}
              </span>
            </motion.div>

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
            className="space-y-4"
          >
            {/* Sticky Top Navigation Bar */}
            <div className="sticky top-0 z-20 bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] p-3.5 rounded-2xl flex items-center justify-between shadow-md shadow-pink-500/20 border border-pink-400/30 text-white backdrop-blur-md">
              <button
                onClick={() => {
                  triggerHaptic();
                  setSelectedCat(null);
                }}
                className="flex items-center gap-2 text-xs font-extrabold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all active:scale-95 border border-white/25 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-amber-200" />
                <span>{t("Papkalarga Qaytish")}</span>
              </button>

              <div className="flex items-center gap-2 text-right">
                <div>
                  <span className="badge-gold text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block mb-0.5">
                    📁 {getCategoryCount(selectedCat)} {t("ta maslahat")}
                  </span>
                  <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5 justify-end">
                    <span>{selectedCat === 'barchasi' ? t("Barcha Maslahatlar") : t(activeCategoryObj?.label || '')}</span>
                  </h3>
                </div>
                {activeCategoryObj?.icon3d && (
                  <img src={activeCategoryObj.icon3d} alt="3D icon" className="w-8 h-8 object-contain filter drop-shadow-sm flex-shrink-0" />
                )}
              </div>
            </div>

            {/* Lifehack Cards Inside This Folder */}
            <div className="space-y-3">
              {filteredHacks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-pink-200 p-6 shadow-sm">
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
                      className="bg-white p-4 rounded-2xl border border-pink-200/90 hover:border-[#DB2777] shadow-sm transition-all cursor-pointer select-none active:bg-pink-50/40"
                    >
                      <div className="flex gap-3.5 items-start">
                        {lh.rasm_url && (lh.rasm_url.startsWith('http') || lh.rasm_url.startsWith('/') || lh.rasm_url.startsWith('data:')) ? (
                          <img
                            src={lh.rasm_url}
                            alt={lh.sarlavha}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0 shadow-sm border border-pink-100"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border border-pink-200 flex items-center justify-center text-3xl shrink-0 shadow-sm">
                            {lh.rasm_url || '💡'}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-extrabold text-[#DB2777] bg-pink-100 px-2 py-0.5 rounded-md border border-pink-200 uppercase">
                            {t(lh.kategoriya)}
                          </span>
                          <h3 className="font-extrabold text-[#2E121D] text-sm mt-1 leading-snug">
                            {t(lh.sarlavha)}
                          </h3>
                          <p className="text-xs text-[#9D4C6C] mt-1 leading-relaxed">
                            {t(lh.tavsif_matni)}
                          </p>
                        </div>
                      </div>

                      {/* Expand Action Indicator */}
                      <div className="w-full mt-3 pt-2.5 border-t border-pink-100 flex items-center justify-between text-xs font-extrabold text-[#DB2777]">
                        <span>{isExpanded ? t("Bosqichlarni yashirish") : t("Batafsil bosqichlarni ko'rish")}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>

                      {/* Step-by-step content */}
                      {isExpanded && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 pt-3 border-t border-dashed border-pink-200 space-y-2 animate-in fade-in"
                        >
                          {lh.bosqichlar && lh.bosqichlar.length > 0 && (
                            <>
                              <h4 className="font-extrabold text-xs text-[#2E121D] uppercase tracking-wider mb-2">
                                📋 {t("Ketma-ketlik bosqichlari")}:
                              </h4>
                              {lh.bosqichlar.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-[#374151] bg-pink-50/50 p-3 rounded-xl border border-pink-100">
                                  <span className="w-5 h-5 rounded-full bg-[#DB2777] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="leading-relaxed flex-1">{t(step)}</span>
                                </div>
                              ))}
                            </>
                          )}

                          {lh.foydali_lahzalar && lh.foydali_lahzalar.length > 0 && (
                            <div className="mt-3 pt-2 border-t border-pink-100">
                              <h5 className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider mb-1.5">
                                ✨ {t("Foydali jihatlari")}:
                              </h5>
                              <div className="flex flex-wrap gap-1.5">
                                {lh.foydali_lahzalar.map((tip, idx) => (
                                  <span key={idx} className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    {t(tip)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
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

```

## `web\src\components\BottomNav.tsx`

```typescript
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



```

## `web\src\components\AdminPanel.tsx`

```typescript
import React, { useState, useEffect } from 'react';

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
  Upload,
  Folder
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
    lifehackBannerConfig,
    updateLifehackBannerConfig,
    categoryCovers,
    updateCategoryCover,
    isAdmin,
    t
  } = useApp();

  // Lifehack Banner Form State
  const [lifehackBannerBadgeInput, setLifehackBannerBadgeInput] = useState<string>(lifehackBannerConfig?.badge || '💡 Foydali Maslahatlar');
  const [lifehackBannerTitleInput, setLifehackBannerTitleInput] = useState<string>(lifehackBannerConfig?.title || "Oila & Ro'zg'or Lifehacklari");
  const [lifehackBannerSubtitleInput, setLifehackBannerSubtitleInput] = useState<string>(lifehackBannerConfig?.subtitle || "Oshxona, hunarmandchilik va ro'zg'or papkalari");
  const [lifehackBannerIconInput, setLifehackBannerIconInput] = useState<string>(lifehackBannerConfig?.icon_or_url || '📁');
  const [isUploadingLifehackBanner, setIsUploadingLifehackBanner] = useState<boolean>(false);
  const [lifehackBannerSuccessToast, setLifehackBannerSuccessToast] = useState<string | null>(null);

  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ type: 'recipe' | 'lifehack'; id: string; title: string } | null>(null);

  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' = 'light') => {
    try {
      const haptic = (window as any).Telegram?.WebApp?.HapticFeedback;
      if (!haptic) return;
      if (type === 'success') {
        haptic.notificationOccurred('success');
      } else {
        haptic.impactOccurred(type);
      }
    } catch (e) {}
  };

  // Category Folder Covers Editor State
  const [selectedCategoryForCover, setSelectedCategoryForCover] = useState<string>('pishirish_asoslari');
  const [categoryCoverInput, setCategoryCoverInput] = useState<string>(categoryCovers?.[selectedCategoryForCover] || '');
  const [isUploadingCategoryCover, setIsUploadingCategoryCover] = useState<boolean>(false);
  const [categoryCoverSuccessToast, setCategoryCoverSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    setCategoryCoverInput(categoryCovers?.[selectedCategoryForCover] || '');
  }, [selectedCategoryForCover, categoryCovers]);

  const processLifehackBannerFile = async (file: File) => {
    try {
      setIsUploadingLifehackBanner(true);
      const compressed = await compressImage(file, 1600, 0.8);
      const result = await uploadImageWithStatus(compressed, `lh_banner_${Date.now()}`);
      setLifehackBannerIconInput(result.url);
      setLifehackBannerSuccessToast(`✅ ${result.statusMessage} (${result.compressedSizeKB} KB)`);
      setTimeout(() => setLifehackBannerSuccessToast(null), 4000);
    } catch (err) {
      alert("Rasmni yuklashda xatolik yuz berdi");
    } finally {
      setIsUploadingLifehackBanner(false);
    }
  };

  const handleLifehackBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processLifehackBannerFile(file);
  };

  const handleSaveLifehackBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateLifehackBannerConfig({
      badge: lifehackBannerBadgeInput.trim(),
      title: lifehackBannerTitleInput.trim(),
      subtitle: lifehackBannerSubtitleInput.trim(),
      icon_or_url: lifehackBannerIconInput.trim(),
    });
    setLifehackBannerSuccessToast("✅ Lifehacklar banneri muvaffaqiyatli saqlandi!");
    setTimeout(() => setLifehackBannerSuccessToast(null), 4000);
  };

  const processCategoryCoverFile = async (file: File) => {
    try {
      setIsUploadingCategoryCover(true);
      const compressed = await compressImage(file, 800, 0.85);
      const result = await uploadImageWithStatus(compressed, `cat_cover_${selectedCategoryForCover}_${Date.now()}`);
      setCategoryCoverInput(result.url);
      updateCategoryCover(selectedCategoryForCover, result.url);
      setCategoryCoverSuccessToast(`✅ ${result.statusMessage} (${result.compressedSizeKB} KB)`);
      setTimeout(() => setCategoryCoverSuccessToast(null), 4000);
    } catch (err) {
      alert("Papka muqovasini yuklashda xatolik");
    } finally {
      setIsUploadingCategoryCover(false);
    }
  };

  const handleSaveCategoryCover = (e: React.FormEvent) => {
    e.preventDefault();
    updateCategoryCover(selectedCategoryForCover, categoryCoverInput.trim());
    setCategoryCoverSuccessToast("✅ Papka muqovasi saqlandi!");
    setTimeout(() => setCategoryCoverSuccessToast(null), 4000);
  };

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

  useEffect(() => {
    if (bannerConfig) {
      setBannerTitleInput(bannerConfig.title || '');
      setBannerSubtitleInput(bannerConfig.subtitle || '');
      setBannerBadgeInput(bannerConfig.badge || '');
      setBannerButtonTextInput(bannerConfig.button_text || '');
      setBannerActionType(bannerConfig.action_type || 'pazanda');
      setBannerExternalUrl(bannerConfig.external_url || '');
      setBannerImageUrl(bannerConfig.image_url || '');
    }
  }, [bannerConfig]);

  useEffect(() => {
    if (lifehackBannerConfig) {
      setLifehackBannerBadgeInput(lifehackBannerConfig.badge || '💡 Foydali Maslahatlar');
      setLifehackBannerTitleInput(lifehackBannerConfig.title || "Oila & Ro'zg'or Lifehacklari");
      setLifehackBannerSubtitleInput(lifehackBannerConfig.subtitle || "Oshxona, hunarmandchilik va ro'zg'or papkalari");
      setLifehackBannerIconInput(lifehackBannerConfig.icon_or_url || '📁');
    }
  }, [lifehackBannerConfig]);



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

          {/* SECTION LIFEHACKS BANNER MANAGEMENT */}
          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DC] shadow-sm space-y-5 mt-6">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="text-base font-black text-[#2E121D] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#DB2777]" />
                  <span>💡 Lifehacklar Bo'limi Banner Sozlamalari</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Lifehacklar bo'limi tepadagi pushti bannerining matn va rasm/ikonkalarini yangilang.
                </p>
              </div>
            </div>

            {lifehackBannerSuccessToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl animate-in fade-in">
                {lifehackBannerSuccessToast}
              </div>
            )}

            {/* Live Lifehack Banner Preview */}
            <div className="space-y-2">
              <span className="text-xs font-black text-stone-700 uppercase tracking-wider">
                📱 Lifehacklar Sahifasidagi Ko'rinishi (Live Preview):
              </span>
              <div className="bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] p-4 rounded-2xl flex items-center justify-between shadow-md shadow-pink-500/20 border border-pink-400/30 text-white">
                <div>
                  <span className="badge-gold text-xs font-extrabold px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {lifehackBannerBadgeInput || "💡 Foydali Maslahatlar"}
                  </span>
                  <h2 className="text-base font-extrabold text-white tracking-tight leading-tight">
                    {lifehackBannerTitleInput || "Oila & Ro'zg'or Lifehacklari"}
                  </h2>
                  <p className="text-xs text-white/90 mt-1 max-w-[240px]">
                    {lifehackBannerSubtitleInput || "Oshxona, hunarmandchilik va ro'zg'or papkalari"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shadow-xs backdrop-blur-xs flex-shrink-0">
                  {lifehackBannerIconInput && (lifehackBannerIconInput.startsWith('http') || lifehackBannerIconInput.startsWith('/') || lifehackBannerIconInput.startsWith('data:')) ? (
                    <img src={lifehackBannerIconInput} alt="Icon" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <span>{lifehackBannerIconInput || '📁'}</span>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveLifehackBanner} className="space-y-4 pt-2">
              {/* Image upload field */}
              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 space-y-2">
                <label className="text-xs font-black text-[#2E121D] flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#DB2777]" />
                  <span>Banner Ikonkasi yoki Rasm URL:</span>
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2.5 bg-[#DB2777] hover:bg-[#BE185D] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs flex items-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingLifehackBanner ? "Yuklanmoqda..." : "Galareyadan Rasm Tanlash"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLifehackBannerImageUpload}
                      disabled={isUploadingLifehackBanner}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleClipboardButtonClick(setLifehackBannerIconInput)}
                    className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>📋 Joylash (Paste)</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={lifehackBannerIconInput}
                  onChange={e => setLifehackBannerIconInput(e.target.value)}
                  placeholder="URL yoki Emoji (masalan: 📁, 💡)"
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-200 bg-white focus:outline-none focus:border-[#DB2777]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Beyj (Badge) Matni:</label>
                  <input
                    type="text"
                    value={lifehackBannerBadgeInput}
                    onChange={e => setLifehackBannerBadgeInput(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DB2777]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Sarlavha (Title):</label>
                  <input
                    type="text"
                    value={lifehackBannerTitleInput}
                    onChange={e => setLifehackBannerTitleInput(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DB2777]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Kichik Tavsif (Subtitle):</label>
                  <input
                    type="text"
                    value={lifehackBannerSubtitleInput}
                    onChange={e => setLifehackBannerSubtitleInput(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DB2777]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#DB2777] to-[#F472B6] hover:from-[#BE185D] hover:to-[#DB2777] text-white text-xs font-black rounded-2xl shadow-md transition-all active:scale-98"
              >
                ✅ Lifehack Bannerini Saqlash
              </button>
            </form>
          </div>

          {/* SECTION CATEGORY FOLDER COVERS EDITOR */}
          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DC] shadow-sm space-y-5 mt-6">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="text-base font-black text-[#2E121D] flex items-center gap-2">
                  <Folder className="w-5 h-5 text-[#DB2777]" />
                  <span>📁 Papkalar Kategoriyalari Muqovasi (Covers Editor)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Har bir kategoriya papkasiga galareyadan rasm yuklang yoki emoji qo'ying (R2 ga saqlanadi).
                </p>
              </div>
            </div>

            {categoryCoverSuccessToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl animate-in fade-in">
                {categoryCoverSuccessToast}
              </div>
            )}

            <form onSubmit={handleSaveCategoryCover} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Kategoriyani Tanlang:</label>
                <select
                  value={selectedCategoryForCover}
                  onChange={e => setSelectedCategoryForCover(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#DB2777] font-bold"
                >
                  <option value="pishirish_asoslari">🍳 Pishirish asoslari</option>
                  <option value="oshxona_sirlari">🧂 Oshxona sirlari</option>
                  <option value="mahsulotlarni_saqlash">🌿 Mahsulotlarni saqlash</option>
                  <option value="tezkor_usullar">⚡ Tezkor usullar</option>
                  <option value="masalliqlarni_tejash">♻️ Masalliqlarni tejash</option>
                  <option value="karving">🎨 Karving</option>
                  <option value="oyinchoq_yasash">🧸 O'yinchoq yasash</option>
                  <option value="uy_ishlari">🏠 Uy ishlari</option>
                  <option value="boshqa">📦 Boshqa</option>
                </select>
              </div>

              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 space-y-2">
                <label className="text-xs font-black text-[#2E121D] flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#DB2777]" />
                  <span>Papka Muqovasi (Rasm URL yoki Emoji):</span>
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2.5 bg-[#DB2777] hover:bg-[#BE185D] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs flex items-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingCategoryCover ? "Yuklanmoqda..." : "Galareyadan Rasm Yuklash"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) processCategoryCoverFile(file);
                      }}
                      disabled={isUploadingCategoryCover}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleClipboardButtonClick(setCategoryCoverInput)}
                    className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>📋 Joylash (Paste)</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={categoryCoverInput}
                  onChange={e => setCategoryCoverInput(e.target.value)}
                  placeholder="https://... yoki 🍳"
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-200 bg-white focus:outline-none focus:border-[#DB2777]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black rounded-2xl shadow-md transition-all active:scale-98"
              >
                ✅ Papka Muqovasini Saqlash
              </button>
            </form>
          </div>
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
                  <option value="oshxona_sirlari">Oshxona sirlari</option>
                  <option value="mahsulotlarni_saqlash">Mahsulotlarni saqlash</option>
                  <option value="tezkor_usullar">Tezkor usullar</option>
                  <option value="masalliqlarni_tejash">Masalliqlarni tejash</option>
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

              <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100 space-y-2">
                <label className="font-bold text-[#2D2A26] block">Rasm URL yoki Emoji (ixtiyoriy)</label>
                
                <div className="flex items-center gap-2">
                  <label className="px-3 py-2 bg-[#DB2777] hover:bg-[#BE185D] text-white text-[11px] font-bold rounded-xl cursor-pointer transition-colors shadow-xs flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Galareyadan Yuklash</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const compressed = await compressImage(file, 1200, 0.8);
                            const result = await uploadImageWithStatus(compressed, `lh_${Date.now()}`);
                            setLifehackImage(result.url);
                            alert(`✅ ${result.statusMessage}`);
                          } catch {
                            alert("Rasmni yuklashda xatolik");
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleClipboardButtonClick(setLifehackImage)}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1"
                  >
                    <span>📋 Joylash</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="https://... yoki 🍳"
                  value={lifehackImage}
                  onChange={e => setLifehackImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-red-100 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">O'chirishni tasdiqlang</h3>
              <p className="text-xs text-gray-600 mt-1">
                Rostdan ham <span className="font-bold text-red-600">"{deleteConfirmItem.title}"</span> elementini bazadan o'chirmoqchimisiz?
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl text-xs transition-colors"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmItem.type === 'recipe') {
                    deleteRecipe(deleteConfirmItem.id);
                  } else {
                    deleteLifehack(deleteConfirmItem.id);
                  }
                  triggerHaptic('success');
                  setDeleteConfirmItem(null);
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-md"
              >
                Ha, O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

```

## `web\src\components\PazandaAI.tsx`

```typescript
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


  const handleCloseRecipeModal = () => {
    try {
      (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    } catch (e) {}
    setActiveRecipe(null);
    setSelectedRecipeModal(null);
  };

  useEffect(() => {
    if (selectedRecipeModal) {
      setActiveRecipe(selectedRecipeModal);
    }
  }, [selectedRecipeModal]);

  // Telegram Native Back Button & Browser History Handling for Recipe Modal
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    const backButton = tg?.BackButton;

    if (activeRecipe !== null) {
      if (backButton) {
        backButton.show();
        const handleTelegramBack = () => {
          handleCloseRecipeModal();
        };
        backButton.onClick(handleTelegramBack);

        return () => {
          backButton.offClick(handleTelegramBack);
          backButton.hide();
        };
      }

      window.history.pushState({ recipeModal: activeRecipe.id }, '');
      const handlePopState = () => {
        handleCloseRecipeModal();
      };
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [activeRecipe]);



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
                onClick={handleCloseRecipeModal}
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

```

## `web\src\index.css`

```css
@import "tailwindcss";

:root {
  --safe-top: calc(var(--tg-safe-area-inset-top, env(safe-area-inset-top, 0px)) + 14px);
  --bg-primary: #FFF5F7;
  --text-primary: #2E121D;
  --accent-rose: #DB2777;
  --accent-gold: #F59E0B;
}

.shadow-2xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
}
.w-13 {
  width: 3.25rem;
}
.h-13 {
  height: 3.25rem;
}


@layer base {
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #FFF5F7;
    color: #2E121D;
    letter-spacing: -0.01em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', 'Inter', sans-serif;
    letter-spacing: -0.02em;
  }
}

/* Hide scrollbars for clean horizontal scrolling UI */
::-webkit-scrollbar {
  display: none;
}
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ==========================================
   Luxurious Rose Pink, Soft Gold & White Design System
   ========================================== */

/* Premium Card - Crisp White with Soft Layered Depth & Smooth Physics */
.card-premium, .card-pink {
  background-color: #FFFFFF;
  border: 1px solid rgba(252, 231, 243, 0.8);
  border-radius: 1.25rem; /* 20px */
  box-shadow: 0 4px 20px -2px rgba(219, 39, 119, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

@media (hover: hover) and (pointer: fine) {
  .card-premium:hover, .card-pink:hover {
    border-color: #F472B6;
    box-shadow: 0 10px 28px -4px rgba(219, 39, 119, 0.14), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  }
}

.card-premium:active, .card-pink:active {
  transform: scale(0.98);
  transition: transform 0.1s ease-out;
}

/* Rose Banner Gradient with Depth */
.card-burgundy-banner, .card-rose-banner {
  background: linear-gradient(135deg, #EC4899 0%, #DB2777 50%, #BE185D 100%);
  border-radius: 1.25rem; /* 20px */
  color: #FFFFFF;
  box-shadow: 0 10px 30px -4px rgba(219, 39, 119, 0.38), 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Rose Button with Tactile Physics */
.btn-burgundy-pill, .btn-rose-pill {
  background-color: #DB2777;
  color: #FFFFFF;
  font-weight: 700;
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(219, 39, 119, 0.32);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
}

@media (hover: hover) and (pointer: fine) {
  .btn-burgundy-pill:hover, .btn-rose-pill:hover {
    background-color: #BE185D;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(219, 39, 119, 0.42);
  }
}

.btn-burgundy-pill:active, .btn-rose-pill:active {
  transform: scale(0.96) translateY(0px);
  transition: transform 0.08s ease-out;
}

/* Warm Amber Gold CTA Button */
.btn-gold-pill {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #FFFFFF;
  font-weight: 700;
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.38);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
}

@media (hover: hover) and (pointer: fine) {
  .btn-gold-pill:hover {
    background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(245, 158, 11, 0.48);
  }
}

.btn-gold-pill:active {
  transform: scale(0.96) translateY(0px);
  transition: transform 0.08s ease-out;
}

/* Premium Gold Badge */
.badge-gold {
  background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
  color: #451A03;
  font-weight: 800;
  border-radius: 9999px;
  padding: 0.15rem 0.6rem;
  letter-spacing: 0.02em;
  font-size: 0.75rem;
}

/* Apple Glassmorphism Utilities */
.glass-header {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(252, 231, 243, 0.7);
}

.glass-nav, .glass-dock {
  background: linear-gradient(135deg, rgba(190, 24, 93, 0.94) 0%, rgba(219, 39, 119, 0.94) 50%, rgba(190, 24, 93, 0.94) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 12px 36px rgba(190, 24, 93, 0.38), 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Skeleton Loading Shimmer */
.skeleton-loader {
  background: linear-gradient(90deg, #FCE7F3 25%, #FDF2F7 50%, #FCE7F3 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 0.5rem;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Telegram WebView interaction polish: instant touch response without forcing
   layout-changing animation on individual components. */
button,
[role="button"] {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

button:not(:disabled):active,
[role="button"]:active {
  filter: brightness(0.98);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}

```
