import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  tags: [{ type: String }],
  servings: { type: String },
  nutrition: {
    protein: { type: String },
    carbs: { type: String },
    fat: { type: String },
    calories: { type: String },
    leucine: { type: String },
    bcaa: { type: String },
    glutamine: { type: String }
  },
  flavors: [{ type: String }]
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
export default Product;
