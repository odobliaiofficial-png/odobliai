import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const accountId = 'ff193c88523c7bd026a0c6ba6237c519';
const accessKeyId = '112da4273a6597cb913fbd66e90cc202';
const secretAccessKey = 'c9a635a1f2cf3a3bad06c5a923e8baa61c1a4e383da318507de4e24b3538a4cb';
const bucketName = 'recipe-images';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default async function handler(req, res) {
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
    const objectKey = `${(filename || 'photo').replace(/[^a-zA-Z0-0_-]/g, '_')}_${Date.now()}.jpg`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: buffer,
      ContentType: 'image/jpeg',
    });

    await s3Client.send(command);

    const publicUrl = `/api/image?key=${encodeURIComponent(objectKey)}`;
    console.log('✅ Cloudflare R2 Upload Success:', objectKey);
    return res.status(200).json({ url: publicUrl, key: objectKey });
  } catch (err) {
    console.error('❌ Cloudflare R2 Upload Error:', err);
    return res.status(500).json({ error: err.message || 'Cloudflare R2 Upload failed' });
  }
}
