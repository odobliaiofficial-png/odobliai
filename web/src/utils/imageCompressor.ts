import { supabase } from '../lib/supabase';

const BUCKET = 'recipe-images';

/** Convert a data URL (base64) to a Blob */
const dataUrlToBlob = (dataUrl: string): Blob => {
  const [meta, b64] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
};

/** Compress an image file on the client (Canvas → JPEG) */
export const compressImage = (file: File, maxWidth = 800, quality = 0.75): Promise<string> => {
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

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
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
 * Upload a compressed data-URL image to Catbox.moe (Primary: 100% Free, Unlimited Bandwidth, Permanent).
 * Fallback: Supabase Storage, and lastly Data URL.
 */
export const uploadImageToSupabase = async (
  dataUrl: string,
  recipeId: string
): Promise<string> => {
  const blob = dataUrlToBlob(dataUrl);

  // 1. Primary: Upload to Catbox.moe (Free, Unlimited, Permanent)
  try {
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', blob, `${recipeId}_${Date.now()}.jpg`);

    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const catboxUrl = (await res.text()).trim();
      if (catboxUrl.startsWith('http')) {
        console.log('✅ Uploaded to Catbox CDN (Unlimited Free):', catboxUrl);
        return catboxUrl;
      }
    }
  } catch (err) {
    console.warn('Catbox upload failed, falling back to Supabase Storage:', err);
  }

  // 2. Fallback: Upload to Supabase Storage
  try {
    const ext = blob.type === 'image/png' ? 'png' : 'jpg';
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

      console.log('✅ Uploaded to Supabase Storage:', urlData.publicUrl);
      return urlData.publicUrl;
    }
    console.warn('Supabase upload error:', error.message);
  } catch (err) {
    console.warn('Supabase storage fallback error:', err);
  }

  // 3. Final Fallback: Base64 data URL
  return dataUrl;
};
