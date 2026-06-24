import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true }, // auto-generate, not manual input
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  images: {
  type: [String],
  required: true,
  validate: [arr => arr.length > 0, 'At least one image is required']
  },
  flavors: [{ type: String }],
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
export default Product;