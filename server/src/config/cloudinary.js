import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Fallback to load .env if not loaded by parent process
dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isConfigValid = cloudName && apiKey && apiSecret;

if (!isConfigValid) {
  const missing = [];
  if (!cloudName) missing.push('CLOUDINARY_CLOUD_NAME');
  if (!apiKey) missing.push('CLOUDINARY_API_KEY');
  if (!apiSecret) missing.push('CLOUDINARY_API_SECRET');
  console.warn(`[Cloudinary Setup Alert] Missing environment variables: ${missing.join(', ')}. Image uploads will fail.`);
} else {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
  console.log('[Cloudinary Setup] Cloudinary client initialized successfully.');
}

export default cloudinary;
