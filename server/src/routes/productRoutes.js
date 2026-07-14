import express from 'express';
import { getProducts, getProduct, addProduct, editProduct, removeProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, adminMiddleware, addProduct);
router.put('/:id', authMiddleware, adminMiddleware, editProduct);
router.delete('/:id', authMiddleware, adminMiddleware, removeProduct);

export default router;
