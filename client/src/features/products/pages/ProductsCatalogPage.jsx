import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { getFadeUpVariants, getStaggerContainerVariants, hoverScale, tapScale, getSpringTransition } from '../../../constants/motionVariants.js';

export default function ProductsCatalogPage({ products, loading, addToCart }) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('DEFAULT');
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery, sortBy]);

  // Dynamic category extraction
  const categories = ['ALL', ...new Set(products.map(p => p.category.trim().toUpperCase()))];

  // Filter and sort products
  const filteredProducts = products.filter(prod => {
    const matchesCategory = selectedCategory === 'ALL' || prod.category.trim().toUpperCase() === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'PRICE_LOW_HIGH') {
      return a.price - b.price;
    }
    if (sortBy === 'PRICE_HIGH_LOW') {
      return b.price - a.price;
    }
    if (sortBy === 'NAME_A_Z') {
      return a.name.localeCompare(b.name);
    }
  });

  // Infinite Scroll IntersectionObserver
  useEffect(() => {
    if (visibleCount >= sortedProducts.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 12, sortedProducts.length));
      }
    }, { threshold: 0.1, rootMargin: '150px' });

    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [visibleCount, sortedProducts.length]);

  return (
    <div className="py-12 px-5 md:px-16 lg:px-24 max-w-[1280px] mx-auto min-h-screen">
      {/* Page Header */}
      <motion.div 
        className="mb-12 text-center lg:text-left animate-fade-in"
        initial="hidden"
        animate="visible"
        variants={getFadeUpVariants(shouldReduceMotion)}
      >
        <span className="font-display text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase mb-2 block">
          Precision Formulations
        </span>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
          ELITE SHOP
        </h1>
        <div className="hairline-divider mx-auto lg:mx-0 w-24"></div>
      </motion.div>

      {/* Filters, Search, and Sort Panel */}
      <div className="glass-card p-6 mb-8 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
          
          {/* Dynamic Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] font-display font-bold tracking-wider uppercase rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-black btn-primary-glow font-semibold'
                    : 'border border-white/10 hover:border-white/40 text-white/60 hover:text-white bg-white/[0.02]'
                }`}
                whileHover={hoverScale(shouldReduceMotion, 1.02)}
                whileTap={tapScale(shouldReduceMotion, 0.98)}
                transition={getSpringTransition()}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Search and Sort controls */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 flex-1 lg:max-w-xl">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-lg select-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search formulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.02] border border-white/10 focus:border-white/30 rounded text-sm text-white placeholder-white/30 focus:ring-0 outline-none transition-all"
              />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 bg-surface-dim border border-white/10 focus:border-white/30 text-white text-xs font-display font-semibold py-3 px-4 rounded outline-none cursor-pointer focus:ring-0 transition-all uppercase tracking-wider"
              >
                <option value="DEFAULT">Sort by: Default</option>
                <option value="PRICE_LOW_HIGH">Price: Low to High</option>
                <option value="PRICE_HIGH_LOW">Price: High to Low</option>
                <option value="NAME_A_Z">Name: A to Z</option>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="text-center py-20 text-on-surface-variant font-display text-sm tracking-widest">
          LOADING PERFORMANCE UTILITIES...
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-20 text-on-surface-variant font-display text-sm tracking-widest border border-white/5 bg-white/[0.01] rounded-lg">
          NO FORMULATIONS MATCH YOUR FILTER CRITERIA
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={getStaggerContainerVariants(0.08)}
          >
            {sortedProducts.slice(0, visibleCount).map(prod => (
              <motion.div
                key={prod._id}
                className="glass-card p-6 flex flex-col justify-between gap-6"
                variants={getFadeUpVariants(shouldReduceMotion)}
              >
                <div 
                onClick={() => navigate(`/product/${prod._id}`)}
                className="aspect-square relative flex items-center justify-center bg-white/5 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img 
                  className={`w-4/5 h-4/5 object-contain brightness-110 transition-all duration-500 group-hover:scale-110 ${
                    prod.images && prod.images.length > 1 ? 'group-hover:opacity-0' : ''
                  }`} 
                  src={prod.images?.[0] || prod.imageUrl} 
                  alt={prod.name}
                />
                {prod.images && prod.images.length > 1 && (
                  <img 
                    className="absolute w-4/5 h-4/5 object-contain brightness-110 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-110 transition-all duration-500 pointer-events-none" 
                    src={prod.images[1]} 
                    alt={`${prod.name} hover`}
                  />
                )}
                {prod.tags && prod.tags[0] && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-1 text-[9px] font-bold tracking-widest text-primary border border-white/40 rounded-sm uppercase">
                      {prod.tags[0]}
                    </span>
                  </div>
                )}
              </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 
                        onClick={() => navigate(`/product/${prod._id}`)}
                        className="font-display font-bold text-base text-primary cursor-pointer hover:underline"
                      >
                        {prod.name}
                      </h4>
                      <p className="font-display text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
                        {prod.servings || '30 Servings'}
                      </p>
                    </div>
                    <span className="font-display font-bold text-base text-primary">
                      ${prod.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="hairline-divider"></div>
                  <div className="flex gap-2">
                    <motion.button 
                      onClick={() => addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate')}
                      className="w-full py-3 glass-btn text-primary font-display font-bold text-[10px] uppercase tracking-widest"
                      whileHover={hoverScale(shouldReduceMotion, 1.015)}
                      whileTap={tapScale(shouldReduceMotion, 0.985)}
                      transition={getSpringTransition()}
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button 
                      onClick={() => {
                        addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate');
                        navigate('/cart');
                      }}
                      className="w-full py-3 btn-primary text-black font-display font-bold text-[10px] uppercase tracking-widest"
                      whileHover={hoverScale(shouldReduceMotion, 1.015)}
                      whileTap={tapScale(shouldReduceMotion, 0.985)}
                      transition={getSpringTransition()}
                    >
                      Buy Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {visibleCount < sortedProducts.length && (
            <div id="sentinel" className="flex flex-col items-center justify-center py-10 w-full">
              <span className="material-symbols-outlined text-primary text-2xl animate-spin">
                sync
              </span>
              <span className="ml-2 font-display text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mt-2 animate-pulse">
                Loading More Formulations...
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
