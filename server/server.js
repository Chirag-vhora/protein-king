import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Product, Order } from './models.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aura-performance';

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- PRODUCTS API ---

// GET: All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
});

// GET: Single Product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
});

// POST: Add Product (Admin)
app.post('/api/products', async (req, res) => {
  try {
    const { name, sku, description, price, quantity, category, imageUrl, tags, servings, nutrition, flavors } = req.body;
    
    // Validate SKU uniqueness
    const existing = await Product.findOne({ sku });
    if (existing) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const product = new Product({
      name,
      sku,
      description,
      price,
      quantity,
      category,
      imageUrl,
      tags: tags || [],
      servings,
      nutrition: nutrition || {},
      flavors: flavors || ['Unflavored']
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT: Update Product (Admin)
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE: Delete Product (Admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});


// --- ORDERS API ---

// GET: All Orders (Admin)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});

// POST: Place Order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, customerEmail, shippingAddress, items, subtotal, shipping, tax, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Verify stock and decrement
    for (const item of items) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (dbProduct.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product: ${dbProduct.name}` });
      }
      // Decrement stock
      dbProduct.quantity -= item.quantity;
      await dbProduct.save();
    }

    const order = new Order({
      customerName,
      customerEmail,
      shippingAddress,
      items,
      subtotal,
      shipping,
      tax,
      totalAmount
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error placing order', error: error.message });
  }
});

// PUT: Update Order Status (Admin)
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { orderStatus } = req.body;
    if (!['Pending', 'Shipped', 'Delivered'].includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
