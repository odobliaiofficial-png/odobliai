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
