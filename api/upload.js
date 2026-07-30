export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, filename } = req.body || {};
    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    const b64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const buffer = Buffer.from(b64Data, 'base64');
    const blob = new Blob([buffer], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', blob, filename || 'recipe_photo.jpg');

    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const catboxUrl = (await response.text()).trim();
      if (catboxUrl.startsWith('http')) {
        return res.status(200).json({ url: catboxUrl });
      }
    }

    return res.status(500).json({ error: 'Failed to get URL from Catbox' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Catbox proxy failed' });
  }
}
