import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getAllOrders = async () => {
  return await Order.find({}).populate('items.product').sort({ createdAt: -1 });
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
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    shippingAddress: orderData.shippingAddress,
    items,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    tax: orderData.tax,
    totalAmount: orderData.totalAmount
  });

  return await order.save();
};

export const updateOrderStatus = async (id, orderStatus) => {
  if (!['Pending', 'Shipped', 'Delivered'].includes(orderStatus)) {
    throw new Error('Invalid order status');
  }
  return await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
};
