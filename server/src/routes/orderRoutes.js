import express from 'express';
import { getOrders, addOrder, editOrderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getOrders);
router.post('/', addOrder);
router.put('/:id/status', authMiddleware, adminMiddleware, editOrderStatus);

export default router;
