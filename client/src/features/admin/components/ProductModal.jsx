import { useState, useEffect } from 'react';
import { uploadProductImage } from '../../../services/api.js';

const getInitialFormData = (product) => ({
  name: product?.name || '',
  sku: product?.sku || '',
  description: product?.description || '',
  price: product?.price ?? 0,
  quantity: product?.quantity ?? 0,
  category: product?.category || 'WHEY',
  image1: product?.images?.[0] || '',
  image2: product?.images?.[1] || '',
  image3: product?.images?.[2] || '',
  flavors: product?.flavors?.length ? product.flavors.join(', ') : 'Chocolate, Vanilla'
});

export default function ProductModal({ isOpen, onClose, onSubmit, editingProduct, formError }) {
  const [formData, setFormData] = useState(() => getInitialFormData(editingProduct));
  const [uploading, setUploading] = useState({ image1: false, image2: false, image3: false });
  const [previews, setPreviews] = useState({
    image1: editingProduct?.images?.[0] || '',
    image2: editingProduct?.images?.[1] || '',
    image3: editingProduct?.images?.[2] || ''
  });
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e, name) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit.');
      return;
    }

    setUploadError('');

    // Instant Preview
    const localUrl = URL.createObjectURL(file);
    setPreviews(prev => ({ ...prev, [name]: localUrl }));

    // Start upload
    setUploading(prev => ({ ...prev, [name]: true }));

    try {
      const result = await uploadProductImage(file);
      setFormData(prev => ({ ...prev, [name]: result.imageUrl }));
      setPreviews(prev => ({ ...prev, [name]: result.imageUrl })); // replace local blob with Cloudinary URL
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Failed to upload image. Please try again.');
      // Restore original value
      setPreviews(prev => ({ ...prev, [name]: formData[name] }));
    } finally {
      setUploading(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const isAnyUploading = Object.values(uploading).some(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" data-lenis-prevent>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div 
        className="relative glass-modal w-full max-w-lg mx-4 p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        data-lenis-prevent
      >
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">System SKU</label>
                <input 
                  className="w-full bg-transparent border-none border-b border-white/20 text-white/50 py-2 outline-none text-sm cursor-not-allowed"
                  placeholder="Auto-generated" 
                  type="text"
                  name="sku"
                  value={editingProduct ? formData.sku : ''}
                  disabled
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* Direct Image Upload slots */}
            <div className="space-y-3">
              <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest block mb-1">Product Images (First is required) *</label>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(imageNumber => {
                  const name = `image${imageNumber}`;
                  const isUploading = uploading[name];
                  const previewUrl = previews[name];

                  return (
                    <div 
                      key={imageNumber} 
                      className="border border-white/10 bg-white/[0.02] rounded-lg aspect-square flex flex-col items-center justify-center p-2 relative overflow-hidden group cursor-pointer hover:bg-white/[0.04] transition-all"
                      onClick={() => document.getElementById(`file-input-${name}`).click()}
                    >
                      <input 
                        type="file" 
                        id={`file-input-${name}`}
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, name)}
                      />

                      {isUploading ? (
                        <div className="flex flex-col items-center gap-1 select-none">
                          <span className="material-symbols-outlined text-primary text-xl animate-spin">sync</span>
                          <span className="text-[8px] font-bold text-outline tracking-wider uppercase">UPLOADING...</span>
                        </div>
                      ) : previewUrl ? (
                        <>
                          <img 
                            src={previewUrl} 
                            alt={`Preview ${imageNumber}`} 
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 select-none">
                            <span className="material-symbols-outlined text-white text-base">cloud_upload</span>
                            <span className="text-[8px] font-bold text-white tracking-widest uppercase">REPLACE</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 text-white/30 group-hover:text-white/60 transition-colors select-none">
                          <span className="material-symbols-outlined text-xl">add_photo_alternate</span>
                          <span className="text-[8px] font-bold tracking-widest uppercase text-center">SLOT {imageNumber}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {uploadError && (
                <div className="text-red-400 text-[10px] font-display text-center">
                  {uploadError}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Description *</label>
              <textarea 
                className="w-full bg-transparent border border-white/20 focus:border-white focus:ring-0 text-white p-2 transition-all outline-none text-sm h-16"
                placeholder="Elite formulation details..." 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
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

            <div className="flex flex-col gap-4 mt-6">
              <button 
                type="submit"
                disabled={isAnyUploading}
                className="w-full bg-white text-black py-4 font-display font-semibold text-xs btn-primary-glow active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnyUploading ? 'UPLOADING ATTACHMENTS...' : 'CONFIRM AND WRITE TO LEDGER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
