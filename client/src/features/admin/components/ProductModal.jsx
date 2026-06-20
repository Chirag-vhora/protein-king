import React, { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, onSubmit, editingProduct, formError }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: 0,
    quantity: 0,
    category: 'WHEY',
    imageUrl: '',
    servings: '30 Servings',
    protein: '',
    carbs: '',
    fat: '',
    calories: '',
    flavors: 'Chocolate, Vanilla'
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        sku: editingProduct.sku,
        description: editingProduct.description,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        category: editingProduct.category,
        imageUrl: editingProduct.imageUrl,
        servings: editingProduct.servings || '30 Servings',
        protein: editingProduct.nutrition?.protein || '',
        carbs: editingProduct.nutrition?.carbs || '',
        fat: editingProduct.nutrition?.fat || '',
        calories: editingProduct.nutrition?.calories || '',
        flavors: editingProduct.flavors ? editingProduct.flavors.join(', ') : 'Chocolate, Vanilla'
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        description: '',
        price: 0,
        quantity: 0,
        category: 'WHEY',
        imageUrl: '',
        servings: '30 Servings',
        protein: '0G',
        carbs: '0G',
        fat: '0G',
        calories: '0 KCAL',
        flavors: 'Chocolate, Vanilla'
      });
    }
  }, [editingProduct, isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative glass-modal w-full max-w-lg mx-4 p-8 overflow-y-auto max-h-[90vh]">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-display font-bold text-lg text-white mb-1">
                {editingProduct ? 'Edit Performance Unit' : 'New Performance Unit'}
              </h2>
              <p className="text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">
                {editingProduct ? 'Update ledger information' : 'Register inventory SKU'}
              </p>
            </div>
            <button className="text-white/40 hover:text-white" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {formError && (
            <div className="text-red-400 text-xs font-display p-2 bg-red-950/20 border border-red-900/50 rounded mb-4">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Product Designation (Name) *</label>
              <input 
                className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                placeholder="e.g., ISO-WHEY ELITE" 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">System SKU *</label>
                <input 
                  className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                  placeholder="AURA-X-000" 
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Price (USD) *</label>
                <input 
                  className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                  placeholder="0.00" 
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Initial Stock *</label>
                <input 
                  className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                  placeholder="Units in batch" 
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Category</label>
                <select 
                  className="w-full bg-surface-dim border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="WHEY">WHEY</option>
                  <option value="VEGAN">VEGAN</option>
                  <option value="PRE-WORKOUT">PRE-WORKOUT</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Product Image URL *</label>
              <input 
                className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                placeholder="https://..." 
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Description</label>
              <textarea 
                className="w-full bg-transparent border border-white/20 focus:border-white focus:ring-0 text-white p-2 transition-all outline-none text-sm h-16"
                placeholder="Elite formulation details..." 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Servings Size</label>
                <input 
                  className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                  placeholder="e.g. 30 Servings" 
                  type="text"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Flavors (comma separated)</label>
                <input 
                  className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                  placeholder="Chocolate, Vanilla" 
                  type="text"
                  name="flavors"
                  value={formData.flavors}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block mb-2">Nutritional Values (Optional)</span>
              <div className="grid grid-cols-4 gap-2">
                <input 
                  className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                  placeholder="Prot (28G)" 
                  name="protein"
                  value={formData.protein}
                  onChange={handleInputChange}
                />
                <input 
                  className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                  placeholder="Carbs (1G)" 
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleInputChange}
                />
                <input 
                  className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                  placeholder="Fat (0.5G)" 
                  name="fat"
                  value={formData.fat}
                  onChange={handleInputChange}
                />
                <input 
                  className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                  placeholder="Cal (120 KCAL)" 
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <button 
                type="submit"
                className="w-full bg-white text-black py-4 font-display font-semibold text-xs btn-primary-glow active:scale-[0.98] transition-all"
              >
                CONFIRM AND WRITE TO LEDGER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
