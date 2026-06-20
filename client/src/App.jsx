import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

const API_BASE = 'http://localhost:5001/api';

// --- MAIN CLIENT STOREFRONT ---
export default function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('auraUser') || 'null'));

  const loginUser = (username) => {
    localStorage.setItem('auraUser', JSON.stringify(username));
    setUser(username);
  };

  const logoutUser = () => {
    localStorage.removeItem('auraUser');
    setUser(null);
  };

  // Load products from DB
  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Cart operations
  const addToCart = (product, quantity, flavor) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product._id === product._id && item.flavor === flavor);
      if (existing) {
        return prevCart.map(item => 
          (item.product._id === product._id && item.flavor === flavor)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity, flavor }];
    });
  };

  const removeFromCart = (productId, flavor) => {
    setCart(prevCart => prevCart.filter(item => !(item.product._id === productId && item.flavor === flavor)));
  };

  const updateQuantity = (productId, flavor, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.product._id === productId && item.flavor === flavor) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen relative font-sans bg-surface-dim text-on-surface">
        {/* Background Mesh */}
        <div className="mesh-gradient"></div>

        {/* Global Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto h-20">
            <div className="flex items-center gap-8">
              <Link to="/" className="font-display font-extrabold text-xl md:text-2xl tracking-tighter text-primary">
                AURA PERFORMANCE
              </Link>
              <div className="hidden md:flex gap-8">
                <Link to="/" className="font-display font-semibold text-xs tracking-wider text-primary border-b-2 border-primary pb-1">
                  SHOP
                </Link>
                <a href="#discover" className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                  DISCOVER
                </a>
                <a href="#science" className="font-display font-semibold text-xs tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                  SCIENCE
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/cart" className="p-2 hover:bg-white/5 transition-all rounded-full active:scale-95 duration-200 relative flex items-center">
                <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold text-[10px] tracking-wider text-primary border border-white/20 px-2 py-1 rounded bg-white/5 uppercase">
                    {user}
                  </span>
                  <button 
                    onClick={logoutUser} 
                    className="font-display font-semibold text-[10px] tracking-wider text-outline hover:text-primary transition-colors uppercase"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <Link to="/login" className="p-2 hover:bg-white/5 transition-all rounded-full active:scale-95 duration-200 flex items-center">
                  <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
                </Link>
              )}

              <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/5 transition-all rounded-full active:scale-95 duration-200 flex items-center">
                <span className="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<StorefrontPage products={products} loading={loading} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetailsPage products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} user={user} />} />
            <Route path="/login" element={<LoginPage loginUser={loginUser} />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <footer className="bg-surface-dim border-t border-white/10 w-full mt-20 relative z-20">
          <div className="flex flex-col items-center py-16 px-4 md:px-16 gap-8 max-w-[1280px] mx-auto">
            <span className="font-display font-bold text-lg text-primary tracking-widest">AURA PERFORMANCE</span>
            <div className="flex flex-wrap justify-center gap-8">
              <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#privacy">PRIVACY</a>
              <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#terms">TERMS</a>
              <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#shipping">SHIPPING</a>
              <a className="font-display text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#contact">CONTACT</a>
            </div>
            <p className="font-sans text-[10px] tracking-widest text-on-surface-variant opacity-60 text-center uppercase">
              © 2026 AURA PERFORMANCE. ENGINEERED FOR ELITE RESULTS.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// --- STOREFRONT / HOME PAGE ---
function StorefrontPage({ products, loading, addToCart }) {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-16 max-w-[1280px] mx-auto min-h-[819px] flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
          <div className="space-y-2">
            <span className="font-display text-xs font-semibold tracking-widest text-outline uppercase">Next-Gen Bioavailability</span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-primary leading-none tracking-tight">
              PRECISION <br/>ENGINEERED <br/>PEAK RESULTS.
            </h1>
          </div>
          <p className="font-sans text-lg text-on-secondary-container max-w-lg mx-auto lg:mx-0">
            Elite supplements designed for those who demand cognitive clarity and physical dominance. No fillers. Pure performance.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <a href="#shop" className="btn-primary px-8 py-4 font-display font-semibold text-xs rounded-sm uppercase tracking-widest flex items-center justify-center">
              Shop Now
            </a>
            <a href="#science" className="glass-btn px-8 py-4 font-display font-semibold text-xs text-primary rounded-sm uppercase tracking-widest flex items-center justify-center">
              The Science
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative w-full h-[300px] md:h-[500px] flex items-center justify-center">
          <div 
            className="relative z-10 w-full h-full bg-contain bg-center bg-no-repeat filter grayscale brightness-110 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-[2s] hover:scale-105"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALTF6Sry7zsx5EejXzc1c73eOPc9keykZX25bpHebDdZUlEjpigtxAwMTEoVFdMysYZ7pwCXwCJnFoBerv0fwO3UNBTtCh4aev9_8bEXlwFduFAhpoD3tZLK3HsquVm8V-Rw8PQ9yd7tVZT8c2xiU-jGXTe9erAdkOi2yyUQoRlNjcG6YvLcaOMKAHtOW_Xku-TOc_ePpWzC4MIuAbn1PHae8PQcA19Mleuhaw5vgudmHf4yOx_lbjjpDk28gCkcd8ELkjnZFxmA')` }}
          />
          <div className="absolute inset-0 flex items-center justify-center -z-0">
            <div className="w-[80%] h-[80%] rounded-full bg-white/5 blur-[120px]"></div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section id="discover" className="py-20 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="mb-8">
          <h2 className="font-display font-semibold text-2xl text-primary tracking-wide">CATEGORIES</h2>
          <div className="hairline-divider mt-4 w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[350px]">
          <div className="glass-card md:col-span-2 group relative overflow-hidden flex items-end p-8 min-h-[220px]">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-60"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2iA6uSwcXcSrcJayZGERunwmp4J8llw4lz43y6kqSrg94muh5ftFeOQ2VG9TE4z0BDQ3O7jgqX6jvYtV9f3itfxivW9OsjAXBkPkLaWbevGS5BQS2i8TVuOChhuzqnaPd_PovngsOejKjs4N-WpuPNOQGF-7JJmkUIajx_7IgF_k9drcuINOA1hUUqL2Pyt-Wy6JcLkWE4ea1GaibYIQslU5Sz176bZiZIwwalWct0KY8HgdfRh1rPuK73z5NkLWa1BhG2HSwVw')` }}
            />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl text-primary">WHEY</h3>
              <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">ISOLATE PERFORMANCE</p>
            </div>
          </div>

          <div className="glass-card group relative overflow-hidden flex items-end p-8 min-h-[220px]">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-40"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCi9WF6uUOy-0H_ypczQi7vXb42ekyDC5uhC0W0mf_RnyGyzZVwv8WZvDnpQ6RSaqMW5wijRRo0MyIz_TBbJSkSJvj56RFLe7ufkX7sI677R2BMZ5H5osN6Ahua9vJbfTyFrOYibI5yEGTASbUFWBJK8btwJv6v_STyejJFeeF2G4n0pUWLPWu4bluY9UEwRnQuVwCjKLfexrxkwviqOBk_qdkmtC3QieAFosurGJPiW_G1nMts8Qiz07_YJmNreDWzRByQ19JzWw')` }}
            />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl text-primary">VEGAN</h3>
              <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">PLANT PRECISION</p>
            </div>
          </div>

          <div className="glass-card group relative overflow-hidden flex items-end p-8 min-h-[220px]">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105 opacity-40"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAURfYfQHOImjbTuOf3DNxcyZA02J-y59XxXmvq5URUmw1LjKKNGQ0xPA9qLHcQeOQU10QTTEpRtnADE0yv_gBjCbElcy9CGggN0DdG8ORow_Mz0EiEZq2DeYKcKC0reOVF9lehPQio7IlnXV7OMAnLjPtZkUMaxl0qJ2x2BTodORTqVPkivFbGt2ES37vXipZyax1DAxhAGCU15-CTvsYiRptW51h4XFr-JKM0jVQTieCLCHp1fNFoArE_mTtt0LZqSx04ewikiQ')` }}
            />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl text-primary">PRE-WORKOUT</h3>
              <p className="font-display text-[10px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-semibold uppercase">NEURAL DRIVE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="py-20 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display font-semibold text-2xl text-primary uppercase tracking-wide">Elite Formulas</h2>
            <p className="font-display text-xs text-on-surface-variant mt-2 font-semibold tracking-wider">SHOP THE COLLECTION</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-on-surface-variant">LOADING PERFORMANCE UTILITIES...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(prod => (
              <div key={prod._id} className="glass-card p-6 flex flex-col justify-between gap-6">
                <div 
                  onClick={() => navigate(`/product/${prod._id}`)}
                  className="aspect-square relative flex items-center justify-center bg-white/5 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img 
                    className="w-4/5 h-4/5 object-contain grayscale brightness-110 transition-transform duration-500 group-hover:scale-110" 
                    src={prod.imageUrl} 
                    alt={prod.name}
                  />
                  {prod.tags && prod.tags[0] && (
                    <div className="absolute top-4 left-4">
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
                      <p className="font-display text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">{prod.servings || '30 Servings'}</p>
                    </div>
                    <span className="font-display font-bold text-base text-primary">${prod.price.toFixed(2)}</span>
                  </div>
                  <div className="hairline-divider"></div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate')}
                      className="w-full py-3 glass-btn text-primary font-display font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => {
                        addToCart(prod, 1, prod.flavors ? prod.flavors[0] : 'Chocolate');
                        navigate('/cart');
                      }}
                      className="w-full py-3 btn-primary text-black font-display font-bold text-[10px] uppercase tracking-widest transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Science Section */}
      <section id="science" className="py-20 relative overflow-hidden bg-black/20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="glass-card p-12 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[60px]"></div>
              <h2 className="font-display font-bold text-3xl text-primary mb-6">MICRONIZED FOR INSTANT UPTAKE</h2>
              <p className="font-sans text-base text-on-secondary-container leading-relaxed mb-8">
                Our proprietary processing tech ensures particle sizes under 5 microns. Faster absorption. Zero digestive friction. Maximum nitrogen retention for the elite human system.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  <span className="font-display text-xs font-semibold tracking-wider text-primary">BIO-AVAILABLE ISOLATE</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  <span className="font-display text-xs font-semibold tracking-wider text-primary">ZERO ARTIFICIAL SWEETENERS</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  <span className="font-display text-xs font-semibold tracking-wider text-primary">THIRD PARTY LAB CERTIFIED</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="order-1 md:order-2 h-[350px] md:h-[500px] glass-card overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center grayscale brightness-75 transition-transform duration-[2000ms] hover:scale-105"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXPZ2xqM91doJnK6Zjhg1HI4ZvesOE63t81qwf4wkbgjCLFN8u1z23NofeyIHXZNmtP8T5zUgCWQ4aHVgp_KNtUXev2_1SlTXR0A_Lz31SHUSAB8AGI_u63FXTQWSfPgDjJh_M5L8ESrt0dXWl0aBmEnJHHLMOTQDpZ2c4wzMAvYqbz7ovcwkx0kumr3SZoBzZJ4DfcsBIH5rUvoY80Si7CyHr_pKnNayi-QZEamP0JGGjCN3NUuXufYXokK0R5aFRvYBfYq2IAg')` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// --- PRODUCT DETAILS PAGE ---
function ProductDetailsPage({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p._id === id);

  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.flavors && product.flavors.length > 0) {
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
          <div className="glass-card rounded-xl overflow-hidden aspect-[4/5] flex items-center justify-center p-12 group">
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
              <div className="flex gap-4">
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

// --- CART & CHECKOUT PAGE ---
function CartPage({ cart, updateQuantity, removeFromCart, clearCart, user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user || '',
    email: user ? `${user.toLowerCase().replace(/\s+/g, '')}@aura.tech` : '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 12.00 : 0;
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!formData.name || !formData.email || !formData.address) {
      setError('Please fill in shipping information.');
      return;
    }

    setSubmitting(true);
    setError('');

    const orderPayload = {
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: formData.address,
      items: cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        flavor: item.flavor
      })),
      subtotal,
      shipping,
      tax,
      totalAmount
    };

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Order placement failed');
      }

      clearCart();
      navigate('/success');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Checkout failed. Please check stock levels.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-40 max-w-[1280px] mx-auto px-4">
        <h1 className="font-display font-extrabold text-3xl mb-4 text-primary">YOUR CART IS EMPTY</h1>
        <p className="font-sans text-on-secondary-container mb-8">SECURE ENCRYPTED CHECKOUT REQUIRES ACTIVE ITEMS</p>
        <Link to="/" className="btn-primary px-8 py-4 font-display font-bold text-xs uppercase tracking-widest inline-block">
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-12 pb-20 px-4 md:px-16 max-w-[1280px] mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-primary tracking-tight">MY CART</h1>
        <p className="font-display text-xs text-on-secondary-container mt-2 tracking-widest font-semibold">SECURE ENCRYPTED CHECKOUT PROVISION</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart items and forms */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Cart items list */}
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={`${item.product._id}-${item.flavor}-${idx}`} className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-24 h-24 bg-surface-container-highest overflow-hidden rounded flex-shrink-0 flex items-center justify-center p-2">
                  <img className="max-w-full max-h-full object-contain grayscale" src={item.product.imageUrl} alt={item.product.name} />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-base text-primary tracking-wide">{item.product.name}</h3>
                      <p className="font-display text-[10px] text-outline mt-1 uppercase tracking-wider">FLAVOR: {item.flavor}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product._id, item.flavor)}
                      className="text-on-surface-variant hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-1 border border-white/10 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.flavor, -1)}
                        className="px-3 py-1 hover:bg-white/5 text-primary font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="font-display text-xs px-2">{item.quantity.toString().padStart(2, '0')}</span>
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.flavor, 1)}
                        className="px-3 py-1 hover:bg-white/5 text-primary font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-display font-bold text-base text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form details */}
          <div className="glass-card p-8">
            <h2 className="font-display font-bold text-lg text-primary mb-6">SHIPPING DETAILS</h2>
            
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="font-display text-[9px] font-bold text-outline mb-1">FULL NAME</label>
                  <input 
                    className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                    placeholder="ERIK VANCE" 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-display text-[9px] font-bold text-outline mb-1">EMAIL ADDRESS</label>
                  <input 
                    className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                    placeholder="ERIK@AURA.TECH" 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-display text-[9px] font-bold text-outline mb-1">SHIPPING ADDRESS</label>
                <input 
                  className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                  placeholder="721 NEPTUNE SECTOR, PERFORMANCE HUB" 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="pt-6 border-t border-white/10">
                <h2 className="font-display font-bold text-lg text-primary mb-6">PAYMENT GATEWAY (DEMO)</h2>
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label className="font-display text-[9px] font-bold text-outline mb-1">CARD NUMBER</label>
                    <div className="flex items-center gap-2 border-b border-white/20 focus-within:border-white transition-colors">
                      <input 
                        className="bg-transparent border-none flex-1 font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40 focus:ring-0"
                        placeholder="4111 2222 3333 4444" 
                        type="text" 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="material-symbols-outlined text-outline">lock</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="font-display text-[9px] font-bold text-outline mb-1">EXPIRY DATE</label>
                      <input 
                        className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                        placeholder="MM/YY" 
                        type="text" 
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-display text-[9px] font-bold text-outline mb-1">CVC</label>
                      <input 
                        className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/40"
                        placeholder="123" 
                        type="password" 
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Order Summary sticky */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32 w-full">
          <div className="glass-card p-8 flex flex-col gap-6">
            <h2 className="font-display font-bold text-xs text-primary border-b border-white/10 pb-4 tracking-wider">ORDER SUMMARY</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-sans">SUBTOTAL</span>
                <span className="font-display font-bold text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-sans">PRIORITY SHIPPING</span>
                <span className="font-display font-bold text-primary">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-sans">ESTIMATED TAX (8%)</span>
                <span className="font-display font-bold text-primary">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 flex justify-between items-end">
              <div>
                <span className="font-display text-[9px] text-outline uppercase block font-semibold">TOTAL AMOUNT</span>
                <span className="font-display font-extrabold text-2xl text-primary tracking-tighter">${totalAmount.toFixed(2)}</span>
              </div>
              <span className="font-display text-[10px] text-primary-container bg-white/10 px-2 py-1 rounded-sm">USD</span>
            </div>

            {error && (
              <div className="text-red-400 text-xs font-display text-center p-2 bg-red-950/20 border border-red-900/50 rounded">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button 
                onClick={handleCheckoutSubmit}
                disabled={submitting}
                className="w-full bg-primary text-black py-4 font-display font-bold text-xs tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
              >
                {submitting ? 'PROCESSING PROTOCOL...' : 'COMPLETE PURCHASE'}
              </button>
              <p className="font-display text-[9px] text-outline text-center mt-4">BY CLICKING, YOU AGREE TO OUR PERFORMANCE PROTOCOLS.</p>
            </div>

            <div className="flex items-center justify-center gap-2 opacity-50">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="font-display text-[9px] tracking-widest font-semibold">AES-256 ENCRYPTION ACTIVE</span>
            </div>
          </div>
          
          {/* Support Concierge */}
          <div className="mt-6 p-6 border border-white/5 flex items-center justify-between">
            <div>
              <p className="font-display text-[9px] text-outline font-bold">NEED ASSISTANCE?</p>
              <p className="font-sans text-xs text-on-surface font-semibold mt-1">ELITE CONCIERGE ON STANDBY</p>
            </div>
            <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
          </div>
        </aside>

      </div>
    </main>
  );
}

// --- SUCCESS / THANK YOU PAGE ---
function SuccessPage() {
  return (
    <div className="text-center py-40 max-w-[1280px] mx-auto px-4">
      <div className="flex justify-center mb-6">
        <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </div>
      <h1 className="font-display font-extrabold text-4xl mb-4 text-primary tracking-tight">TRANSACTION APPROVED</h1>
      <p className="font-sans text-on-secondary-container max-w-md mx-auto mb-8 leading-relaxed">
        Your performance ledger has been updated. The order is registered and will dispatch via priority logistics routing.
      </p>
      <Link to="/" className="btn-primary px-8 py-4 font-display font-bold text-xs uppercase tracking-widest inline-block">
        Return to Storefront
      </Link>
    </div>
  );
}

// --- LOGIN PAGE ---
function LoginPage({ loginUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (username === 'kingpro' && password === 'kingpro00') {
      localStorage.setItem('auraAdminToken', 'kingpro-session-active');
      window.location.href = 'http://localhost:5173/';
    } else {
      loginUser(username);
      navigate('/');
    }
  };

  return (
    <div className="max-w-[400px] mx-auto my-20 p-8 glass-card rounded-xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-[80px]"></div>
      
      <div className="relative z-10">
        <div className="mb-8 text-center">
          <h2 className="font-display font-bold text-xl text-white mb-1">LEDGER SIGN IN</h2>
          <p className="text-[9px] font-bold text-outline tracking-widest uppercase">Verify profile credentials</p>
        </div>

        {error && (
          <div className="text-red-400 text-xs font-display p-2 bg-red-950/20 border border-red-900/50 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="font-display text-[9px] font-bold text-outline mb-1">USERNAME</label>
            <input 
              className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/30"
              placeholder="e.g. kingpro or your_name" 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-display text-[9px] font-bold text-outline mb-1">PASSWORD</label>
            <input 
              className="glass-input font-sans text-sm text-primary py-2 px-0 placeholder:text-on-tertiary-container/30"
              placeholder="••••••••" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-black py-4 font-display font-bold text-xs tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
          >
            VERIFY CREDENTIALS
          </button>
        </form>
      </div>
    </div>
  );
}
