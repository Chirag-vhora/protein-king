import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getAllOrders = async () => {
  return await Order.find({})
    .populate('items.product')
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
};

export const createOrder = async (orderData) => {
  const { items } = orderData;

  if (!items || items.length === 0) {
    throw new Error('No items in order');
  }

  // Verify stock and decrement
  for (const item of items) {
    const dbProduct = await Product.findById(item.product);
    if (!dbProduct) {
      throw new Error(`Product ${item.product} not found`);
    }

    if (dbProduct.quantity < item.quantity) {
      throw new Error(`Insufficient stock for product: ${dbProduct.name}`);
    }

    // Decrement stock
    dbProduct.quantity -= item.quantity;
    await dbProduct.save();
  }

  const order = new Order({
    user: orderData.user || null,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    shippingAddress: orderData.shippingAddress,
    items,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping ?? 0,
    tax: orderData.tax ?? 0,
    totalAmount: orderData.totalAmount,
    paymentMethod: orderData.paymentMethod || 'Manual',
    paymentStatus: orderData.paymentStatus || 'Pending',
    orderStatus: orderData.orderStatus || 'Pending'
  });

  return await order.save();
};

export const updateOrderStatus = async (id, orderStatus) => {
  const allowedStatuses = [
    'Pending',
    'Confirmed',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  if (!allowedStatuses.includes(orderStatus)) {
    throw new Error('Invalid order status');
  }

  return await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
};