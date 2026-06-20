import Product from '../models/Product.js';

export const getAllProducts = async () => {
  return await Product.find({});
};

export const getProductById = async (id) => {
  return await Product.findById(id);
};

export const findProductBySku = async (sku) => {
  return await Product.findOne({ sku });
};

export const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

export const updateProduct = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
