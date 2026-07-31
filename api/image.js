import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

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

export default async function handler(req, res) {
  const { key } = req.query;
  if (!key) {
    return res.status(400).send('Key is required');
  }

  try {
    const config = getR2Config();
    const command = new GetObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: String(key),
    });

    const response = await getS3Client(config).send(command);

    res.setHeader('Content-Type', response.ContentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const byteArray = await response.Body.transformToByteArray();
    return res.status(200).send(Buffer.from(byteArray));
  } catch (err) {
    console.error('Error fetching image from R2:', err);
    return res.status(404).send('Image not found');
  }
}
