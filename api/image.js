import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

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
  const { key } = req.query;
  if (!key) {
    return res.status(400).send('Key is required');
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: String(key),
    });

    const response = await s3Client.send(command);

    res.setHeader('Content-Type', response.ContentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const byteArray = await response.Body.transformToByteArray();
    return res.status(200).send(Buffer.from(byteArray));
  } catch (err) {
    console.error('Error fetching image from R2:', err);
    return res.status(404).send('Image not found');
  }
}
