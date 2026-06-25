import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetailsPage({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p._id === id);

  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.flavors && product.flavors.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFlavor(product.flavors[0]);
    }
  }, [product]);

  if (!product) {
    return <div className="text-center py-40">Loading product details...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFlavor || 'Unflavored');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedFlavor || 'Unflavored');
    navigate('/cart');
  };

  return (
    <main className="relative pt-12 pb-20 max-w-[1280px] mx-auto px-4 md:px-16 min-h-screen">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Product Images */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-6">
          <div className="glass-card rounded-xl overflow-hidden aspect-[4/5] flex items-center justify-center p-6 md:p-12 group">
            <img 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
              src={product.imageUrl} 
              alt={product.name}
            />
          </div>
        </div>

        {/* Right: Product specs */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-8">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 glass-card text-[9px] uppercase font-display font-semibold tracking-widest rounded-sm border-white/20">PREMIUM SERIES</span>
              <span className="px-2 py-1 glass-card text-[9px] uppercase font-display font-semibold tracking-widest rounded-sm border-white/20">{product.category}</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl mb-2 text-primary">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-primary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <span className="font-display text-[10px] text-on-surface-variant font-bold">(482 REVIEWS)</span>
            </div>

            <div className="font-display font-bold text-3xl text-primary mb-8">${product.price.toFixed(2)}</div>
            
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-on-surface-variant">Pure Performance</h3>
              <p className="font-sans text-on-surface leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Flavor Selection */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="space-y-4">
              <label className="font-display font-semibold text-xs text-on-surface-variant uppercase tracking-widest">Select Flavor</label>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {product.flavors.map(flav => (
                  <button 
                    key={flav}
                    onClick={() => setSelectedFlavor(flav)}
                    className={`flex-1 py-4 glass-card rounded-lg font-display text-xs uppercase tracking-wider transition-all ${
                      selectedFlavor === flav ? 'active-selection' : 'hover:bg-white/5'
                    }`}
                  >
                    {flav}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-4">
            <label className="font-display font-semibold text-xs text-on-surface-variant uppercase tracking-widest">Quantity</label>
            <div className="flex items-center gap-4 w-32 border border-white/10 rounded-sm">
              <button 
                onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                className="px-4 py-2 hover:bg-white/5 text-primary"
              >
                -
              </button>
              <span className="font-display text-xs px-2 flex-grow text-center">{quantity.toString().padStart(2, '0')}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 hover:bg-white/5 text-primary"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col gap-4 mt-4">
            <button 
              onClick={handleAddToCart}
              className="btn-primary w-full py-4 rounded-lg font-display font-bold text-xs uppercase tracking-widest"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="btn-secondary w-full py-4 rounded-lg font-display font-bold text-xs uppercase tracking-widest"
            >
              Buy Now
            </button>
          </div>

          {/* Nutrition Facts Panel */}
          {product.nutrition && (
            <div className="glass-card rounded-xl p-6 mt-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                <h2 className="font-display font-bold text-base text-primary">NUTRITION FACTS</h2>
                <span className="font-display text-[10px] text-on-surface-variant uppercase font-semibold">PER SERVING ({product.servings || '32G'})</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-2 border-r border-white/5">
                  <span className="font-display text-[9px] text-on-surface-variant uppercase font-bold">Protein</span>
                  <span className="font-display font-bold text-lg">{product.nutrition.protein || '0G'}</span>
                </div>
                <div className="flex flex-col items-center p-2 border-r border-white/5">
                  <span className="font-display text-[9px] text-on-surface-variant uppercase font-bold">Carbs</span>
                  <span className="font-display font-bold text-lg">{product.nutrition.carbs || '0G'}</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <span className="font-display text-[9px] text-on-surface-variant uppercase font-bold">Fat</span>
                  <span className="font-display font-bold text-lg">{product.nutrition.fat || '0G'}</span>
                </div>
              </div>
              
              <div className="space-y-3 font-display text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-on-surface-variant">CALORIES</span>
                  <span className="text-primary font-bold">{product.nutrition.calories || '0 KCAL'}</span>
                </div>
                {product.nutrition.leucine && product.nutrition.leucine !== '0G' && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-on-surface-variant">L-LEUCINE</span>
                    <span className="text-primary font-bold">{product.nutrition.leucine}</span>
                  </div>
                )}
                {product.nutrition.bcaa && product.nutrition.bcaa !== '0G' && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-on-surface-variant">BCAA TOTAL</span>
                    <span className="text-primary font-bold">{product.nutrition.bcaa}</span>
                  </div>
                )}
                {product.nutrition.glutamine && product.nutrition.glutamine !== '0G' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-on-surface-variant">GLUTAMINE</span>
                    <span className="text-primary font-bold">{product.nutrition.glutamine}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Technical Specs */}
          <div className="grid grid-cols-2 gap-4 text-xs font-display font-semibold text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">biotech</span>
              <span>LAB TESTED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">eco</span>
              <span>GMO FREE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">science</span>
              <span>COLD PROCESSED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">verified</span>
              <span>ISO CERTIFIED</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
