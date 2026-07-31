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
  recipeId: string
): Promise<UploadResult> => {
  const sizeInBytes = Math.round((dataUrl.length * 3) / 4);
  const compressedSizeKB = Math.round(sizeInBytes / 1024);

  // 1. Primary: Upload to Cloudflare R2 via /api/upload
  try {
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
  return {
    url: dataUrl,
    storageType: 'base64',
    statusMessage: 'Base64 sifatida saqlandi (Lokal fallback)',
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

