import express from 'express';
import { getOrders, addOrder, editOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getOrders);
router.post('/', addOrder);
router.put('/:id/status', editOrderStatus);

export default router;
