import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import uploadSingleImage from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Secure route accepting only authenticated admin uploads
router.post('/image', authMiddleware, adminMiddleware, uploadSingleImage, uploadImage);

export default router;
