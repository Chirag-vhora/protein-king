import * as productService from '../services/productService.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, sku, description, price, quantity, category, imageUrl, tags, servings, nutrition, flavors } = req.body;
    
    // Validate SKU uniqueness
    const existing = await productService.findProductBySku(sku);
    if (existing) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const newProduct = await productService.createProduct({
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

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
