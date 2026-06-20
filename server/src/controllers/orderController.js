import * as orderService from '../services/orderService.js';

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

export const addOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    if (error.message.includes('not found') || error.message.includes('No items')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Insufficient stock')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Error placing order', error: error.message });
    }
  }
};

export const editOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, orderStatus);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
