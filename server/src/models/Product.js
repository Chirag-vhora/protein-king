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

productSchema.pre('save', async function(next) {
  if (!this.sku || !this.sku.trim()) {
    const prefix = 'AURA';
    const char = (this.name && typeof this.name === 'string')
      ? this.name.trim().charAt(0).toUpperCase().replace(/[^A-Z]/g, 'X')
      : 'X';
    
    let sku;
    let isUnique = false;
    let attempts = 0;
    const ProductModel = this.constructor;
    
    while (!isUnique && attempts < 10) {
      const num = Math.floor(100 + Math.random() * 900);
      sku = `${prefix}-${char}-${num}`;
      
      const existing = await ProductModel.findOne({ sku });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }
    
    if (!isUnique) {
      sku = `${prefix}-${char}-${Date.now().toString().slice(-4)}`;
    }
    
    this.sku = sku;
  }
  next();
});

export const Product = mongoose.model('Product', productSchema);
export default Product;